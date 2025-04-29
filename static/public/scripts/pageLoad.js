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
