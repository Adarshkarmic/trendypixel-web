gsap.registerPlugin(ScrollTrigger);

// 1. PRELOADER ANIMATION (FIXED: Waits for page to fully load)
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    tl.to(".progress", { width: "100%", duration: 1, ease: "power3.inOut" })
      .to(".preloader", { y: "-100%", duration: 0.8, ease: "power4.inOut" })
      .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".hero-title", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
      .from(".hero-desc-box, .hero-actions", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4");
});

// 2. LENIS SMOOTH SCROLL (The Butter Effect)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
gsap.ticker.lagSmoothing(0, 0);

// 3. CUSTOM MAGNETIC CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

const magneticBtns = document.querySelectorAll('.magnetic-btn, .tp-card');
magneticBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => follower.classList.add('active'));
    btn.addEventListener('mouseleave', () => {
        follower.classList.remove('active');
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    });

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
    });
});

// 4. 🔥 HORIZONTAL SCROLL (THE $10k EFFECT) 🔥
const horizontalContainer = document.getElementById("horizontal-container");

if(horizontalContainer) {
    gsap.to(horizontalContainer, {
        x: () => -(horizontalContainer.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: {
            trigger: "#vault-track",
            start: "top top",
            end: () => "+=" + horizontalContainer.scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });
}

// 5. GSAP SCROLL REVEALS
const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 50 }, 
        { 
            duration: 1, 
            autoAlpha: 1, 
            y: 0, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 6. AFFILIATE LICENSE LOGIC
const form = document.getElementById('licenseForm');
if(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const uniqueID = "TP-" + Math.floor(100000 + Math.random() * 900000);
        
        document.getElementById('nameDisplay').innerText = name;
        document.getElementById('idDisplay').innerText = uniqueID;
        
        const licenseView = document.getElementById('licenseView');
        licenseView.style.display = 'block';

        gsap.fromTo(licenseView, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
        );

        setTimeout(() => {
            window.location.href = "https://trendypixel.gumroad.com/affiliates";
        }, 3500);
    });
}

// God Mode 11.0 Backup: The $10k Agency UI Lock