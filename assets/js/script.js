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

