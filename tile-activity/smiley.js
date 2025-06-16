// This script adds a smiley face with a burst animation on card click.
// Now, the smiley animates from a closed smile to an open smile when appearing.


// SVGs for closed smile, open smile, and frown
const closedSmileSVG = `
  <svg viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#fffbe7" stroke="#bfa181" stroke-width="4"/>
    <circle cx="22" cy="28" r="4" fill="#bfa181"/>
    <circle cx="42" cy="28" r="4" fill="#bfa181"/>
    <!-- Closed smile -->
    <path d="M25 40 Q32 45 39 40" stroke="#bfa181" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
`;
const openSmileSVG = `
  <svg viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#fffbe7" stroke="#bfa181" stroke-width="4"/>
    <circle cx="22" cy="28" r="4" fill="#bfa181"/>
    <circle cx="42" cy="28" r="4" fill="#bfa181"/>
    <!-- Open smile (arc with mouth opening) -->
    <path d="M25 40 Q32 52 39 40 Q32 48 25 40" stroke="#bfa181" stroke-width="3" fill="#ffe6a1" stroke-linecap="round"/>
  </svg>
`;
const frownSVG = `
  <svg viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#fffbe7" stroke="#bfa181" stroke-width="4"/>
    <circle cx="22" cy="28" r="4" fill="#bfa181"/>
    <circle cx="42" cy="28" r="4" fill="#bfa181"/>
    <path d="M25 46 Q32 36 39 46" stroke="#bfa181" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>
`;

// SVG for a big open smile
const bigSmileSVG = `
  <svg viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill="#fffbe7" stroke="#bfa181" stroke-width="4"/>
    <circle cx="22" cy="28" r="4" fill="#bfa181"/>
    <circle cx="42" cy="28" r="4" fill="#bfa181"/>
    <!-- Big open smile -->
    <path d="M20 38 Q32 60 44 38 Q32 54 20 38" stroke="#bfa181" stroke-width="3" fill="#ffe6a1" stroke-linecap="round"/>
  </svg>
`;

document.querySelectorAll('.card-clickable').forEach(card => {
  const faceDiv = card.querySelector('.smiley-face');
  let showingSmiley = false;

  card.addEventListener('click', () => {
    if (!showingSmiley) {
      // Show closed smile first
      faceDiv.innerHTML = closedSmileSVG;
      faceDiv.classList.remove('smiley-frown', 'smiley-fade');
      faceDiv.classList.add('smiley-burst');
      showingSmiley = true;

      // After a short delay, switch to open smile for the "pop" effect
      setTimeout(() => {
        // Only switch if still showing smiley (user didn't double-click fast)
        if (showingSmiley) {
          faceDiv.innerHTML = openSmileSVG;
        }
      }, 120); // 120ms for a quick transition
    } else {
      // Turn into frown, then fade out
      faceDiv.innerHTML = frownSVG;
      faceDiv.classList.remove('smiley-burst');
      faceDiv.classList.add('smiley-frown');
      setTimeout(() => {
        faceDiv.classList.add('smiley-fade');
        setTimeout(() => {
          faceDiv.classList.remove('smiley-frown', 'smiley-fade');
          faceDiv.innerHTML = '';
          showingSmiley = false;
        }, 150); // fade out duration
      }, 250); // frown animation duration
    }
  });

  // Double click for star/confetti burst and big smile
  card.addEventListener('dblclick', (e) => {
    e.preventDefault();
    // Show big smiley face with burst, no matter what face was there before
    faceDiv.innerHTML = bigSmileSVG;
    faceDiv.classList.remove('smiley-frown', 'smiley-fade');
    faceDiv.classList.add('smiley-burst');
    showingSmiley = true;
    createStarBurst(card);
  });
});

// Helper function to create a single star/confetti element
function createStarBurst(card) {
  // Create a wrapper for the burst
  const burst = document.createElement('div');
  burst.className = 'star-burst';

  // Number of stars/confetti
  const count = 14;
  // Use more saturated, high-contrast confetti colors
  const colors = [
    '#FFD700', // bright yellow
    '#FF3B30', // vivid red
    '#34C759', // bright green
    '#007AFF', // vivid blue
    '#AF52DE', // purple
    '#FF9500', // orange
    '#FF2D55', // pink
    '#FFFFFF', // white
    '#000000', // black
    '#00CFFF', // cyan
    '#FFEB3B', // lemon yellow
    '#FF4081', // hot pink
    '#00E676', // neon green
    '#FF1744'  // neon red
  ];

  for (let i = 0; i < count; i++) {
    // Random angle and distance
    const angle = (360 / count) * i + Math.random() * 15;
    const distance = 60 + Math.random() * 30;
    // Pick a random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    // Star or confetti shape
    const isStar = Math.random() > 0.4;
    let el;
    if (isStar) {
      el = document.createElement('div');
      el.className = 'burst-star';
      el.style.background = 'none';
      el.innerHTML = `<svg width="36" height="36" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,11 14,17 9,13 4,17 6,11 1,7 7,7" fill="${color}"/></svg>`;
    } else {
      el = document.createElement('div');
      el.className = 'burst-confetti';
      el.style.background = color;
    }
    // Set the animation with transform
    el.style.transform = `rotate(${angle}deg) translate(0,0)`;
    el.style.setProperty('--burst-angle', `${angle}deg`);
    el.style.setProperty('--burst-distance', `${distance}px`);
    burst.appendChild(el);
  }

  // Position burst in the center of the card
  burst.style.position = 'absolute';
  burst.style.left = '50%';
  burst.style.top = '50%';
  burst.style.pointerEvents = 'none';
  burst.style.zIndex = 10;

  card.appendChild(burst);

  // Remove burst after animation
  setTimeout(() => {
    burst.remove();
  }, 700);
}
