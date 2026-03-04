// --- 1. CUSTOM GLOWING CURSOR ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, input, .product-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower thoda delay se aata hai premium feel ke liye
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Jab button/link par hover kare toh cursor bada aur glowy ho jaye
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.style.opacity = '0';
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.style.opacity = '1';
    });
});

// --- 2. NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- 3. 3D TILT EFFECT ON CARDS ---
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position inside card
        const y = e.clientY - rect.top;
        
        // Calculate rotation (max 15 degrees)
        const rotateX = ((y / rect.height) - 0.5) * -15; 
        const rotateY = ((x / rect.width) - 0.5) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    // Reset position when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});

// --- 4. NUMBER COUNTER ANIMATION ---
const counters = document.querySelectorAll('.counter');
const speed = 200; // Jitna kam, utna fast

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            // Agar bada number hai (jaise 40000), toh steps me badhega
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 10);
        } else {
            // Exact number show karega end me
            counter.innerText = target >= 1000 ? (target/1000) + 'K' : target;
        }
    };
    updateCount();
});

// --- 5. GSAP SCROLL ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Hero section load hote hi upar aayega
gsap.from(".gsap-up", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Jaise hi scroll karoge, baaki sections reveal honge
gsap.utils.toArray('.gsap-scroll').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // Jab element screen ke 85% par aaye
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Affiliate Form Logic (Purana wala bas JS file me shift kar diya)
document.getElementById('licenseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const uniqueID = "TP-ROYAL-" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('nameDisplay').innerText = name.toUpperCase();
    document.getElementById('idDisplay').innerText = uniqueID;
    
    const licenseView = document.getElementById('licenseView');
    licenseView.style.display = 'block';
    gsap.fromTo(licenseView, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    
    setTimeout(() => { window.location.href = "https://trendypixel.gumroad.com/affiliates"; }, 4000);
});