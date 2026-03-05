// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if(cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });
}

// 2. Insane Scroll Reveal Animations
// Har wo element jisme 'gs-reveal' class hai, wo scroll aane pe fade up hoga
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
                start: "top 85%", // Animation starts when element is 85% in view
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 3. Affiliate License Generator Logic
const form = document.getElementById('licenseForm');
if(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Fetch data
        const name = document.getElementById('userName').value;
        const uniqueID = "TP-" + Math.floor(100000 + Math.random() * 900000);

        // Populate Card
        document.getElementById('nameDisplay').innerText = name;
        document.getElementById('idDisplay').innerText = uniqueID;
        
        const licenseView = document.getElementById('licenseView');
        licenseView.style.display = 'block';

        // Boom Animation for License
        gsap.fromTo(licenseView, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        // Auto-Redirect to Gumroad after 4 seconds
        setTimeout(() => {
            window.open("https://trendypixel.gumroad.com/affiliates", "_blank");
        }, 4000);
    });
}