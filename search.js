//Gets references to DOM Elements
const inputElement = document.querySelector("#search-input");
const search_icon = document.querySelector("#search-close-icon");
const sort_wrapper = document.querySelector(".sort-wrapper");

//Event listeners
inputElement.addEventListener("input", () => {
    //triggered whenever the user types or delted in the search input
    handleInputChange(inputElement);
});

//clicking the "X" clears the input & hides the icon
search_icon.addEventListener("click", handleSearchCloseOnClick);

//clicking the filter button toggles the filter menu (sort by number or name)
sort_wrapper.addEventListener("click", handleSortIconOnClick);

//handles showing/hiding the close "X" icon depending on search input state
function handleInputChange(inputElement)
{
    //current text inside the search bar
    const inputValue = inputElement.value;

    if(inputValue !== "")
        {
            //if there is text, show the lcose icon
            document.querySelector("#search-close-icon")
            .classList.add("search-close-icon-visible");
        }
    else
    {
        //if input is empty, hide the close icon
        document.querySelector("#search-close-icon")
        .classList.remove("search-close-icon-visible");
    }
}

//clears the search input when clicking the "X"
function handleSearchCloseOnClick()
{
    //reset the search field to empty
    document.querySelector("#search-input").value = "";

    //hide the "X" again
    document.querySelector("#search-close-icon")
    .classList.remove("search-close-icon-visible");
}

//handles toggling the filter menu
function handleSortIconOnClick()
{
    // show/hide the filter wrapper when clicking sort/filter button
    document.querySelector(".filter-wrapper")
    .classList.toggle("filter-wrapper-open");

    //also toggle a body overlay class
    document.querySelector("body").classList.toggle("filter-wrapper-overlay");
}