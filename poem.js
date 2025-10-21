document.querySelectorAll('.click-letter').forEach(letter => {
  letter.addEventListener('click', () => {
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
document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelectorAll('.poem-overlay.active').forEach(overlay => {
    overlay.classList.remove('active');
  });
  // Remove class from html to enable page scroll
  document.documentElement.classList.remove('poem-overlay-active');
  // Hide close button
  document.querySelector('.close-btn').style.display = 'none';
});

// Remove the event listener from the overlay elements
document.querySelectorAll('.poem-overlay').forEach(overlay => {
  overlay.removeEventListener('click', (e) => {
    if (!e.target.closest('.poem-content')) {
      overlay.classList.remove('active');
      // Remove class from html to enable page scroll
      document.documentElement.classList.remove('poem-overlay-active');
      // Hide close button
      document.querySelector('.close-btn').style.display = 'none';
    }
  });
});
  // Prevent scrolling on overlay background
  overlay.addEventListener('wheel', (e) => {
    if (!e.target.closest('.poem-content')) {
      e.preventDefault();
    }
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
});
