const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const colors = ["#00c6ff", "#0072ff", "#ffffff", "#4db6ff"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.02; // shrink
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const count = 120;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 3 + 1;
    const speedX = (Math.random() - 0.5) * 1;
    const speedY = (Math.random() - 0.5) * 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    const p = particlesArray[i];
    p.update();
    p.draw();
    if (p.size <= 0.2) {
      particlesArray.splice(i, 1);
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      const speedX = (Math.random() - 0.5) * 1;
      const speedY = (Math.random() - 0.5) * 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
    }
  }
  requestAnimationFrame(animate);
}

initParticles();
animate();
