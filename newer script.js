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
const uiTItle1 = document.getElementById('ui-title');
const uiTItleAppear1 = document.getElementById('ui-title-1');

document.addEventListener('DOMContentLoaded', function() {
  const uiTItle1 = document.getElementById('ui-title');
  const uiTItleAppear1 = document.getElementById('ui-title-1');

  uiTItle1.addEventListener('click', function() {
    console.log('uiTItle clicked');
    uiTItleAppear1.style.visibility = 'visible';
    uiTItle1.style.display = 'none';
  });

  uiTItleAppear1.addEventListener('click', function() {
    uiTItleAppear1.style.visibility = 'hidden';
    uiTItle1.style.display = 'block';
  });
});
