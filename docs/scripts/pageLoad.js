(function() {
    window.addEventListener('load', function() {
        const footer = document.querySelector('.footer');

        if (footer) {
            const loadTime = performance.now().toFixed(2);
            const loadInfo = document.createElement('p');
            loadInfo.textContent = `Page Load Time: ${loadTime} ms`;
            footer.appendChild(loadInfo);
        } else {
            console.error("Footer element not found.");
        }
    });
})();


(function () {
    const currentPath = document.location.pathname;
    const menuItems = document.querySelectorAll('.menu .list li a');
    menuItems.forEach((menuItem) => {
        if (menuItem.getAttribute('href') === currentPath) {
            menuItem.classList.add('active');
        }
    });
})();
