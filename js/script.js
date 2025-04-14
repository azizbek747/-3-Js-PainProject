const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let brushSize = 5;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;



const startDraw = () => {
  isDrawing = true
  ctx.beginPath()
  ctx.lineWidth = brushSize
}

const drawing = e => {
  if (!isDrawing) return
  ctx.lineTo(e.offsetX, e.offsetY); 
  ctx.stroke();
}

const stopDraw = () => isDrawing = false



canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw)



// ctx.strokeStyle = "#BADA55";
// ctx.lineJoin = "round";
// ctx.lineCap = "round";
// ctx.lineWidth = 100;

// let isDrawing = false;
// let lastX = 0;
// let lastY = 0;
// let hue = 0;
// let direction = true;

// function draw(e) {
//   if (!isDrawing) return;

//   ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
//   ctx.beginPath();
//   ctx.moveTo(lastX, lastY);
//   ctx.lineTo(e.offsetX, e.offsetY);
//   ctx.stroke();

//   lastX = e.offsetX;
//   lastY = e.offsetY;

//   hue++;
//   if (hue >= 360) {
//     hue = 0;
//   }

//   if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
//     direction = !direction;
//   }

//   if (direction) {
//     ctx.lineWidth++;
//   } else {
//     ctx.lineWidth--;
//   }
// }

// canvas.addEventListener("mousedown", (e) => {
//   isDrawing = true;
//   lastX = e.offsetX;
//   lastY = e.offsetY;
// });

// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", () => (isDrawing = false));
// canvas.addEventListener("mouseout", () => (isDrawing = false));

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// })

