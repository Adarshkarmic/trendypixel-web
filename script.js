gsap.registerPlugin(ScrollTrigger);

// --- HAMBURGER MENU LOGIC ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// --- GUMROAD PRODUCTS INJECTION ---
// Bhai, yahan apne actual Gumroad links (https://trendypixel.gumroad.com/l/...) update kar lena!
const triptychs = [
    { title: "Cosmic Shiva Triptych Wall Art (8K High Res)", price: "$9+", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600", link: "https://trendypixel.gumroad.com/l/shiva" },
    { title: "Hanuman Sunrise Triptych Digital Wall Art (4K)", price: "$9+", img: "https://images.unsplash.com/photo-1518382473043-f42ecb7bb26a?q=80&w=600", link: "https://trendypixel.gumroad.com/l/hanuman" },
    { title: "Cosmic Trio: 2026 Reseller Vault", price: "$19", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600", link: "https://trendypixel.gumroad.com/l/trio" },
    { title: "Neon Cyberpunk Porsche City Triptych", price: "$9+", img: "https://images.unsplash.com/photo-1529144415895-6aaf8be872fb?q=80&w=600", link: "https://trendypixel.gumroad.com/l/porsche" }
];

const bundles = [
    { title: "Y2K Retro Neon Wall Art Bundle | 50 Posters", price: "$11.99", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=600", link: "https://trendypixel.gumroad.com/l/y2k" },
    { title: "Botanical Wall Art Bundle | 50+ Illustrations", price: "$12", img: "https://images.unsplash.com/photo-1594046243098-0fceea9d451e?q=80&w=600", link: "https://trendypixel.gumroad.com/l/botanical" },
    { title: "Gothmas Christmas Wall Art Bundle | 18 Designs", price: "$11.99", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600", link: "https://trendypixel.gumroad.com/l/gothmas" }
];

function renderProducts(dataArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    dataArray.forEach(prod => {
        // Use Gumroad Overlay class "gumroad-button" natively
        const card = document.createElement('a');
        card.href = prod.link;
        card.className = 'gumroad-card';
        card.setAttribute('data-gumroad-overlay-checkout', 'true'); // Triggers Gumroad Popup
        
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${prod.img}')">
                <span class="price-tag">${prod.price}</span>
            </div>
            <div class="card-info">
                <h3>${prod.title}</h3>
            </div>
        `;
        container.appendChild(card);
    });
}

renderProducts(triptychs, 'triptych-grid');
renderProducts(bundles, 'bundle-grid');

// --- GSAP ANIMATIONS ---
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

// --- AFFILIATE FORM LOGIC ---
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