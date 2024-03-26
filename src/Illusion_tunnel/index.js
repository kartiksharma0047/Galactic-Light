import './index.css';

document.querySelector("#app").innerHTML = "<h1>Hover on screen</h1> <canvas> </canvas>";
document.title = "Illision Tunnel";

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue=0;
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function illision(distance,color) {
    let obj = {};
    obj.x = mouse.x;
    obj.y = mouse.y;
    obj.radius = 10;
    obj.RingRadius = 0;
    obj.radian=(Math.PI*2)/30;
    obj.distance=distance;
    obj.TimeToLive=500;
    obj.color=color;

    obj.draw = () => {
        c.beginPath();
        c.arc((obj.x)+Math.cos(obj.radian*obj.distance)*obj.RingRadius,(obj.y)+Math.sin(obj.radian*obj.distance)*obj.RingRadius, obj.radius, 0, Math.PI * 2, false);
        c.fill();
        c.fillStyle=obj.color
        c.closePath();
    }

    obj.update = () => {
        obj.RingRadius += 5;
        obj.draw();
        obj.TimeToLive--;
    }

    return obj;
}

let Illusion = [];
for (let i = 0; i < 50; i++) {
    Illusion.push(illision(i));
}

function newRing(){
    setTimeout(newRing,300);
    let color=`hsl(${hue},50%,50%)`
    for (let i = 0; i < 50; i++) {
        Illusion.push(illision(i,color));
    }
    hue = (hue + 5) % 256
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle="rgba(0,0,0,0.2)";
    c.fillRect(0, 0, innerWidth, innerHeight)
    Illusion.forEach((circle,index) => {
        if(circle.TimeToLive<0){
            Illusion.slice(index,1)
        }else{
            circle.update();
        }
    })
}
animate();
newRing();