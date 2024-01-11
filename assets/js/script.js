// Ensure DOM is fully loaded before running Trading Tracker functions

document.addEventListener("DOMContentLoaded", function() {

	// Locate all buttons with the "new-entry" class
	const allNewEntryButtons = document.getElementsByClassName("new-entry");
	for (let button of allNewEntryButtons) {

		// Add a click event listener to each button with the "new-entry" class
		// 'Click' event listener replaced with 'touchend' to test if it improves user experience on mobile. Source: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
        button.addEventListener("touchend", function() {

			// Target the next sibling elements (collapsible entry areas) in the DOM after buttons with the "new-entry" class
			const collapsableEntryArea = this.nextElementSibling;

			// Check if the collapsible entry areas are hidden (display is set to 'none')
			const collapsableEntryAreaIsHidden = collapsableEntryArea.style.display === 'none';

			// Display collapsible entry areas on buttons clicks if hidden; hide if shown
			collapsableEntryArea.style.display = collapsableEntryAreaIsHidden ? "block" : "none";
		});
	}
	updateDisplayedInvestment();
	updateProfitLoss();
	updateCurrentBalanceAndProfitLossPercent();
});

// Add event listeners to 'Add' and 'Withdraw' buttons
document.getElementById("add-balance").addEventListener("click", function() {
	investmentIsPositiveAmount("add");
});

document.getElementById("withdraw-balance").addEventListener("click", function() {
	investmentIsPositiveAmount("withdraw");
});

// Get the investment amount entred by a user
function getInvestmentAmount() {
	return parseFloat(document.getElementById("balance-box").value);
}

// Ensure the user input is a positive amount, if so, update the local storage balance
function investmentIsPositiveAmount(action) {
	// Check if the form is valid. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process
	if (document.getElementById("balance-form").checkValidity()) {
		// Form is valid, proceed with the existing logic
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
	} else {
		// Form is not valid, show an error message. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process        
		document.getElementById("balance-box").reportValidity();
	}
	updateCurrentBalanceAndProfitLossPercent();
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
document.getElementById("add-trade-button").addEventListener("click", function() {
	calculateTotalProfitLossAmount();
});

// Get the 'Profit/loss amount' entered by the user in the form
function getProfitLossAmount() {
	return parseFloat(document.getElementById("result").value);
};

// Store in local storage the 'Total Profit/loss' amount, summarising existing entries with all new entries
function calculateTotalProfitLossAmount() {
	// Check if the form is valid. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process
	if (document.getElementById("add-trade").checkValidity()) {
		// If form is valid, proceed with the existing logic
		let enteredProfitLossAmount = getProfitLossAmount();
		let currentProfitLossAmount = parseFloat(localStorage.getItem("tradingResult")) || 0;
		currentProfitLossAmount += enteredProfitLossAmount;

		// Update local storage upon new entry 
		localStorage.setItem("tradingResult", currentProfitLossAmount);

		// Call the function to update the displayed profit/loss
		updateProfitLoss();

	} else {
		// If form is not valid, trigger error messages. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process        
		document.getElementById("add-trade").reportValidity();
	}
};

// Display the 'Total Profit/loss'
function updateProfitLoss() {
	let currentProfitLossAmount = parseFloat(localStorage.getItem("tradingResult")) || 0;
	document.getElementById("total-profit-loss").innerText = currentProfitLossAmount;
	updateCurrentBalanceAndProfitLossPercent();
};

// Perform calculation for the 'Current Balance' in the 'Summary' table
function calculateCurrentBalance(currentInvestment, currentProfitLossAmount) {
	let currentBalance = currentInvestment + currentProfitLossAmount;
	document.getElementById("current-balance").innerText = currentBalance;
};

// Perform calculation for the '% Profit/loss' in the 'Summary' table
function calculateProfitLossPercent(currentInvestment, currentProfitLossAmount) {
	let profitLossPercent;

	// Prevent division by zero
	if (currentInvestment === 0) {
		profitLossPercent = "NA";
	} else {
		profitLossPercent = Math.round((currentProfitLossAmount / currentInvestment) * 100) + "%";
	}
	// Display the result of the calculation 
	document.getElementById("profit-loss-percent").innerText = profitLossPercent;
};

// Function to update 'Current Balance' and '% Profit/Loss'

function updateCurrentBalanceAndProfitLossPercent() {
	// Get from local storage the amout currently invested
	let currentInvestment = parseFloat(localStorage.getItem("balance")) || 0;

	// Get from local storage the current profit/loss amout
	let currentProfitLossAmount = parseFloat(localStorage.getItem("tradingResult")) || 0;

	// Call the functions to recalculate the 'Current Balance' and '% Profit/Loss' every time entries are updated
	calculateCurrentBalance(currentInvestment, currentProfitLossAmount);
	calculateProfitLossPercent(currentInvestment, currentProfitLossAmount);
};