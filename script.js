/* ========================================
   OceanAI Case Study — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavScroll();
  initScrollReveal();
  initSmoothScroll();
  initCountUp();
});

/* ── Particle Background ── */
function initParticles() {
  const container = document.querySelector('.bg-particles');
  if (!container) return;
  
  const particleCount = 40;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.4;
    
    // Randomize glow color between blue/cyan/teal
    const colors = ['#0ea5e9', '#22d3ee', '#2dd4bf', '#7dd3fc', '#60a5fa'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.background}`;
    
    container.appendChild(particle);
  }
}

/* ── Navbar Scroll Effect ── */
function initNavScroll() {
  const nav = document.querySelector('.case-nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (!reveals.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // If parent has stagger-children, also animate children
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, i * 80);
          });
        }
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

/* ── Smooth Scroll for Nav Links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.case-nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ── Count-Up Animation for Stats ── */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateValue(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(el => observer.observe(el));
}

function animateValue(el) {
  const text = el.textContent;
  const match = text.match(/(\d+)/);
  if (!match) return;
  
  const target = parseInt(match[1]);
  const suffix = text.replace(match[1], '').trim();
  const prefix = text.indexOf(match[1]) > 0 ? text.substring(0, text.indexOf(match[1])) : '';
  const duration = 1800;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    
    el.textContent = prefix + current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = text; // Restore original text
    }
  }
  
  requestAnimationFrame(update);
}

/* ── Parallax-like mouse effect on hero ── */
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const rect = hero.getBoundingClientRect();
  if (e.clientY > rect.bottom) return;
  
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  
  const gradient1 = hero.querySelector('.hero-gradient');
  const gradient2 = hero.querySelector('.hero-gradient-2');
  
  if (gradient1) {
    gradient1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  }
  if (gradient2) {
    gradient2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
  }
});
