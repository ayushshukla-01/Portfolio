// Typing effect
const typingText = document.querySelector(".typing");
const roles = ["Frontend Developer", "AI Enthusiast", "Cross-Platform Builder"];
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
