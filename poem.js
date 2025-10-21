let scrollPosition = 0;

document.querySelectorAll('.click-letter').forEach(letter => {
  letter.addEventListener('click', () => {
    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // Prevent page jump by fixing body position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    const overlayId = letter.getAttribute('data-overlay');
    const overlay = document.getElementById(overlayId);
    overlay.classList.add('active');
    // Add class to html to disable page scroll
    document.documentElement.classList.add('poem-overlay-active');
    // Show close button
    document.querySelector('.close-btn').style.display = 'flex';
  });
});

// Close overlay when clicking outside the content
document.querySelectorAll('.poem-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (!e.target.closest('.poem-content')) {
      overlay.classList.remove('active');
      // Remove class from html to enable page scroll
      document.documentElement.classList.remove('poem-overlay-active');
      // Hide close button
      document.querySelector('.close-btn').style.display = 'none';
      // Restore body position and scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
  });
  // Prevent scrolling on overlay background
  overlay.addEventListener('wheel', (e) => {
    if (!e.target.closest('.poem-content')) {
      e.preventDefault();
    }
  });
});

// Close overlay when clicking the close button
document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelectorAll('.poem-overlay.active').forEach(overlay => {
    overlay.classList.remove('active');
  });
  // Remove class from html to enable page scroll
  document.documentElement.classList.remove('poem-overlay-active');
  // Hide close button
  document.querySelector('.close-btn').style.display = 'none';
  // Restore body position and scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
});
