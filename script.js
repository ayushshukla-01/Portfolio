// Typing effect
const typingText = document.querySelector(".typing");
const roles = ["Fullstack Developer", "AI Enthusiast", "Cross-Platform Builder"];
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

// Scroll reveal animations
ScrollReveal().reveal('.glass, .skills-grid, .projects-grid, .timeline, .cert-list', { 
  distance: '50px', 
  duration: 1000, 
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 200 
});
// === Interactive Floating Blue Particles Background ===
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;
const numParticles = 60;
let mouse = {
  x: null,
  y: null,
  radius: 100 // Area of influence
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 0.6;
    let dy = (Math.random() - 0.5) * 0.6;
    particlesArray.push({ x, y, dx, dy, size });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 180, 216, 0.9)'; // brighter glow
ctx.shadowColor = '#00b4d8';
ctx.shadowBlur = 8;


  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Move
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    // Mouse interaction
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      let angle = Math.atan2(dy, dx);
      let force = (mouse.radius - distance) / mouse.radius;
      let moveX = Math.cos(angle) * force * 3;
      let moveY = Math.sin(angle) * force * 3;
      p.x -= moveX;
      p.y -= moveY;
    }
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
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
animateParticles();


