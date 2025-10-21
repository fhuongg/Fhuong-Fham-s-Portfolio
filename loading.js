// 1. Randomize avatar + quote
const avatars = [
  { image: "img/kb.png", quote: "Silly Asian girl likes to play with code." },
  { image: "img/lll.gif", quote: "A little bit of madness is key." },
  { image: "img/et.png", quote: "I can't see anything I don't like about you." },

];

const random = avatars[Math.floor(Math.random() * avatars.length)];

let avatarLoaded = false;
let windowLoaded = false;

const checkReady = () => {
  if (avatarLoaded && windowLoaded) {
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
    }, 1600);
  }
};

// Force show loading container immediately for debugging
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.loading-container').style.display = 'block';
});

// Wait for avatar to load
const avatarImg = new Image();
avatarImg.src = random.image;
avatarImg.onload = () => {
  document.getElementById("avatar").src = random.image;
  document.getElementById("quote").textContent = random.quote;
  avatarLoaded = true;
  checkReady();
};
avatarImg.onerror = () => {
  // If avatar fails to load, use a fallback
  document.getElementById("avatar").src = "img/kb.png";
  document.getElementById("quote").textContent = "A little madness is key.";
  avatarLoaded = true;
  checkReady();
};

// Wait for the DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  windowLoaded = true;
  checkReady();
});
