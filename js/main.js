// ================================
// navbar
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const dropdownBtn = document.querySelector('.drop-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');


const navLinks = document.querySelectorAll('#navLinks a:not(.drop-btn)'); // all links except dropdown button

// Hamburger toggle
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('show');
  menuToggle.innerHTML = navbar.classList.contains('show')
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Dropdown toggle on click (for all devices)
dropdownBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dropdownMenu.style.display =
    dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Click outside hide dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropdownMenu.style.display = 'none';
  }
});

// ==================================
// scroll page animation
const elements = document.querySelectorAll('.fade, .right-side');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => observer.observe(el));


// ================================
// Counting

let valueDisplays = document.querySelectorAll('.num');
let totalDuration = 3000; // total animation time in ms

// Counter function
function startCounter(valueDisplay) {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute('data-value'));
  let increment = endValue / (totalDuration / 20);

  let counter = setInterval(() => {
    startValue += increment;

    if (startValue >= endValue) {
      startValue = endValue;
      clearInterval(counter);
    }

    valueDisplay.textContent = Math.floor(startValue);
  }, 20);   // update every 20ms
}

// IntersectionObserver
let observerNum = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);  // start counting
      obs.unobserve(entry.target); 
    }
  });
}, { threshold: 0.5 }); 

// observe all .num element
valueDisplays.forEach(num => {
  observerNum.observe(num);
});
// =================================
// gallery

 const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');

document.querySelectorAll('.overlay .i-btn2').forEach(icon => {
  icon.addEventListener('click', (e) => {
    const imgSrc = e.target.closest('.gallery-item').querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
  });
});

close.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});



// =============================================
// form validation
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const success = document.getElementById('success');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // helper function
  function showError(element, message) {
    element.textContent = message;
    setTimeout(() => { element.textContent = ''; }, 3000);
  }

  let isValid = true;

  if (name.length < 3) {
    showError(nameError, "Name must be at least 3 characters.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    showError(emailError, "Invalid email format.");
    isValid = false;
  }

  if (subject === '') {
    showError(subjectError, "Subject is required.");
    isValid = false;
  }
  if (message === '') {
    showError(messageError, "Message is required.");
    isValid = false;
  }

  if (isValid) {
    success.textContent = "Message sent successfully.";
    document.getElementById('signupForm').reset();

    setTimeout(() => {
      success.textContent = '';
    }, 3000);
  }
});
// ============================================



