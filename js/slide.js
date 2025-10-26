// =================================
// carousel

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.btn2.prev');
const nextBtn = document.querySelector('.btn2.next');

let slides = Array.from(track.children);
let index = 1; // start at first real slide (because we have last-clone at index 0)
let size = slides[index].getBoundingClientRect().width;
let isMoving = false;
let autoplayInterval = 3000;
let autoplayTimer = null;

function setPosition() {
  // recalc slides and size (useful after resize)
  slides = Array.from(track.children);
  size = slides[index].getBoundingClientRect().width;
  track.style.transition = 'none';
  track.style.transform = `translateX(${-size * index}px)`;
  // small timeout to allow browser apply style before enabling transition again
  requestAnimationFrame(() => {
    track.style.transition = 'transform 0.6s ease-in-out';
  });
}

// initial position
track.style.transform = `translateX(${-size * index}px)`;

// move helper
function moveTo(indexTo) {
  if (isMoving) return;
  isMoving = true;
  index = indexTo;
  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(${-size * index}px)`;
}

// next / prev
nextBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveTo(index + 1);
});

prevBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveTo(index - 1);
});

// handle transition end for infinite loop effect
track.addEventListener('transitionend', () => {
  // refresh slides array (in case DOM changed)
  slides = Array.from(track.children);

  // if we're on the "first-clone" (the cloned first slide at the end)
  if (slides[index].id === 'first-clone') {
    track.style.transition = 'none';
    index = 1; // real first slide
    track.style.transform = `translateX(${-size * index}px)`;
  }

  // if we're on the "last-clone" (the cloned last slide at the start)
  if (slides[index].id === 'last-clone') {
    track.style.transition = 'none';
    index = slides.length - 2; // real last slide
    track.style.transform = `translateX(${-size * index}px)`;
  }

  // allow next move after a tick
  requestAnimationFrame(() => {
    isMoving = false;
    // re-enable transition so next moves animate
    track.style.transition = 'transform 0.6s ease-in-out';
  });
});

// autoplay (increment index)
function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    if (isMoving) return;
    moveTo(index + 1); // move right-to-left (next)
  }, autoplayInterval);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

// pause on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);

// responsive: recalc size on resize
window.addEventListener('resize', () => {
  // small debounce
  clearTimeout(window._carouselResizeTimer);
  window._carouselResizeTimer = setTimeout(() => {
    setPosition();
  }, 100);
});

// start autoplay
startAutoplay();

// debugging কোড যোগ
// console.log("Current index:", index);
// console.log("Track transform:", track.style.transform);
// console.log("isSliding:", isSliding);