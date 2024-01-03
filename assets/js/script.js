// Ensure DOM is fully loaded before running Trading Tracker functions

document.addEventListener("DOMContentLoaded", function() {

    // Locate all buttons with the "new-entry" class
    const allNewEntryButtons = document.getElementsByClassName("new-entry");
    for (let button of allNewEntryButtons) {

        // Add a click event listener to each button with the "new-entry" class
        button.addEventListener("click", function () {

            // Target the next sibling elements (collapsible entry areas) in the DOM after buttons with the "new-entry" class
            let collapsableEntryArea = this.nextElementSibling;

            // Check if the collapsible entry areas are hidden (display is set to 'none')
            let collapsableEntryAreaIsHidden = collapsableEntryArea.style.display === 'none';

            // Display collapsible entry areas on buttons clicks if hidden; hide if shown
            collapsableEntryArea.style.display = collapsableEntryAreaIsHidden ? "block" : "none";
        });
    }
});

// Add event listeners to 'Add' and 'Withdraw' buttons
document.getElementById("add-balance").addEventListener("click", function () {

});

document.getElementById("withdraw-balance").addEventListener("click", function () {

});

// Get the investemnt amount entred by a user
function getInvestmentAmount() {
    return parseFloat(document.getElementById("balance-box").value);
};

// Ensure the user input is a positive amount, if so, update the local storage balance
function investmentIsPositiveAmount () {
    let amount = getInvestmentAmount();

    if (amount > 0) {
        storeBalance(amount);
    }

    // Alert the user if input is not a positive number
    else {
        alert ("Enter a positive amount!");
    }
};

// Function to update the local storage balance. Source: https://www.freecodecamp.org/news/web-storage-localstorage-vs-sessionstorage-in-javascript/
function storeBalance(amount) {
    localStorage.setItem("balance", amount);
}


// Display the invested amount

/**
 * Adding or withdrawing from the invested amount
 * If a user wants to update invested amount, get the new number, add or subtract it to / from the existing balance
* Update displayed balance
*/

