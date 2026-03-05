// 1. Subtle Elegant Reveal Animations
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });
});

// 2. Affiliate License Logic
const form = document.getElementById('licenseForm');
if(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Fetch Data
        const name = document.getElementById('userName').value;
        const uniqueID = "TP-" + Math.floor(100000 + Math.random() * 900000);

        // Populate the Card
        document.getElementById('nameDisplay').innerText = name;
        document.getElementById('idDisplay').innerText = uniqueID;
        
        const licenseView = document.getElementById('licenseView');
        licenseView.style.display = 'block';

        // Elegant Pop-in Animation
        gsap.fromTo(licenseView, 
            { scale: 0.9, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
        );

        // Redirect to Gumroad Dashboard
        setTimeout(() => {
            window.location.href = "https://trendypixel.gumroad.com/affiliates";
        }, 4500);
    });
}