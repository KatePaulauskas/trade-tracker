# Trade tracker

The Trade Tracker site is designed to assist stock traders in monitoring their trading journey by offering a tracking system which allows to overview and control the invested amounts and profit or loss incurred during their trading. It also provides a a summary on the total amount invested, the total profit or loss made, based on which the current balance and profit/loss percent are calculated.

The site's target audience would be anyone involved in stock trading. It is suitable for those, who look to maintain a record of their investments and results of the trades they made. Also those, who seeks to keep a trading journal and see a quick overview of their current investment portfolio. 

The site's primary goal is to help traders to keep a track of their trading progress and demonstrate a summary based on their current progress.

![Responsive Mockup]()

## Features

### Project Structure

### Design, fonts, colors

### Existing Features

####

### Features Left to Implement

## Testing

### Testing site features and behaviour

During testing, it was identified that three additional rules need to be implemented to help users accurately monitor their trading progress:

1. Users should be prevented from adding a new trade, whether positive or negative, if a balance has not been entered.

2. Users should be prevented from entering a negative amount (loss) for a new trade if this amount exceeds the 'Current balance', as in real-world scenarios, the broker would typically intervene and prevent the user from going into negative balance. Unless the user is a professional trader, however, if he is, he would be seeking for more advanced capabilities than the  current Trade Tracker can offer.

3. When a user attempts to withdraw balance, it has to be withdrawn from the 'Current balance'. If the current balance is at zero, the withdrawal amount has to be deducted from the 'Invested amount'.




Action/Feature          | Expected behavior       | Status         |
|-------------------|-------------------------|----------------|
|Enter site URL: <https://katepaulauskas.github.io/trade-tracker/> | Site page loads | Pass |
|The form 'Balance add/withdraw' was tested on mobile and larger devices in multiple browsers |
|Click 'Add' | 'Please fill in this field' appears in the input field | Pass |
|Click 'Withdraw' | 'Please fill in this field' appears in the input field | Pass |
|Enter a negative amount into the input field, click 'Add' | 'Enter a positive amount!' alert appears on the screen | Pass |
|Enter a negative amount into the input field, click 'Withdraw' | 'Enter a positive amount!' alert appears on the screen | Pass |
|Enter a positive amount into the input field, click 'Withdraw' | 'Cannot withdraw more than the currently invested amount!' alert appears on the screen | Pass |
|Enter a positive amount into the input field, click 'Add' | 'Total investment' and 'Current balance' values are updated in the 'Summary' table, displaying the entered amount | Pass |
|Enter a positive amount into the input field, but smaller or equal to the amount entered in the previous step, click 'Withdraw' | 'Total investment' and 'Current balance' values are updated in the Summary table, the entered amount is subtracted | Pass |
|The form 'Add new trade' was tested on mobile and larger devices in multiple browsers |
|Click 'Add' | Please fill in this field' appears in the 'Open date' input field | Pass |
|Fill out only the 'Open date' input field, and click 'Add' | Please fill in this field' appears in the 'Close date' input field | Pass |
|Fill out the 'Open date' and 'Close date' fields only, and click 'Add' | Please fill in this field' appears in the 'Stock name' input field| Pass |
|Fill out the 'Open date', 'Close date' and 'Stock name' fields only, and click 'Add' | Please fill in this field' appears in the 'Profit/loss amount' input field | Pass |
|Fill out the 'Open date', 'Close date', 'Stock name' and 'Profit/loss amount' fields only, and click 'Add' | Please fill in this field' appears in the 'Comments' input field | Pass |
|Fill out all input fields: 'Open date', 'Close date', 'Stock name', 'Profit/loss amount' (use positive amount) and 'Comments', click 'Add' | If the balance was not entered in the 'Balance add/withdraw' form, only 'Current balance' and 'Total profit/loss' values are updated in the 'Summary' table. If the balance was entered in the 'Balance add/withdraw', 3 values are calculated and updated in the 'Summary' table: 'Current balance' 'Total profit/loss', '% profit/loss' | Pass |
|Fill out all input fields: 'Open date', 'Close date', 'Stock name', 'Profit/loss amount' (use negative amount) and 'Comments', click 'Add' | If the balance was not entered in the 'Balance add/withdraw' form, alert message appears: 'First enter balance! Cannot add trades without having a positive balance!' | Pass |
|Fill out all input fields: 'Open date', 'Close date', 'Stock name', 'Profit/loss amount' (use negative amount) and 'Comments', click 'Add' | If the balance was not entered in the 'Balance add/withdraw' form, alert message appears: 'First enter balance! Cannot add trades without having a positive balance!' | Pass |
|Fill out all input fields: 'Open date', 'Close date', 'Stock name', 'Profit/loss amount' (use negative amount) and 'Comments', click 'Add' | If the balance was entered in the 'Balance add/withdraw', and the negative amount of the trade exceeds 'Current balance', aler message appears: 'The loss amount cannot exceed the Current balance, please check your entry!' | Pass |
|Fill out all input fields: 'Open date', 'Close date', 'Stock name', 'Profit/loss amount' (use negative amount) and 'Comments', click 'Add' | If the balance was entered in the 'Balance add/withdraw', and the negative amount of the trade is equal or smaller than 'Current balance', the negative amount of the trade is deducted from 'Current Balance' and displaid in the 'Summary' table, 'Total profit/loss' and '% profit/loss' are recalculated based on the new value of the 'Current balance' | Pass |
|Enter an amount into the input field of the 'Balance add/withdraw' form after successfully adding a trade through the 'Add new trade' form, click 'Add' on the 'Balance add/withdraw' form | Three values in the 'Summary' table are updated based on the new entry: 'Total investment', 'Current balance', and '% profit/loss' by adding the entered amount to the 'Total investment' and performing calculation based on the new value for the remaining two fields | Pass |




### Validator Testing

#### HTML

In an attempt to adhere to web standards and accessibility, the site was submitted to [W3C validation testing](<https://validator.w3.org/nu/?doc=https%3A%2F%2Fkatepaulauskas.github.io%2Ftrade-tracker%2F>). No errors were identified. However, there were 18 warnings about trailing slash on void elements, which were fixed by removing the trailing slash and extra space.



#### CSS

To align with web standards and ensure accessability compliance CSS code of the site was submitted to [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fkatepaulauskas.github.io%2Faerial-photography%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en). One error was identified, as described below.

- __Error 1:__ [Parse Error](media/css-validation-error.jpeg)
  - Correction: The missing cirly bracket was added at the end of the media query for tablets and larger screens.

#### JavaScript

In an attempt to adhere to web standards and accessibility, the JavaScript code was submitted to [JSHint Validator](<https://jshint.com/>). No errors were identified in the JavaScript code.


### Accessibility
![Desktop Initial Accessibility Test](media/lighthouse-desktop-initial.jpeg)
![Mobile Initial Accessibility Testp](media/lighthouse-mobile-initial.jpeg)
![Desktop Improved Accessibility Test](media/lighthouse-desktop-improved.jpeg)
![Mobile Improved Accessibility Test](media/lighthouse-mobile-improved.jpeg)

#### Site Colors Accessibility
![Initial Color Palette](media/Initial-color-pallet.jpeg)
![Improved Color Palette](media/new-color-pallet.jpeg)

### Solved Bugs

## Deployment

- The current project was deployed to GutHub pages through the following deployment steps:
    1. I navigated to the settings tab in the GitHub repository.
    2. In the Code and automation section on the left-hand sidebar, I selected Pages.
       - I set Source to 'Deploy from a branch'.
       - Selected main branch in the dropdown.
       - Set the folder to / (root).
       - Clicked Save.
    3. I went back to the Code tab. Waited a few minutes and refreshed my repository.
    4. After that on the right-hand side, I located the Deployments section and clicked on 'github-pages'.
    5. I clicked on the square with an arrow pointing to the upper right corner against the last deployment on the right and was able to see my project live.

    The live link to the site can be found at the following URL: [Trade Tracker](https://katepaulauskas.github.io/trade-tracker/)

## Credits

### Content

- [Balsamiq Studios software](https://balsamiq.com/wireframes/) was used to create mockup wireframe for the current project.
- To select the fonts for the site, a font pairing service was used: [Font Joy](https://fontjoy.com/).
- Paired font families were downloaded from [Google Fonts](https://fonts.google.com/).
- Site colors accessibility was checked using [Adobe Color Accessibility Tool](<https://color.adobe.com/>).
- Icon displayed on the Home page was taken from [Iconify](https://iconify.design).
- The instructions on the usage of the 'button' type on buttons to prevent submissions and set custom functionality were taken from the following source: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button).
- To ensure forms validation the Constraint validation was achieved using the Constraint Validation API described in the folloeing source:[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#constraint_validation_process).
- The instructions on how to work with the local storage were taken from the following source: [freeCodeCamp](https://www.freecodecamp.org/news/web-storage-localstorage-vs-sessionstorage-in-javascript/).

