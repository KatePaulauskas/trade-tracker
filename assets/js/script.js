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
    investmentIsPositiveAmount("add");
});

document.getElementById("withdraw-balance").addEventListener("click", function () {
    investmentIsPositiveAmount("withdraw");
});

// Get the investemnt amount entred by a user
function getInvestmentAmount() {
    return parseFloat(document.getElementById("balance-box").value);
};

// Ensure the user input is a positive amount, if so, update the local storage balance
function investmentIsPositiveAmount(action) {
    let amount = getInvestmentAmount();
    // Get stored investment from the local storage, or display 'zero' if no data stored
    let currentInvestment = parseFloat(localStorage.getItem("balance")) || 0;

    if (amount > 0) {
        if (action === "add") {
            // Add the entered amount to the invested balance
            currentInvestment += amount;
        } else if (action === "withdraw") {

            // Subtract the amount from the invested balance
            if (currentInvestment >= amount) {
                currentInvestment -= amount;
            } else {
                alert("Cannot withdraw more than currently invested amount!");
                return;
            }
        }
        storeBalance(currentInvestment);
    }
    // Alert the user if input is not a positive number
    else {
        alert("Enter a positive amount!");
    }
};

// Function to update the local storage balance. Source: https://www.freecodecamp.org/news/web-storage-localstorage-vs-sessionstorage-in-javascript/
function storeBalance(amount) {
    localStorage.setItem("balance", amount);

    // Call the function that displays the invested amount to reflect each investment update recorded in the local storage
    updateDisplayedInvestment();
    
    // Call the function to clear the balance box once the investment amount is stored and displayed 
    clearBalanceBox();
};


// Display the invested amount
function updateDisplayedInvestment() {
    let currentInvestment = parseFloat(localStorage.getItem("balance")) || 0;
    document.getElementById("total-investment").innerText = currentInvestment;
};

// Clear balance box after the invested amount is stored to the local storage
function clearBalanceBox() {
    document.getElementById("balance-box").value = '';
};

// Add an event listener to the 'Submit' button in the 'Add Trades' section
document.getElementById("add-trade-button").addEventListener("click", function () {
});

// Get the 'Profit/loss amount' entered by the user in the form.
// Store in local storage the 'Total Profit/loss' amount, summarizing existing entries with all new entries.
// Display the 'Total Profit/loss'.
// Perform calculations and display the 'Current Balance'.
// Perform calculations and display the '% Profit/loss'.

