document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fruitForm');
    const fruitList = document.getElementById('fruitList');

    const savedFruits = JSON.parse(localStorage.getItem('fruitList')) || [];
    savedFruits.forEach(fruit => addFruitToList(fruit.name, fruit.quantity));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const fruitName = form.fruitName.value;
        const quantity = form.quantity.value;

        addFruitToList(fruitName, quantity);

        savedFruits.push({ name: fruitName, quantity: quantity });
        localStorage.setItem('fruitList', JSON.stringify(savedFruits));

        form.reset();
    });

    function addFruitToList(name, quantity) {
        const li = document.createElement('li');
        li.textContent = `${name} - ${quantity} кг`;
        fruitList.appendChild(li);
    }
});
