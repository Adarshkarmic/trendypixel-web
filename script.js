gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

// 2. 🔥 4D STORY SCROLL INTERACTION 🔥
// Pin the story container
ScrollTrigger.create({
    trigger: ".story-sequence",
    start: "top top",
    end: "bottom bottom",
    pin: ".story-container"
});

// Animate paragraphs one by one based on scroll position
const paragraphs = [".p1", ".p2", ".p3", ".p4"];
const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".story-sequence",
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // Makes animation tie perfectly to scroll speed
    }
});

paragraphs.forEach((p, index) => {
    timeline.to(p, { opacity: 1, y: 0, duration: 1 })
            .to(p, { opacity: 0, y: -50, duration: 1 }, "+=0.5"); // Fade out before next
});

// Rotate the 3D Glass Cube while scrolling
gsap.to(".glass-cube", {
    rotationX: 360,
    rotationY: 360,
    ease: "none",
    scrollTrigger: {
        trigger: ".story-sequence",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
});

// 3. Initialize 3D Tilt Cards (VanillaTilt)
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
    max: 15, // Max tilt rotation
    speed: 400,
    glare: true,
    "max-glare": 0.3,
});

// 4. Affiliate Form Submission
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
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
    });
}