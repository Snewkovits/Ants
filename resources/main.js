window.addEventListener('load', () => {
    for (let i = 0; i < 100; i++)
        createAnt({x: 200, y: 200});
});

const getRandomName = () => {
   
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName}${randomLastName}`;
};