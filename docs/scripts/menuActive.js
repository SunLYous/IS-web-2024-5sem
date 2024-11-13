(function () {
    const currentPath = document.location.pathname; // Получаем текущий путь
    console.log("Текущий путь:", currentPath); // Лог текущего пути
    const menuItems = document.querySelectorAll('.menu .list li a'); // Находим все пункты меню

    menuItems.forEach((menuItem) => {
        console.log("Проверка пункта меню:", menuItem.getAttribute('href')); // Лог href каждого пункта
        // Проверяем, совпадает ли href пункта меню с текущим путем
        if (menuItem.getAttribute('href') === currentPath) {
            menuItem.classList.add('active'); // Добавляем класс active
            console.log("Добавлен класс active к:", menuItem); // Лог добавления класса
        }
    });
})();
