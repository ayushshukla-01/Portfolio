// === Typing effect ===
const typingText = document.querySelector(".typing");
const roles = ["Full Stack Developer", "Real-Time Systems Builder", "Cross-Platform Engineer"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function type() {
  if (!isDeleting && j < roles[i].length) {
    currentText += roles[i][j];
    j++;
  } else if (isDeleting && j > 0) {
    currentText = currentText.slice(0, -1);
    j--;
  }
  typingText.textContent = currentText;

  if (!isDeleting && j === roles[i].length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
  }
  setTimeout(type, isDeleting ? 80 : 120);
}
type();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

// === Modal helpers (shared by image, project, and certificate modals) ===
const allModals = () => document.querySelectorAll('.modal, .project-modal, .cert-modal');

function openModal(el) {
  el.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(el) {
  el.style.display = 'none';
  const anyOpen = Array.from(allModals()).some(m => m.style.display === 'block');
  if (!anyOpen) document.body.style.overflow = '';
}

function closeAllModals() {
  allModals().forEach(m => { if (m.style.display === 'block') closeModal(m); });
}

// === Profile Picture Zoom Modal ===
const imgModal = document.getElementById("imgModal");
const profileImg = document.getElementById("profilePic");
const modalImg = document.getElementById("modalImage");
const closeImgBtn = document.querySelector(".close");

profileImg.addEventListener("click", () => {
  modalImg.src = profileImg.src;
  openModal(imgModal);
});

closeImgBtn.addEventListener("click", () => closeModal(imgModal));

window.addEventListener("click", (e) => {
  if (e.target === imgModal) closeModal(imgModal);
});

// Escape closes whichever modal is open (image, project, or certificate)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
});

// Scroll reveal animations
if (window.ScrollReveal && !prefersReducedMotion) {
  ScrollReveal().reveal('.glass, .skills-grid, .projects-grid, .timeline, .cert-grid', {
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    interval: 200
  });
}

// === Interactive Floating Blue Particles Background ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numParticles = prefersReducedMotion ? 0 : 60;
let mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesArray = [];
  for (let n = 0; n < numParticles; n++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 0.6;
    const dy = (Math.random() - 0.5) * 0.6;
    particlesArray.push({ x, y, dx, dy, size });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 180, 216, 0.9)';
  ctx.shadowColor = '#00b4d8';
  ctx.shadowBlur = 8;

  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        p.x -= Math.cos(angle) * force * 3;
        p.y -= Math.sin(angle) * force * 3;
      }
    }
  });

  connectParticles();
  if (numParticles > 0) requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize', initParticles);

initParticles();
if (numParticles > 0) {
  animateParticles();
} else {
  // Reduced motion: draw one static frame instead of a running animation
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// === Project Modals ===
const projectCards = document.querySelectorAll('.project-card');
const projectModals = document.querySelectorAll('.project-modal');
const projectCloseBtns = document.querySelectorAll('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const target = card.getAttribute('data-project');
    const targetModal = document.getElementById(target);
    if (targetModal) openModal(targetModal);
  });
});

projectCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.closest('.project-modal')));
});

window.addEventListener('click', (e) => {
  projectModals.forEach(modalEl => {
    if (e.target === modalEl) closeModal(modalEl);
  });
});


// === Mouse-tracking 3D tilt (project, skill, edu, cert cards) ===
// Skipped on touch devices (no hover/pointer precision) and for reduced-motion users.
if (!isTouchDevice && !prefersReducedMotion) {
  const tiltSelectors = '.project-card, .skill-card, .edu-card, .cert-card';
  document.querySelectorAll(tiltSelectors).forEach(card => {
    const maxTilt = 10; // degrees

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0 -> 1
      const py = (e.clientY - rect.top) / rect.height;    // 0 -> 1

      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      card.style.transition = 'none';
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = '';
    });
  });
}
