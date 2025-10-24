import './style.css'
import Player from './class/Player'
import Particle from './class/Particle'

const HEIGHT = 400
const WIDTH = 400


const canvas = document.querySelector("#canvas")


canvas.width = WIDTH
canvas.height = HEIGHT

const plr = new Player()

let particles = []
let lastSpawnTime = 0;
const spawnInterval = 500
 
const ctx = canvas.getContext('2d');

function clearCanvas(color = "black"){
  ctx.fillStyle = color
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawPlayer(plr){
  const {x,y,size} = plr

  ctx.fillStyle = "red"
  ctx.fillRect(x, y, size, size);
}

const movementKeys = {
  left: false,
  right: false,
  up: false,
  down: false
}
window.addEventListener("keydown", (e)=>{

  
  if(e.code == "KeyD" && !movementKeys.left){
    movementKeys.right = true
  }
  if (e.code == "KeyA" && !movementKeys.right){
    movementKeys.left = true
  }

  if (e.code == "KeyW" && !movementKeys.down){
    movementKeys.up = true
  }
  if (e.code == "KeyS" && !movementKeys.up){
    movementKeys.down = true
  }
})
window.addEventListener("keyup", (e)=>{
  if(e.code == "KeyD"){
    movementKeys.right = false
  }
  if(e.code == "KeyA"){
    movementKeys.left = false
  }
  if(e.code == "KeyW"){
    movementKeys.up = false
  }
  if(e.code == "KeyS"){
    movementKeys.down = false
  }
})

function movePlayer(){
  if (movementKeys.left) {
    plr.x -= plr.speed
  }
  if (movementKeys.up) {
    plr.y -= plr.speed
  }

  if (movementKeys.right) {
    plr.x += plr.speed
  }
  if (movementKeys.down) {
    plr.y += plr.speed
  }
}

function createParticle(){
  console.log('Create');
  
  const particle = new Particle()
  let x = Math.floor( Math.random() * (WIDTH - particle.size))
  let y = Math.floor( Math.random() * (WIDTH - particle.size))
  particle.x = x
  particle.y = y
  particles.push(particle)
  console.log(particles);
  
}

function collide(o1, o2){
  let obj1 = o1
  let obj2 = o2
  if (o1.size >= o2.size) {
    obj2 = o1
    obj1 = o2
  }
  return (obj1.x >= obj2.x && obj1.x < obj2.x + obj2.size && obj1.y >= obj2.y && obj1.y < obj2.y + obj2.size ||
    obj1.x + obj1.size >= obj2.x && obj1.x + obj1.size < obj2.x + obj2.size && obj1.y >= obj2.y && obj1.y < obj2.y + obj2.size ||
    obj1.x >= obj2.x && obj1.x < obj2.x + obj2.size && obj1.y + obj1.size >= obj2.y && obj1.y + obj1.size < obj2.y + obj2.size ||
    obj1.x + obj1.size >= obj2.x && obj1.x + obj1.size < obj2.x + obj2.size && obj1.y+ obj1.size >= obj2.y && obj1.y+ obj1.size < obj2.y + obj2.size
  )
}

function collidelist(){
  particles = particles.filter((part)=> !collide(plr, part))
  
}

function drawParticles(p){
  for (let i of p){
    
    ctx.fillStyle = i.color
    ctx.fillRect(i.x, i.y, i.size, i.size)
  }
}

function render(){
  clearCanvas()
  drawParticles(particles)
  drawPlayer(plr)
}

function engine(i){
  if (i - lastSpawnTime >= spawnInterval){
    createParticle()
    lastSpawnTime = i
  }
  
  movePlayer()
  collidelist()
  render()
  
  requestAnimationFrame(engine)
}

engine()
// const timer = setInterval(engine, 1000 / 60)

// canvas.addEventListener("click", ( {offsetX, offsetY})=>{
//   drawInPosition(offsetX, offsetY)
// })




