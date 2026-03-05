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

// 2. 🔥 INTERACTIVE PARTICLES (The Heavy Agency Effect) 🔥
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#D4AF37" }, // Gold particles
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#D4AF37", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" }, // Connects lines to mouse
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

// 3. 🔥 GUMROAD 3D DIALER (The Vault) 🔥
const gumroadProducts = [
    { title: "Cosmic Shiva Triptych", price: "$9+", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600", link: "https://trendypixel.gumroad.com/l/shiva" },
    { title: "Hanuman Sunrise Triptych", price: "$9+", img: "https://images.unsplash.com/photo-1518382473043-f42ecb7bb26a?q=80&w=600", link: "https://trendypixel.gumroad.com/l/hanuman" },
    { title: "Y2K Retro Neon Bundle", price: "$11.99", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=600", link: "https://trendypixel.gumroad.com/l/y2k" },
    { title: "Cosmic Trio Reseller Vault", price: "$19", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600", link: "https://trendypixel.gumroad.com/l/trio" }
];

const container = document.getElementById('triptych-container');
if(container) {
    gumroadProducts.forEach(prod => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        // Native Gumroad Overlay Integration
        slide.innerHTML = `
            <a href="${prod.link}" class="gumroad-overlay-link" data-gumroad-overlay-checkout="true">
                <div class="slide-img" style="background-image: url('${prod.img}');"></div>
                <div class="slide-content">
                    <h3>${prod.title}</h3>
                    <span class="price-badge">${prod.price}</span>
                </div>
            </a>
        `;
        container.appendChild(slide);
    });
}

// Initialize Swiper 3D Coverflow
if(document.querySelector('.mySwiper')) {
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
            rotate: 20, // Clean, elegant rotation
            stretch: 0,
            depth: 300, // Deep 3D effect
            modifier: 1,
            slideShadows: true,
        },
        pagination: { el: ".swiper-pagination", clickable: true },
    });
}

// 4. GSAP Scroll Reveals
const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 50 }, 
        { 
            duration: 1.2, 
            autoAlpha: 1, 
            y: 0, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 5. Affiliate License Gen
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