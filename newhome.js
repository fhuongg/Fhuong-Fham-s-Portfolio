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
    console.log("DOM loaded");

    // Listen for clicks on the whole document
    document.body.addEventListener('click', function(event) {
        // If the clicked element has the .hamburger class
        if (event.target.classList.contains('hamburger')) {
            console.log("Hamburger clicked via delegation");
            const dropdown = document.querySelector('.mobile-dropdown');
            dropdown.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }

        // Optional: Close menu if clicking outside (event delegation version)
        if (!event.target.closest('.mobile-header') && !event.target.closest('.mobile-dropdown')) {
            const dropdown = document.querySelector('.mobile-dropdown');
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
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