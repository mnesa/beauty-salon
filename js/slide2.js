// ====================================
// Testimonial slider

const track2 = document.getElementById('sliderTrack');
const slides2 = document.querySelectorAll('.slide');
const totalSlides = slides2.length;
let index2 = 0;

// প্রথম 3টা slide clone করা
for (let i = 0; i < 3; i++) {
  const clone = slides2[i].cloneNode(true);
  track2.appendChild(clone);
}


function updateActive() {
  slides2.forEach(slide => slide.classList.remove('active'));
  // মাঝের slide = index2 + 1 (অর্থাৎ পরেরটা কেন্দ্র)
  let activeIndex = (index2 + 1) % totalSlides;
  slides2[activeIndex].classList.add('active');
}

function move(dir) {
  const slideWidth = slides2[0].offsetWidth + 16; // gap
  index2 += dir;
  track2.style.transition = 'transform 0.5s ease-in-out';
  track2.style.transform = `translateX(-${index2 * slideWidth}px)`;
  
  updateActive(); // প্রতিবার move করার সময় active আপডেট

  if (index2 >= totalSlides) {
    setTimeout(() => {
      track2.style.transition = 'none';
      index2 = 0;
      track2.style.transform = `translateX(-${index2 * slideWidth}px)`;
      updateActive();
    }, 500);
  } else if (index2 < 0) {
    index2 = totalSlides - 1;
    track2.style.transition = 'none';
    track2.style.transform = `translateX(-${index2 * slideWidth}px)`;
    updateActive();
  }
}

// প্রথমেই active সেট করা
updateActive();

