document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.loginbtn')

    loginButton.addEventListener('click', (e) => {
        console.log(e.target);
    })
});