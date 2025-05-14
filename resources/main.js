window.addEventListener('load', () => {
    for (let i = 0; i < 10; i++)
        createAnt({x: 200, y: 500});
});

const getRandomName = () => {
   
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName}${randomLastName}`;
};