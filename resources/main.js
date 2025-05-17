window.addEventListener('load', () => {
        createAntHill({x: 200, y: 500});
});

window.addEventListener('mousedown', (event) => {
    createFood({x: event.clientX, y: event.clientY}, 100);
});

const getRandomName = () => {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}${randomLastName}`;
};

const createFood = (position, amount) => {
    const food = document.createElement('div');
    food.className = 'food';
    food.setAttribute('amount', amount);
    food.style.left = position.x + 'px';
    food.style.top = position.y + 'px';

    document.body.appendChild(food);
}