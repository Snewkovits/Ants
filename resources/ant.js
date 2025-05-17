const debugX = document.getElementById('x');
const debugY = document.getElementById('y');
const debugZ = document.getElementById('z');

const createAnt = (position, antHillName) => {
    const ant = document.createElement("div");
    ant.setAttribute("name", getRandomName());
    ant.setAttribute("anthill", antHillName);
    ant.className = "ant";
    document.body.append(ant);

    const velocity = randomVectorGenerator(0, 360, 5); // indulási irány
    move(ant, position, velocity, 0, Date.now());
}

const createAntHill = (position) => { // ez valahogy elrontotta az egészet
    const antHill = document.createElement('div');
    const name = getRandomName();
    antHill.setAttribute('name', name);
    antHill.style.left = position.x + 'px';
    antHill.style.top = position.y + 'px';
    antHill.className = 'anthill';
    document.body.append(antHill);

    for (let i = 0; i < 10; i++) {
        createAnt(position, name);
    }
}

const move = (ant, position, velocity, lastDegreeRef, lastUpdateRef) => {
    const timestamp = Date.now();
    if (timestamp - lastUpdateRef >= 200) {
        const antSize = ant.getBoundingClientRect();
        const halfW = antSize.width / 2;
        const halfH = antSize.height / 2;

        velocity = randomVectorGenerator(Math.atan2(velocity.dy, velocity.dx) * (180 / Math.PI), 60, 10)

        let nextX = position.x + velocity.dx;
        let nextY = position.y + velocity.dy;

        // Falütközés: visszafordítás
        const turnBack = () => {
            if (nextX - halfW < 0 || nextX + halfW > window.innerWidth) {
                velocity.dx *= -1;
                nextX = position.x + velocity.dx;
            }
            if (nextY - halfH < 0 || nextY + halfH > window.innerHeight) {
                velocity.dy *= -1;
                nextY = position.y + velocity.dy;
            }
        }
        turnBack();

        // Szög számítás
        const radian = Math.atan2(velocity.dy, velocity.dx);
        let degree = radian * (180 / Math.PI) + 90;
        degree = (degree + 360) % 360;

        // Forgás simítás
        let delta = degree - lastDegreeRef;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        const smoothDegree = lastDegreeRef + delta;

        // Mozgatás
        ant.style.transform = `translate(-50%, -50%) rotate(${smoothDegree}deg)`;
        ant.style.left = nextX + 'px';
        ant.style.top = nextY + 'px';

        // Állapot frissítés
        position.x = nextX;
        position.y = nextY;
        lastUpdateRef = timestamp;
        lastDegreeRef = degree;
    }

    requestAnimationFrame(() =>
        move(ant, position, velocity, lastDegreeRef, lastUpdateRef)
    );
};


const randomVectorGenerator = (degree, maxAngle, step) => {
    const randomAngle = degree - (maxAngle / 2) + Math.random() * maxAngle;
    const angleRadian = randomAngle * (Math.PI / 180);

    const dx = Math.cos(angleRadian) * step;
    const dy = Math.sin(angleRadian) * step;

    return {dx: dx, dy: dy};
}