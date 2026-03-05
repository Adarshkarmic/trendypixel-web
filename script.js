// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
if(cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });
}

// 2. 🔥 INJECT YOUR GUMROAD TRIPTYCHS HERE 🔥
// Ye array 3D dialer mein show hoga. Apne original links daal dena!
const triptychData = [
    { title: "Golden Leaves Triptych", price: "$29", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600", link: "#" },
    { title: "Dark Marble Triptych", price: "$35", img: "https://images.unsplash.com/photo-1518382473043-f42ecb7bb26a?q=80&w=600", link: "#" },
    { title: "Boho Sun Triptych", price: "$25", img: "https://images.unsplash.com/photo-1529144415895-6aaf8be872fb?q=80&w=600", link: "#" },
    { title: "Cyberpunk Cityscape", price: "$40", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600", link: "#" },
    { title: "Minimalist Geometry", price: "$20", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=600", link: "#" }
];

const container = document.getElementById('triptych-container');
if(container) {
    triptychData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.backgroundImage = `url('${item.img}')`;
        slide.innerHTML = `
            <a href="${item.link}" target="_blank" style="width:100%; height:100%; display:block; text-decoration:none;">
                <div class="slide-overlay">
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                </div>
            </a>
        `;
        container.appendChild(slide);
    });
}

// 3. Initialize Swiper 3D Coverflow (The Dialer Effect)
if(document.querySelector('.mySwiper')) {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 2,
        coverflowEffect: {
            rotate: 30, // Angle of rotation
            stretch: 0,
            depth: 250, // How deep the 3D goes
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
}

// 4. GSAP Scroll Reveal Animations
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

// 5. Affiliate Form Logic
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