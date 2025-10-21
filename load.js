// 1. Randomize avatar + quote
console.log("load.js loaded");
const base = window.location.pathname.includes('/web/') ? '../' : '';
const avatars = [
  { image: base + "img/kb.png", quote: "Silly Asian girl likes to play with code." },
  { image: base + "img/lll.gif", quote: "A little bit of madness is key." },
  { image: base + "img/et.png", quote: "I can't see anything I don't like about you." },
  { image: base + "img/fox.gif", quote: "I know what it's like to feel ~different~" },

];

const random = avatars[Math.floor(Math.random() * avatars.length)];
console.log("Random avatar selected:", random.image);

let avatarLoaded = false;
let windowLoaded = false;
let avatarDisplayed = false;
let videosLoaded = 0;
const totalVideos = 2;
let canvasImageLoaded = false;

const checkReady = () => {
  if (avatarLoaded && windowLoaded && avatarDisplayed && videosLoaded === totalVideos && canvasImageLoaded) {
    // Show loading container
    document.querySelector('.loading-container').style.display = 'block';

    // Fade out effect
    document.getElementById("fade-overlay").classList.add("fade-out");

    // Wait for fade transition, then hide loading elements, remove loading styles, and show main content
    setTimeout(() => {
      document.querySelector('.loading-container').style.display = 'none';
      document.getElementById("fade-overlay").style.display = 'none';
      document.body.classList.remove('loading-body');
      document.getElementById("main-content").style.display = 'block';

      // Trigger canvas redraw after main content is visible
      setTimeout(() => {
        if (window.resizeAndRedraw) window.resizeAndRedraw();
      }, 100);
    }, 1600);
  }
};

// Wait for avatar to load
const avatarImg = new Image();
avatarImg.src = random.image;
avatarImg.onload = () => {
  document.getElementById("avatar").src = random.image;
  document.getElementById("quote").textContent = random.quote;
  setTimeout(() => {
    avatarLoaded = true;
    avatarDisplayed = true;
    checkReady();
  }, 500); // Small delay to ensure image is displayed
};
avatarImg.onerror = () => {
  // If avatar fails to load, use a fallback
  document.getElementById("avatar").src = base + "img/kb.png";
  document.getElementById("quote").textContent = "A little madness is key.";
  avatarLoaded = true;
  avatarDisplayed = true;
  checkReady();
};

// Preload videos
const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = src;
    video.onloadeddata = () => resolve();
    video.onerror = () => resolve(); // Count as loaded even on error
  });
};

const preloadVideos = async () => {
  await Promise.all([
    preloadVideo(base + 'img/scratch.webm'),
    preloadVideo(base + 'img/end.webm')
  ]);
  videosLoaded = totalVideos;
  checkReady();
};

// Preload canvas image
const preloadCanvasImage = () => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base + "img/Artboard 1.svg";
    img.onload = () => {
      canvasImageLoaded = true;
      resolve();
    };
    img.onerror = () => {
      canvasImageLoaded = true; // Count as loaded even on error
      resolve();
    };
  });
};

// Wait for the DOM to be ready
window.addEventListener('DOMContentLoaded', async () => {
  windowLoaded = true;
  // Preload canvas image first
  await preloadCanvasImage();
  // Then preload videos
  await preloadVideos();
  checkReady();
});
