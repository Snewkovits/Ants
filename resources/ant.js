const ant = document.querySelectorAll('.ant')[0];
const debugX = document.getElementById('x');
const debugY = document.getElementById('y');
const debugZ = document.getElementById('z');

let mousePosition = {x: 0, y: 0};


document.onmousemove = event => {
    mousePosition = {x: event.clientX, y: event.clientY};
}

const move = (ant, position, movePosition, lastDegreeRef, lastUpdateRef) => {
    const timestamp = Date.now();
    if (timestamp - lastUpdateRef >= 100) {
        const dx = mousePosition.x - position.x;
        const dy = mousePosition.y - position.y;

        const radian = Math.atan2(dy, dx);
        let degree = radian * (180 / Math.PI) + 90;

        degree = (degree + 360) % 360;

        let delta = degree - lastDegreeRef;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const smoothDegree = lastDegreeRef + delta;
        console.log(smoothDegree);

        ant.style.transform = `translate(-50%, -50%) rotate(${smoothDegree}deg)`;
        ant.style.left = movePosition.x + 'px';
        ant.style.top = movePosition.y + 'px';

        lastUpdateRef = timestamp;
        lastDegreeRef = degree;
    }

    requestAnimationFrame(() =>
        move(ant, position, movePosition, lastDegreeRef, lastUpdateRef)
    );
};


move(ant, {x: 200, y: 200}, {x: 205, y: 210}, 0, Date.now());