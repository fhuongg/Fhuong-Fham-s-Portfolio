// Test console log at the very top
console.log("Script.js loaded at top!");
const worksLink = document.getElementById('works-link');
const dropdown = document.querySelector('.has-dropdown .dropdown');

worksLink.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
const urls = [
  'mm.html',
  'poetry.html',
  'uiux.html',
  'graphic.html'
];


const dropdownItems = document.querySelectorAll('.dropdown-item');

dropdownItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    window.location.href = urls[index];
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    dropdown.style.display = 'none';
  }
});

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// Load your logo/cover image (SVG is fine)
const coverImage = new Image();
coverImage.src = "img/Artboard 1.svg"; // your logo

// Recalculate canvas size to exactly match its displayed size
function resizeAndRedraw() {
  if (!canvas) return; // Safety check

  const rect = canvas.getBoundingClientRect();          // display size (CSS px)
  const dpr = window.devicePixelRatio || 1;             // for crisp rendering

  // Set the canvas's internal pixel size to match its display size * dpr
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));

  // Use a transform so all drawing uses CSS pixels as units
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);               // reset+scale
  ctx.clearRect(0, 0, rect.width, rect.height);

  if (coverImage.complete) {
    // Draw the cover image scaled to the canvas's display size
    ctx.drawImage(coverImage, 0, 0, rect.width, rect.height);
  } else {
    // Draw a placeholder if image not loaded
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Loading...", rect.width / 2, rect.height / 2);
  }
}

coverImage.onload = () => {
  resizeAndRedraw();
};

// Re-draw on resize so everything stays aligned responsively
window.addEventListener("resize", resizeAndRedraw);

// Ensure redraw after full page load to handle any sizing issues
window.addEventListener("load", () => {
  setTimeout(() => {
    resizeAndRedraw();
  }, 1000); // Small delay to ensure everything is ready
});

// Initial draw when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  resizeAndRedraw();
});

// ----- Scratch logic -----
let scratching = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// Smooth brush using arcs, in CSS pixel units (thanks to ctx transform above)
const BRUSH_RADIUS = 40;

function scratchAt(x, y) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out"; // erase
  ctx.beginPath();
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// (Optional) make continuous strokes extra-smooth
let lastPos = null;
function strokeTo(pos) {
  if (!lastPos) {
    scratchAt(pos.x, pos.y);
    lastPos = pos;
    return;
  }
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = BRUSH_RADIUS * 2;
  ctx.beginPath();
  ctx.moveTo(lastPos.x, lastPos.y);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.restore();
  lastPos = pos;
}

// Mouse
canvas.addEventListener("mousedown", (e) => {
  scratching = true;
  lastPos = null;
  strokeTo(getPos(e));
});
canvas.addEventListener("mousemove", (e) => {
  if (!scratching) return;
  strokeTo(getPos(e));
});
["mouseup", "mouseleave"].forEach(ev =>
  canvas.addEventListener(ev, () => { scratching = false; lastPos = null; })
);

// Touch
canvas.addEventListener("touchstart", (e) => {
  scratching = true;
  lastPos = null;
  strokeTo(getPos(e));
}, { passive: true });

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // prevent page scroll while scratching
  if (!scratching) return;
  strokeTo(getPos(e));
}, { passive: false });

canvas.addEventListener("touchend", () => { scratching = false; lastPos = null; });

//dragging items
let topZ = 1000; // stacking order tracker

function makeDraggable(el) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // --- Mouse Events ---
  el.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    moveDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", endDrag);

  // --- Touch Events ---
  el.addEventListener("touchstart", (e) => {
    let touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    let touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  });

  document.addEventListener("touchend", endDrag);

  // --- Helper functions ---
  function startDrag(x, y) {
    isDragging = true;

    offsetX = x - el.offsetLeft;
    offsetY = y - el.offsetTop;

    el.style.cursor = "grabbing";

    // bring element to front
    topZ++;
    el.style.zIndex = topZ;

    // add shadow
    el.style.filter = "drop-shadow(6px 6px 10px rgba(209, 143, 143, 0.3))";
  }

  function moveDrag(x, y) {
    el.style.left = `${x - offsetX}px`;
    el.style.top = `${y - offsetY}px`;
  }

  function endDrag() {
    if (isDragging) {
      isDragging = false;
      el.style.cursor = "grab";

      // remove shadow on drop
      el.style.filter = "none";
    }
  }

  // base styles
  el.style.cursor = "grab";
  el.style.position = "absolute";
}

// enable dragging for all items with .decor
const items = document.querySelectorAll(".decor");
items.forEach((item) => makeDraggable(item));

// enable dragging for cart items
const cartItems = document.querySelectorAll(".cart-item");
cartItems.forEach((item) => makeDraggable(item));

const spinStars = ["star1", "star3","star2"];

spinStars.forEach(id => {
  const star = document.getElementById(id);

  star.addEventListener("click", () => {
    star.classList.add("spin");

    star.addEventListener("transitionend", () => {
      star.classList.remove("spin");
    }, { once: true });
  });
});
// Get the doll-box element


const uiTItle = document.getElementById('ui-title');
const uiTItleAppear = document.getElementById('ui-title-1');

uiTItle.addEventListener('click', function() {
  uiTItleAppear.style.display = 'block';
});

// Cart click interaction
document.getElementById('badge').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = './CV_FHUONGFHAM.pdf'; // use "./" to ensure it looks in the same folder
  link.download = 'CV_FHUONGFHAM.pdf';
  document.body.appendChild(link); // some browsers need it in the DOM
  link.click();
  document.body.removeChild(link);
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const dropdown = document.querySelector('.mobile-dropdown');
    const body = document.body;
    const submenuTrigger = document.querySelector('.menu-links');
    const submenu = document.querySelector('.submenu');

    // Toggle main dropdown
    if (hamburger && dropdown) {
        hamburger.addEventListener('click', function() {
            dropdown.classList.toggle('active');
            body.classList.toggle('no-scroll');
            hamburger.classList.toggle('active'); // Toggle the active class for hamburger icon
            
            // Close submenu when closing main menu
            if (!dropdown.classList.contains('active')) {
                submenu.classList.remove('active');
            }
        });
    }

    // Toggle submenu
    if (submenuTrigger && submenu) {
        submenuTrigger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent link navigation
            submenu.classList.toggle('active');
        });
    }

    // Close submenu when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!submenuTrigger.contains(e.target) && !submenu.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });

    // Video playback functionality for About link
    const aboutLink = document.getElementById('about-link');
    const video = document.getElementById('video-bg-1');

    if (aboutLink && video) {
        aboutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default navigation
            video.classList.add('playing'); // Add class to make it visible
            video.play(); // Play the video

            // Redirect to about.html after the video ends
            video.addEventListener('ended', function() {
                window.location.href = 'about.html';
            });
        });
    }
});
