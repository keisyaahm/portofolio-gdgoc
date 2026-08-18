  
    const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
});

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

AOS.init({ once: true, offset: 50, duration: 800 });

const skills = ["UI/UX", "Product Design", "Branding", "Collaborative Team Player"];
let skillIndex = 0;
const skillText = document.getElementById("changing-skill");
setInterval(() => {
  skillText.style.opacity = 0;
  setTimeout(() => {
    skillIndex = (skillIndex + 1) % skills.length;
    skillText.innerText = skills[skillIndex];
    skillText.style.opacity = 1;
  }, 300);
}, 1500);

const customCursor = document.querySelector('.custom-cursor');
const projectWrappers = document.querySelectorAll('.project-img-wrapper');

if (window.innerWidth > 768) {
  gsap.set(customCursor, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
  
  window.addEventListener('mousemove', (e) => {
    gsap.to(customCursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
  });

  projectWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    wrapper.addEventListener('mouseenter', () => {
      gsap.to(customCursor, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(1.5)" });
      gsap.to(img, { scale: 1.08, opacity: 0.6, duration: 0.4 }); 
    });
    wrapper.addEventListener('mouseleave', () => {
      gsap.to(customCursor, { scale: 0, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(img, { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.4 }); 
    });
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const xPos = (e.clientX - rect.left - rect.width / 2) / 15; 
      const yPos = (e.clientY - rect.top - rect.height / 2) / 15;
      gsap.to(img, { x: xPos, y: yPos, duration: 0.2, ease: "power2.out" });
    });
  });
}

gsap.utils.toArray('.float-letter').forEach(layer => {
  const depth = layer.getAttribute('data-speed');
  gsap.to(layer, {
    y: "random(-40, 40)", x: "random(-30, 30)", rotation: "random(-25, 25)",
    duration: "random(4, 6)", repeat: -1, yoyo: true, ease: "sine.inOut"
  });
  gsap.to(layer, {
    yPercent: depth * 100, ease: "none",
    scrollTrigger: { trigger: "body", start: "top top", end: "bottom top", scrub: 1 }
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.menu-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });

  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});