document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!'); // Check if script runs

    const hamburger = document.querySelector('.hamburger');
    const dropdown = document.querySelector('.mobile-dropdown');
    const body = document.body;

    console.log('Hamburger found:', hamburger); // Check if element is found
    console.log('Dropdown found:', dropdown); // Check if element is found

    if (hamburger && dropdown) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked!'); // Check if click works
            dropdown.classList.toggle('active');
            body.classList.toggle('no-scroll');
            hamburger.classList.toggle('active');
            console.log('Toggled active class'); // Check if toggle works
        });
    } else {
        console.error('Could not find elements!');
    }

    // Photo stack cycling logic
    const labels = document.querySelectorAll('.photo-stack .polaroid');
    labels.forEach((label, index) => {
        label.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default label behavior
            const radios = document.querySelectorAll('.photo-stack input[type="radio"]');
            const nextIndex = (index + 1) % radios.length;
            radios[nextIndex].checked = true;
        });
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

// Video hover functionality for about2.html
document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const cartItems = document.querySelectorAll('.cart-item');

  console.log('Cart element:', cart);
  console.log('Cart items:', cartItems);

  if (cart) {
    cart.addEventListener('click', () => {
      console.log('Cart clicked');
      // Scroll to the items' position before the animation
      window.scrollTo({ top: document.body.scrollHeight * 2, behavior: 'smooth' });
      cartItems.forEach((item, index) => {
        setTimeout(() => {
          console.log(`Adding spread to item ${index}`);
          item.classList.add('spread');
        }, index * 200); // Stagger the animation
      });
    });
  } else {
    console.log('Cart element not found');
  }

  // Dragging mechanics for cart items
  let topZ = 1000; // stacking order tracker

  function makeDraggable(el) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let startX = 0;
    let startY = 0;
    el.isDragged = false; // flag to track if dragged

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
      startX = x;
      startY = y;
      el.isDragged = false; // reset flag

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
      // Check if moved more than 5px to consider it a drag
      if (Math.abs(x - startX) > 5 || Math.abs(y - startY) > 5) {
        el.isDragged = true;
      }
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

  // Enable dragging for cart items after they spread
  cartItems.forEach((item) => {
    makeDraggable(item);
    // Prevent link navigation if dragged
    item.addEventListener('click', function(e) {
      if (this.isDragged) {
        e.preventDefault();
      }
    });
  });
});
const form = document.getElementById("guest-check-form");

if (form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // stop Formspree redirect
    const data = new FormData(form);
    try {
      await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      form.reset(); // clears the form quietly
    } catch (error) {
      // you could log errors silently here if you want
      console.error("Form submission error:", error);
    }
  });
}

// Fun fact tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
    const funfactItems = document.querySelectorAll('.funfact-item');

    funfactItems.forEach(function(item) {
        const funfactText = item.querySelector('.funfact-text');
        const gaspImg = item.querySelector('img');

        if (!funfactText || !gaspImg) return;

        function showTooltip() {
            funfactText.style.opacity = '1';
        }

        function hideTooltip() {
            funfactText.style.opacity = '0';
        }

        function updateTooltipPosition(e) {
            const tooltipWidth = funfactText.offsetWidth;
            const tooltipHeight = funfactText.offsetHeight;
            let left = e.clientX + 10; // 10px to the right of cursor
            let top = e.clientY - tooltipHeight / 2; // centered vertically

            // Adjust if tooltip goes off screen
            if (left + tooltipWidth > window.innerWidth) {
                left = e.clientX - tooltipWidth - 10; // to the left
            }
            if (top < 0) {
                top = 0;
            } else if (top + tooltipHeight > window.innerHeight) {
                top = window.innerHeight - tooltipHeight;
            }

            funfactText.style.left = left + 'px';
            funfactText.style.top = top + 'px';
        }

        gaspImg.addEventListener('mouseenter', function(e) {
            showTooltip();
            updateTooltipPosition(e);
            document.addEventListener('mousemove', updateTooltipPosition);
        });

        gaspImg.addEventListener('mouseleave', function() {
            document.removeEventListener('mousemove', updateTooltipPosition);
            hideTooltip();
        });

        gaspImg.addEventListener('mousedown', function(e) {
            showTooltip();
            updateTooltipPosition(e);
        });
    });

    // Global mousemove for dragging position update
    let globalDragging = false;
    let currentText = null;

    document.addEventListener('mousedown', function(e) {
        if (e.target.closest('.funfact-item img')) {
            globalDragging = true;
            currentText = e.target.closest('.funfact-item').querySelector('.funfact-text');
        }
    });

    document.addEventListener('mouseup', function() {
        if (currentText) {
            currentText.style.opacity = '0';
        }
        globalDragging = false;
        currentText = null;
    });

    document.addEventListener('mousemove', function(e) {
        if (globalDragging && currentText) {
            const tooltipWidth = currentText.offsetWidth;
            const tooltipHeight = currentText.offsetHeight;
            let left = e.clientX + 10;
            let top = e.clientY - tooltipHeight / 2;

            if (left + tooltipWidth > window.innerWidth) {
                left = e.clientX - tooltipWidth - 10;
            }
            if (top < 0) {
                top = 0;
            } else if (top + tooltipHeight > window.innerHeight) {
                top = window.innerHeight - tooltipHeight;
            }

            currentText.style.left = left + 'px';
            currentText.style.top = top + 'px';
        }
    });
});
  const cart = document.getElementById('cart');
  
  cart.addEventListener('touchstart', function() {
    cart.style.animation = 'wiggle 0.5s ease-in-out';
  });
  
  cart.addEventListener('touchend', function() {
    cart.style.animation = '';
  });