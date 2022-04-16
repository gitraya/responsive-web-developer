const menuContent = document.querySelector('.nav-web');
const showButton = document.querySelector('.hamburger-button');
const closeButton = document.querySelector('.close-button a');

function navMobileModal() {
    if (menuContent.style.display === 'none') {
        menuContent.className = 'nav-web nav fade-out';
        menuContent.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
    } else {
        menuContent.className = 'nav-web nav';
        menuContent.style.display = 'none';
        document.body.style.overflowY = 'visible';
    }
};

function showNavWeb() {
    if(window.innerWidth > 760) {
        menuContent.style.display = 'flex';
    } else {
        menuContent.style.display = 'none';
    }
};

showButton.addEventListener('click', navMobileModal);
closeButton.addEventListener('click', navMobileModal);
window.addEventListener('resize', showNavWeb);