// Ensure DOM is fully loaded before running Trading Tracker functions

document.addEventListener("DOMContentLoaded", function() {

    // Loop through buttons to locate buttons with "new-entry" class, add event listener and display collapsable areas when buttons are clicked"

    const allNewEntryButtons = document.getElementsByClassName("new-entry");
    for (let button of allNewEntryButtons) {
        button.addEventListener("click", function () {
            let collapsableEntryArea = this.nextElementSibling;
            let collapsableEntryAreaIsHidden = collapsableEntryArea.style.display === 'none';
            collapsableEntryArea.style.display = collapsableEntryAreaIsHidden ? "block" : "none";
            });
    }
});


/**
* Get the initial investemnt amount, ensure the user input is a positive number
* Alert the user if input is not a positive number
*/

// Update the local storage balance

// Display the invested amount

/**
 * Adding or withdrawing from the invested amount
 * If a user wants to update invested amount, get the new number, add or subtract it to / from the existing balance
* Update displayed balance
*/

