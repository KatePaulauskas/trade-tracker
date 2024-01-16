// Ensure DOM is fully loaded before running Trading Tracker functions

document.addEventListener("DOMContentLoaded", function() {

	// Locate all buttons with the "new-entry" class
	const allNewEntryButtons = document.getElementsByClassName("new-entry");
	for (let button of allNewEntryButtons) {

		// Add a click event listener to each button with the "new-entry" class
		// 'Click' event listener replaced with 'touchstart' to test if it improves user experience on mobile. Source: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
		button.addEventListener("touchstart", function() {

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
	displayTrades();
});

// Add event listeners to 'Add' button
document.getElementById("add-investment").addEventListener("click", function() {
	addInvestment();
});

// Get the investment amount entred by a user
function getInvestmentAmount() {
	return parseFloat(document.getElementById("investment-box").value);
}

// Ensure the user input is a positive amount, if so, update the local storage investment amount
function addInvestment() {

	// Check if the form is valid. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process
	if (document.getElementById("investment-form").checkValidity()) {

		// Form is valid, proceed with the existing logic
		let amount = getInvestmentAmount();

		// Get stored investment from the local storage, or display 'zero' if no data stored
		let currentInvestment = parseFloat(localStorage.getItem("investmentResult")) || 0;
		if (amount > 0) {
			// Add the entered amount to already invested amount
			currentInvestment += amount;
			storeInvestment(currentInvestment);
		}
		// Alert the user if input is not a positive number
		else {
			alert("Enter a positive amount!");
		}
	} else {
		// Form is not valid, show an error message. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process        
		document.getElementById("investment-box").reportValidity();
	}
	updateCurrentBalanceAndProfitLossPercent();
};


// Function to update the local storage invested amount. Source: https://www.freecodecamp.org/news/web-storage-localstorage-vs-sessionstorage-in-javascript/
function storeInvestment(amount) {
	localStorage.setItem("investmentResult", amount);

	// Call the function that displays the invested amount to reflect each investment update recorded in the local storage
	updateDisplayedInvestment();

	// Call the function to clear the investment box once the investment amount is stored and displayed 
	clearInvestmentBox();
};


// Display the invested amount
function updateDisplayedInvestment() {
	let currentInvestment = parseFloat(localStorage.getItem("investmentResult")) || 0;
	document.getElementById("total-investment").innerText = currentInvestment;
};

// Clear investment box after the invested amount is stored to the local storage
function clearInvestmentBox() {
	document.getElementById("investment-box").value = '';
};

// Add an event listener to the 'Add' button in the 'Add Trades' form to perform calculations for 'Summary' table
document.getElementById("add-trade-button").addEventListener("click", function() {
	calculateTotalProfitLossAmount();
});

// Get the 'Profit/loss amount' entered by the user in the form
function getProfitLossAmount() {
	return parseFloat(document.getElementById("result").value);
};

// Store in local storage the 'Total profit/loss' amount, summarising existing entries with all new entries
function calculateTotalProfitLossAmount() {
	// Check if the form is valid
	if (document.getElementById("add-trade").checkValidity()) {
		if (document.getElementById("total-investment").innerText === '0') {
			alert("First enter investment! Cannot add trades without having an investment to trade!");
			return;
		} else {
			// If form is valid and investment is entered, proceed with the following logic
			let enteredProfitLossAmount = getProfitLossAmount();
			let currentProfitLossAmount = parseFloat(localStorage.getItem("tradingResult")) || 0;
			if (enteredProfitLossAmount < 0) {
				if (parseFloat(document.getElementById("current-balance").innerText) + enteredProfitLossAmount < 0) {
					alert("The loss amount cannot exceed the Current balance, please check your entry!");
					return;
				}
			}
			currentProfitLossAmount += enteredProfitLossAmount;

			// Update local storage upon new entry 
			localStorage.setItem("tradingResult", currentProfitLossAmount);

			// Call the function to update the displayed profit/loss
			updateProfitLoss();
		}
	} else {
		// If form is not valid, trigger error messages. 
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
	let currentInvestment = parseFloat(localStorage.getItem("investmentResult")) || 0;

	// Get from local storage the current profit/loss amout
	let currentProfitLossAmount = parseFloat(localStorage.getItem("tradingResult")) || 0;

	// Call the functions to recalculate the 'Current Balance' and '% Profit/Loss' every time entries are updated
	calculateCurrentBalance(currentInvestment, currentProfitLossAmount);
	calculateProfitLossPercent(currentInvestment, currentProfitLossAmount);
};

// Add an event listener to the 'Submit' button in the 'Add Trades' section to store form submission data in local storage
document.getElementById("add-trade-button").addEventListener("click", function() {

	// Create an object to store trade details in local storage
	let tradeData = {
		openDate: document.getElementById("open-date").value,
		closeDate: document.getElementById("close-date").value,
		stockName: document.getElementById("stock").value,
		result: document.getElementById("result").value,
		comments: document.getElementById("comments").value,
	};
	// Store trades data only if the imvestment amount was entered 
	if (isInvestmentEntered()) {
		storeTrade(tradeData);
	}
	displayTrades();
	clearAddTradeForm();
});

// Store trade details in local storage. Ensure trades do not get overwritten, but are stored as arrays. Source: https://blog.logrocket.com/localstorage-javascript-complete-guide/
function storeTrade(tradeData) {

	// Get existing trades from local storage.
	let trades = localStorage.getItem("trades");

	// Check if no trades exist.
	if (trades === null) {

		// Create an empty array if no trades exist, to store trades.
		trades = [];
	} else {

		// If trades exist, parse the trades value as an array.
		trades = JSON.parse(trades);
	}

	// Add each new trade to the array of trades.
	trades.push(tradeData);

	// Save the updated array back to local storage.
	localStorage.setItem("trades", JSON.stringify(trades));
};

// Check if the imvestment amount was entered 
function isInvestmentEntered() {
	return document.getElementById("total-investment").innerText !== '0';
};

// Function to display trades in the List of trades table
function displayTrades() {

	// Get trades from the local storage or use an empty array
	let trades = JSON.parse(localStorage.getItem("trades")) || [];

	// Create an empty string to store the HTML for the table rows
	let html = '';

	// Loop through the trades array
	for (let i = 0; i < trades.length; i++) {

		// Use template literals to create the HTML string for each trade 
		html += `<tr><td>
                Opened Date: ${trades[i].openDate}<br>
                Close Date: ${trades[i].closeDate}<br>
                Stock Name:${trades[i].stockName}<br>
                Comments: ${trades[i].comments}</td>`;
		html += `<td>${trades[i].result}</td></tr>`;
	}

	// Set the inner HTML of the 'List of trades' table to the html string
	document.getElementById("trades-summary").innerHTML = html;
};

// Clear the 'Add new trade' form after a new trade is stored to the local storage. Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
function clearAddTradeForm() {
	document.getElementById("add-trade").reset();
};


// Clear local storage and reset trade tracker
document.getElementById("reset").addEventListener("click", function clearLocalStorage() {
	// Clear locla storage
    localStorage.clear();
	  // Select all 'td' elements in the 'summary-table' and set their content to zero
	  let tds = document.querySelectorAll("#summary-table td");
	  for (let i = 0; i < tds.length; i++) {
		  tds[i].textContent = '0'; 
	  }
	  	// Clear 'List of trades' table
	document.getElementById("trades-summary").innerHTML = '';
  });



