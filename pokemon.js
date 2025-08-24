// ===============================
// Global Constants & DOM Elements
// ===============================

//Max Number of Pokemon To Fetch (Gen 1-4)
const MAX_POKEMON = 494;

//reference html elements by creating constants for them
//use document.querySelector to grab references to elements in HTML
const listWrapper = document.querySelector(".list-wrapper"); //where list is shown
const searchInput = document.querySelector("#search-input"); //search box
const numberFilter = document.querySelector("#number"); //radio btn
const nameFilter = document.querySelector("#name"); //radio btn
const notFoundMessage = document.querySelector("#not-found-message"); //message

//storing all Pokemon in an array
let allPokemons = [];

// ===============================
// Initial Pokemon Fetch
// ===============================

//call the PokeAPI with a limit of the MAX_POKEMON
//that response is turned into JSON (so you can use it aas a JS object)
//dont use single quotes '', use back ticks `` = string literal in link
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    //store the results in the array
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });

// ===============================
// Fetch Data For A Single Pokemon
// ===============================

  //takes a Pokemon ID
  //makes 2 API requests in parallel with Promise.all
  //pokemon/${id} - general stats (height, weight, moves, types, etc.)
  //pokemon-species/${id} - extra info ()
  async function fetchPokemonDataBeforeRedirect(id)
  {
    //await Promise.all([...]) - waits until booth requests finish, then gives you [pokemon, pokemonSpecies]
    try{
        const [pokemon, pokemonSpecies] = await Promise.
        all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => 
             res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => 
            res.json()
        ),
    ])
    return true;
    } 
    catch(error)
    {
        console.error("Failed To Fetch Pokemon Data Before Redirect");
    }
  }

// ===============================
// Display Pokemon List In UI
// ===============================

  function displayPokemons(pokemon)
  {
    listWrapper.innerHTML = ""; //clear previoud results

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6]; // extract ID from URL

        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class = "number-wrap">
                <p class = "caption-fonts">#${pokemonID}</p>
            </div>
            <div class = "img-wrap">
                <img src = "https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt = "${pokemon.name}" />
            </div>
            <div class = "name-wrap">
                <p class = "body3-fonts">#${pokemon.name}</p>
            </div>
        `;

        //When Clicked: fetch data, then go to details.html
        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);

            if(success)
            {
                window.location.href = `./detail.html?id=${pokemonID}`;
            }
        });
        //Add Pokemon To Wrapper
        listWrapper.appendChild(listItem);
    })

  }

// ===================
// Search Functionality
// ====================

//Run Search On Every Key Pressed
searchInput.addEventListener("keyup", handleSearch);

function handleSearch()
{
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPokemons;

    //Filter By Number (ID)
    if(numberFilter.checked)
    {
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    }
    //Filter By Name
    else if(nameFilter.checked)
    {
        filteredPokemons = allPokemons.filter((pokemon) => 
            pokemon.name.toLowerCase().startsWith(searchTerm)
        );
    }
    //If No Filter Is Chosen, Show All
    else
    {
        filteredPokemons = allPokemons;
    }

    //Update UI With Filtered Results
    displayPokemons(filteredPokemons);

    //Show Or Hide "Not Found Message"
    if(filteredPokemons.length == 0)
    {
        notFoundMessage.style.display = "block";
    }
    else
    {
        notFoundMessage.style.display = "none";
    }
}

// ===================
// Clear Search Button
// ===================

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch()
{
    searchInput.value = ""; //Reset Search Box
    displayPokemons(allPokemons); //Show All Pokemon Again
    notFoundMessage.style.display = "none"; //Hide the "Not Found" Message
}






