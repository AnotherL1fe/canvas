import './style.css'
import Player from './class/Player'

const HEIGHT = 400
const WIDTH = 400


const canvas = document.querySelector("#canvas")
canvas.width = WIDTH
canvas.height = HEIGHT


const plr = new Player()
 
const ctx = canvas.getContext('2d');


function clearCanvas(color = "black"){
  ctx.fillStyle = color
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
// ctx.strokeStyle = "blue"
// ctx.lineWidth = 10
// ctx.fillRect(150, 300, 50, 20);
// ctx.strokeRect(150, 300, 50, 20)

function drawPlayer(plr){

  const {x,y,size} = plr

  ctx.fillStyle = "red"
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
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


function render(){
  clearCanvas()
  drawPlayer(plr)
}

function engine(){
  movePlayer()
  render()

  requestAnimationFrame(engine)
}
console.log(plr);

engine()
// canvas.addEventListener("click", ( {offsetX, offsetY})=>{
//   drawInPosition(offsetX, offsetY)
// })


