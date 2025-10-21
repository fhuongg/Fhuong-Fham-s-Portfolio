const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// load your logo/image as the "cover"
const coverImage = new Image();
coverImage.src = "img/Artboard 1.svg"; // your logo

coverImage.onload = () => {
  ctx.drawImage(coverImage, 0, 0, canvas.width, canvas.height);
};

// scratch settings
let scratching = false;

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function scratch(x, y) {
  ctx.globalCompositeOperation = "destination-out"; // erase instead of draw
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2); // 40px radius circle
  ctx.fill();
}

canvas.addEventListener("mousedown", (e) => {
  scratching = true;
  const pos = getMousePos(e);
  scratch(pos.x, pos.y);
});

canvas.addEventListener("mousemove", (e) => {
  if (!scratching) return;
  const pos = getMousePos(e);
  scratch(pos.x, pos.y);
});

canvas.addEventListener("mouseup", () => scratching = false);
canvas.addEventListener("mouseleave", () => scratching = false);