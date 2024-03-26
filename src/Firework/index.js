import './index.css';

document.querySelector("#app").innerHTML = "<h1>Click on screen</h1> <canvas> </canvas>";
document.title = "Fireworks";

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse={
    x:innerWidth/2,
    y:innerHeight/2
};
let Fireworks=[]
let shootingPower=13;


addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function particles(x,y,velocity){
    let obj={};
    obj.x=x;
    obj.y=y;
    obj.radius=10;
    obj.velocity=velocity
    obj.gravity=0.02;
    obj.friction=0.99;
    obj.opacity=1;
    obj.color=`hsl(${Math.random()*360},50%,50%)`;

    obj.draw=()=>{
        c.save();
        c.beginPath();
        c.fillStyle=obj.color
        c.globalAlpha=obj.opacity;
        c.arc(obj.x,obj.y,obj.radius,0,Math.PI*2,false);
        c.fill();
        c.closePath();
        c.restore();
    }
    obj.update=()=>{
        obj.draw();
        obj.velocity.x*=obj.friction;
        obj.velocity.y*=obj.friction
        obj.x+=obj.velocity.x;
        obj.y+=obj.velocity.y;
        obj.velocity.y+=obj.gravity
        obj.opacity-=0.005;
    }

    return obj;
}
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle="rgba(0,0,0,0.04)"
    c.fillRect(0,0,innerWidth,innerHeight);

    Fireworks.forEach((cracker,index)=>{
        if(cracker.opacity>0){
            cracker.update();
        }else{
            Fireworks.splice(index,1);
        }
    })
}
animate();

addEventListener("click",function(event){
    mouse.x=event.clientX;
    mouse.y=event.clientY;
    const particleCount=500;
    const angleIncrement=(Math.PI*2)/particleCount;
    
    for(let i=0;i<particleCount;i++){
        Fireworks.push(particles(
            mouse.x,
            mouse.y,
            {x:Math.cos(angleIncrement*i)*Math.random()*shootingPower,
             y:Math.sin(angleIncrement*i)*Math.random()*shootingPower
            }
        ))
    }
})