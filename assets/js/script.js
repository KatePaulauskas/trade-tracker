// Loop through buttons to locate buttons with "new-entry" class, add event listener and display collapsable areas when buttons are clicked"

const allNewEntryButtons = document.getElementsByClassName("new-entry");
for (let button of allNewEntryButtons) {
    button.addEventListener("click", function () {
        let collapsableEntryArea = this.nextElementSibling;
        let collapsableEntryAreaIsHidden = collapsableEntryArea.style.display === 'none';
        collapsableEntryArea.style.display = collapsableEntryAreaIsHidden ? "block" : "none";
    });
}
