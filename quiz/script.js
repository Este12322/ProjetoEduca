const startBtn = document.querySelector('.hero-btn');
const popupInfo = document.querySelector('.popup-info');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

exitBnt.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

}

        function showMenu() {
            navLinks.style.right = "0";

        }
        function hideMenu() {
            navLinks.style.right = "-200px";

        }

        function toggleSubMenu(show) {
            const subMenu = document.getElementById('subMenu');
            subMenu.style.display = show ? 'block' : 'none';
        }    
 