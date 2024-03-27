import './index.css';

document.querySelector("#app").innerHTML = "<canvas> </canvas>";
document.title = "Galactic Light"

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let radian = 0;
let starTrail = 1;
let mousedown = false;
let color = ['#2185c5', '#7ecefd', "#fff6e5", "#ff7f66"];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener("mousedown", function () {
    mousedown = true;
})
addEventListener("mouseup", function () {
    mousedown = false;
})

function randomIntFromRange(min, max) {  // Get random values -> int values
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function galaxy() {
    let obj = {};

    obj.radius = randomIntFromRange(1, 3);
    obj.x = randomIntFromRange(-canvas.width, canvas.width);
    obj.y = randomIntFromRange(-canvas.height, canvas.height);
    obj.spacing = 5;
    obj.color = color[Math.floor(Math.random() * color.length)]
    obj.shadowBlur = obj.radius + 10

    obj.draw = () => {
        c.beginPath();
        c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2, false);
        c.shadowColor = obj.color;
        c.shadowBlur = obj.shadowBlur;
        c.fill();
        c.fillStyle = obj.color;
        c.closePath();
    }
    obj.update = () => {
        obj.draw();

    }

    return obj;
}

let GalaxyStar = [];
for (let i = 0; i < 500; i++) {
    let newStar = galaxy();
    let overlapping = false;

    for (let j = 0; j < GalaxyStar.length; j++) {
        let otherStar = GalaxyStar[j];
        let distance = Math.sqrt((newStar.x - otherStar.x) ** 2 + (newStar.y - otherStar.y) ** 2);

        if (distance < newStar.radius + otherStar.radius + newStar.spacing) {
            overlapping = true;
            break;
        }
    }
    if (!overlapping) {
        GalaxyStar.push(newStar);
    }
}


function animate() {
    requestAnimationFrame(animate);
    if (mousedown == false) {
        if (starTrail < 1) {
            starTrail += 0.01;
        } else {
            starTrail = 1
        }
        radian += 0.001
    } else {
        if (starTrail > 0.1) {
            starTrail -= 0.01;
        } else {
            starTrail = 0.1
        }
        radian += 0.015
    }
    c.fillStyle = `rgba(14,14,14,${starTrail})`
    c.fillRect(0, 0, innerWidth, innerHeight);
    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(radian);
    GalaxyStar.forEach((Star) => {
        Star.update();
    })
    c.restore();
}
animate();