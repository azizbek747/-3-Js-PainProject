const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Tools
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color input");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearBtn = document.querySelector(".clear-canvas");
const saveBtn = document.querySelector(".save-image");

// Settings
let selectedTool = "brush";
let isDrawing = false;
let brushSize = 5;
let selectedColor = "#000";
let prevMouseX, prevMouseY, snapshot;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Drawing start
const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushSize;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// Drawing
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  let currX = e.offsetX;
  let currY = e.offsetY;
  let width = currX - prevMouseX;
  let height = currY - prevMouseY;

  switch (selectedTool) {
    case "brush":
    case "eraser":
      ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
      ctx.lineTo(currX, currY);
      ctx.stroke();
      break;

    case "rectangle":
      if (fillColor.checked) {
        ctx.fillRect(prevMouseX, prevMouseY, width, height);
      } else {
        ctx.strokeRect(prevMouseX, prevMouseY, width, height);
      }
      break;

    case "circle":
      let radius = Math.sqrt(width ** 2 + height ** 2);
      ctx.beginPath();
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      fillColor.checked ? ctx.fill() : ctx.stroke();
      break;

    case "triangle":
      ctx.beginPath();
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(currX, currY);
      ctx.lineTo(prevMouseX * 2 - currX, currY);
      ctx.closePath();
      fillColor.checked ? ctx.fill() : ctx.stroke();
      break;
  }
};

// Stop draw
const stopDraw = () => {
  isDrawing = false;
};

// Tool tanlash
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".tool.active")?.classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

// Brush size
sizeSlider.addEventListener("change", () => (brushSize = sizeSlider.value));

// Ranglar tanlovi
colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".option.selected")?.classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window.getComputedStyle(btn).backgroundColor;
  });
});

colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
  document.querySelector(".option.selected")?.classList.remove("selected");
});

// Tozalash
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Saqlash
saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "chizma.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Event listeners
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);
