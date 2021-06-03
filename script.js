const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray;

var g = 1;

//create constructor function
function Particle(x, y, vx, vy, r, color, a)
{
this.x = x;
this.y = y;
this.vx = vx;
this.vy = vy;
this.r = r;
this.color = color;
this.a = g;


}


// add draw method to particle prototype
Particle.prototype.draw = function()
{

ctx.beginPath();
   // arc creates an arc: ctx.arc(x,y,r,starting angle,ending angle, counter clockwise)
ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
ctx.stroke();
ctx.fillStyle = this.color;
ctx.fill();
}


// this is physics, collision, and movement
Particle.prototype.update = function ()
{
//                           || means or.
if (this.x + this.r > canvas.width || this.x - this.r < 0)
 {
  this.vx = -this.vx;
 }

if (this.y + this.r > canvas.height || this.y - this.r < 0)
 {
  this.vy = -this.vy
  this.a = 0;
 }
//movement
this.vy += this.a;
this.x += this.vx;
this.y += this.vy;
this.a = g;
//calls draw function
this.draw();

}



//create particle array
function init()
{

 particleArray = [];
 for (let i=0; i< 10; i++)
 {
  let r = 20;
  let x = Math.random() * (innerWidth - r * 2);
  let y = Math.random() * (innerHeight - r * 2);
  let vx = (Math.random() * 8) - 4;
  let vy = (Math.random() * 4) - 2;
  let color = 'white';
  let a = g;
  particleArray.push(new Particle(x, y, vx, vy, r, color, a));
 }

}

//animation loop
function animate()
{
 requestAnimationFrame(animate);
 ctx.clearRect(0,0, innerWidth, innerHeight);

 for (let i=0; i<particleArray.length; i++)
 {

  particleArray[i].update();

 }

}
init();
animate();
