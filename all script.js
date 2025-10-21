console.log("JS file loaded!");
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

const workItem = document.getElementById('head-in-the-clouds');

workItem.addEventListener('click', function() {
  window.location.href = 'Headintheclouds.html';
});
const workItem1 = document.getElementById('rot-daughter');

workItem1.addEventListener('click', function() {
  window.location.href = 'rotdaughter.html';
});

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
const backToWorks = document.getElementById('back-mm');
backToWorks.addEventListener('click', function() {
  window.location.href = 'mm.html';
});
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!'); // Check if script runs
    
    const hamburger = document.querySelector('.hamburger');
    const dropdown = document.querySelector('.mobile-dropdown');
    
    console.log('Hamburger found:', hamburger); // Check if element is found
    console.log('Dropdown found:', dropdown); // Check if element is found
    
    if (hamburger && dropdown) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked!'); // Check if click works
            dropdown.classList.toggle('active');
            console.log('Toggled active class'); // Check if toggle works
        });
    } else {
        console.error('Could not find elements!');
    }
});
