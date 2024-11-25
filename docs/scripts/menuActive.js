(function () {
    const currentPath = document.location.pathname;
    const pathSegments = currentPath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const menuItems = document.querySelectorAll('.menu .list li a');

    menuItems.forEach((menuItem) => {
        const href = menuItem.getAttribute('href');
        console.log("Проверка пункта меню:", href);

        const hrefSegments = href.split('/');
        const lastHrefSegment = hrefSegments[hrefSegments.length - 1];

        if (lastHrefSegment === lastSegment) {
            menuItem.classList.add('active');
        }
    });
})();
