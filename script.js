// --- 1. INTERACTIVE 3D PARTICLES BACKGROUND ---
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#D4AF37", "#00d2ff", "#9d50bb"] }, // Gold, Blue, Purple
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#D4AF37", "opacity": 0.1, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "window",
        "events": { 
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 0.4 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

// --- 2. MOBILE HAMBURGER MENU ---
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const lines = document.querySelectorAll('.hamburger div');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    lines[0].style.transform = mobileMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    lines[1].style.opacity = mobileMenu.classList.contains('active') ? '0' : '1';
    lines[2].style.transform = mobileMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        lines.forEach(line => { line.style.transform = 'none'; line.style.opacity = '1'; });
    });
});

// --- 3. MONTHLY PAYOUT COUNTDOWN TIMER ---
function updateTimer() {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}
setInterval(updateTimer, 1000);
updateTimer();

// --- 4. CUSTOM GLOWING CURSOR (Desktop Only) ---
if (window.innerWidth > 992) {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    // Added .mockup-card here so cursor expands when hovering over mockups too
    const links = document.querySelectorAll('a, button, input, .product-card, .step-card, .mockup-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => { follower.style.left = e.clientX + 'px'; follower.style.top = e.clientY + 'px'; }, 50);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.style.opacity = '0'; });
        link.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.style.opacity = '1'; });
    });
}

// --- 5. NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// --- 6. 3D TILT EFFECT ON CARDS ---
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        if (window.innerWidth < 992) return; 
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -15; 
        const rotateY = ((x / rect.width) - 0.5) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});

// --- 7. NUMBER COUNTER ANIMATION ---
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / 150;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target >= 1000 ? (target/1000) + 'K' : target;
        }
    };
    updateCount();
});

// --- 8. GSAP SCROLL ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

gsap.from(".gsap-up", { y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out" });

gsap.utils.toArray('.gsap-scroll').forEach(element => {
    gsap.from(element, {
        scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out"
    });
});

// --- 9. AFFILIATE FORM LOGIC ---
document.getElementById('licenseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const uniqueID = "TP-ROYAL-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('nameDisplay').innerText = name.toUpperCase();
    document.getElementById('idDisplay').innerText = uniqueID;
    
    const licenseView = document.getElementById('licenseView');
    licenseView.style.display = 'block';
    gsap.fromTo(licenseView, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    
    setTimeout(() => { window.location.href = "https://trendypixel.gumroad.com/affiliates"; }, 3000);
});