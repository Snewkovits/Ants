const ant = document.querySelectorAll('.ant')[0];
const debugX = document.getElementById('x');
const debugY = document.getElementById('y');
const debugZ = document.getElementById('z');

let mousePosition = {x: 0, y: 0};


document.onmousemove = event => {
    mousePosition = {x: event.clientX, y: event.clientY};
}

const move = (ant, position, lastUpdateRef) => {
    let timestamp = Date.now();
    if (timestamp - lastUpdateRef >= 100) {
        ant.style.left = position.x + 'px';
        ant.style.top = position.y + 'px';
        let degree = Math.atan((mousePosition.y - position.y) / (mousePosition.x - position.x)) * (180 / Math.PI);
        console.log(Math.atan((mousePosition.y - position.y) / (mousePosition.x - position.x)));
        
        ant.style.rotate = degree + 90 + 'deg';

        debugX.style.left = position.x + 'px';
        debugX.style.top = position.y + 'px';
        debugX.style.width = mousePosition.x - position.x + 'px';

        debugY.style.left = mousePosition.x + 'px';
        debugY.style.top = position.y + 'px';
        debugY.style.height = mousePosition.y - position.y + 'px';

        debugZ.style.left = position.x + 'px';
        debugZ.style.height = Math.atan((mousePosition.y - position.y) / (mousePosition.x - position.x)) + 'px';

        lastUpdateRef = Date.now();
    }
    requestAnimationFrame(() => move(ant, position, lastUpdateRef));
}

move(ant, {x: 200, y: 200}, Date.now());