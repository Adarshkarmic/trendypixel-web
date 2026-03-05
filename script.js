gsap.registerPlugin(ScrollTrigger);

// --- 1. YOUR ACTUAL GUMROAD DATA (SYNCED) ---
const triptychData = [
    { title: "Cosmic Shiva Triptych", sub: "8K High Res", price: "$9+", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1000", link: "https://trendypixel.gumroad.com/l/shiva" },
    { title: "KALI INFERNO Triptych", sub: "4K Digital Download", price: "$9", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=1000", link: "https://trendypixel.gumroad.com/l/kali" },
    { title: "Hanuman Sunrise Triptych", sub: "3 Piece Digital Art", price: "$9+", img: "https://images.unsplash.com/photo-1518382473043-f42ecb7bb26a?q=80&w=1000", link: "https://trendypixel.gumroad.com/l/hanuman" },
    { title: "Neon Night Drive Triptych", sub: "Cyberpunk Porsche City", price: "$9", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1000", link: "https://trendypixel.gumroad.com/l/neon" },
    { title: "Cosmic Trio: 2026 Vault", sub: "Shiva, Krishna, Hanuman", price: "$19", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000", link: "https://trendypixel.gumroad.com/l/trio" }
];

const bundleData = [
    { title: "Y2K Retro Neon Bundle", sub: "50 Posters | POD Ready", price: "$11.99", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=800", link: "https://trendypixel.gumroad.com/l/y2k" },
    { title: "Christmas Dopamine Decor", sub: "12 Geometric Prints", price: "$11.99", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800", link: "https://trendypixel.gumroad.com/l/christmas" },
    { title: "Gothmas Christmas Art", sub: "18 Gothic Designs", price: "$11.99", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800", link: "https://trendypixel.gumroad.com/l/gothmas" }
];

// --- 2. INJECT DATA INTO HTML ---
function renderProducts() {
    const track = document.getElementById('horizontal-track');
    const bundlesGrid = document.getElementById('bundles-grid');

    if(track) {
        const outroPanel = track.querySelector('.outro-panel');
        triptychData.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'h-panel prod-panel';
            panel.innerHTML = `
                <a href="${item.link}" class="prod-card" data-gumroad-overlay-checkout="true">
                    <div class="gumroad-pink-tag">${item.price}</div>
                    <div class="triptych-showcase">
                        <div class="triptych-panel panel-left" style="background-image: url('${item.img}')"></div>
                        <div class="triptych-panel panel-center" style="background-image: url('${item.img}')"></div>
                        <div class="triptych-panel panel-right" style="background-image: url('${item.img}')"></div>
                    </div>
                    <div class="prod-details">
                        <h3>${item.title}</h3>
                        <span>${item.sub}</span>
                    </div>
                </a>
            `;
            track.insertBefore(panel, outroPanel);
        });
    }

    if(bundlesGrid) {
        bundleData.forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.className = 'bundle-card gs-reveal';
            card.setAttribute('data-gumroad-overlay-checkout', 'true');
            card.innerHTML = `
                <div class="gumroad-pink-tag">${item.price}</div>
                <div class="bundle-img" style="background-image: url('${item.img}')"></div>
                <div class="bundle-info">
                    <h3>${item.title}</h3>
                    <p style="color: #888;">${item.sub}</p>
                </div>
            `;
            bundlesGrid.appendChild(card);
        });
    }
}

// --- 3. INITIALIZE ANIMATIONS (AFTER LOAD) ---
window.addEventListener("load", () => {
    renderProducts();

    const tl = gsap.timeline();
    tl.to(".progress", { width: "100%", duration: 1, ease: "power3.inOut" })
      .to(".preloader", { y: "-100%", duration: 0.8, ease: "power4.inOut" })
      .from(".hero-kicker, .hero-title, .hero-desc-box, .hero-actions", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 });

    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0, 0);

    setTimeout(() => {
        const horizontalContainer = document.getElementById("horizontal-container");
        if(horizontalContainer) {
            horizontalContainer.style.width = (horizontalContainer.children.length * 100) + "vw";
            gsap.to(horizontalContainer, {
                x: () => -(horizontalContainer.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: "#triptych-vault",
                    start: "top top",
                    end: () => "+=" + horizontalContainer.scrollWidth,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }
        ScrollTrigger.refresh();
    }, 100);

    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach((elem) => {
        gsap.fromTo(elem, 
            { autoAlpha: 0, y: 50 }, 
            { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } }
        );
    });
});

// --- 4. MAGNETIC CURSOR ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

document.addEventListener('mouseover', (e) => {
    if(e.target.closest('a') || e.target.closest('button')) {
        follower.classList.add('active');
    }
});
document.addEventListener('mouseout', (e) => {
    if(e.target.closest('a') || e.target.closest('button')) {
        follower.classList.remove('active');
    }
});

// --- 5. AFFILIATE LOGIC (Redirects to Gumroad) ---
const form = document.getElementById('licenseForm');
if(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const uniqueID = "TP-" + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('nameDisplay').innerText = document.getElementById('userName').value;
        document.getElementById('idDisplay').innerText = uniqueID;
        document.getElementById('licenseView').style.display = 'block';
        gsap.fromTo('#licenseView', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
        setTimeout(() => { window.location.href = "https://trendypixel.gumroad.com/affiliates"; }, 3500);
    });
}