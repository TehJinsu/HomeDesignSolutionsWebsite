//opens the popup for the login
function openLogin() {
    document.getElementById('loginPopup').style.visibility = "visible";
}
//closes the popup
function closeLogin() {
    document.getElementById("loginPopup").style.visibility = "hidden";
}

//prints the div element within the selected area
function printReceipt() {
    const printContents = document.getElementById('printReceipt').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

//displays and hides the selected tab
const buttons = document.querySelectorAll('.button-tab');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(button => {
  button.addEventListener('click', () => {

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));


    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});
