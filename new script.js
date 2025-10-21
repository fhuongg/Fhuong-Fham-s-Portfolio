if (window.innerWidth > 820) {
    const element = document.getElementById('dropVideo');
    const element2 = document.getElementById('box');
    const element3 = document.getElementById('box-cover');
    const element4 = document.getElementsByClassName('box-items');
    const bio = document.querySelector('.bio');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            bio.style.display = 'block';
            element.classList.add('shift-left');
            element2.classList.add('shift-left');
            element3.classList.add('shift-left');
            for (let i = 0; i < element4.length; i++) {
                element4[i].classList.add('shift-left-1');
            }
        }, 6000);
    });
    const quietButton = document.getElementById('quiet');
const itemToAppear = document.getElementById('item-fragile');

quietButton.addEventListener('click', function() {
  itemToAppear.style.display = 'block';
});
const ideasButton = document.getElementById('ideas');
const itemToAppear1 = document.getElementById('item-bag');

ideasButton.addEventListener('click', function() {
  itemToAppear1.style.display = 'block';
});
const booksButton = document.getElementById('books');
const itemToAppear2 = document.getElementById('item-books');

booksButton.addEventListener('click', function() {
  itemToAppear2.style.display = 'block';
});
const vinylButton = document.getElementById('playlists');
const itemToAppear3 = document.getElementById('item-vinyl');
vinylButton.addEventListener('click', function() {
  itemToAppear3.style.display = 'block';
});
}


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
const letter = document.getElementById('guest-check-form');
const mailbox = document.querySelector(".mailbox");

letter.draggable = true;

letter.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "letter");
});

mailbox.addEventListener("dragover", (e) => {
  e.preventDefault(); // allow drop
});

mailbox.addEventListener("drop", (e) => {
  e.preventDefault();
  letter.classList.add("sent");
  setTimeout(() => {
    alert("Message sent! 📮");
  }, 1200);
});
document.addEventListener('DOMContentLoaded', function() {
    // Find the Works link and its submenu
    const worksLink = document.querySelector('.menu-links');
    const submenu = document.querySelector('.submenu');
    
    // If elements are found, add click event
    if (worksLink && submenu) {
        worksLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default link behavior
            submenu.classList.toggle('active');
        });
    }
    
    // Close submenu when clicking anywhere else
    document.addEventListener('click', function(e) {
        if (!worksLink.contains(e.target) && !submenu.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });
    
    // Close submenu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            submenu.classList.remove('active');
        }
    });
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


document.addEventListener('DOMContentLoaded', function() {
    // Find the Works link and its submenu
    const worksLink = document.querySelector('.menu-links');
    const submenu = document.querySelector('.submenu');
    
    // If elements are found, add click event
    if (worksLink && submenu) {
        worksLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default link behavior
            submenu.classList.toggle('active');
        });
    }
    
    // Close submenu when clicking anywhere else
    document.addEventListener('click', function(e) {
        if (!worksLink.contains(e.target) && !submenu.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });
    
    // Close submenu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            submenu.classList.remove('active');
        }
    });
});