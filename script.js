gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const triptychData = [
    { title: "Cosmic Shiva", price: "$9+", img: "product_images/cosmic shiva.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Shiva-Triptych-Wall-Art" },
    { title: "Hanuman Sunrise", price: "$9+", img: "product_images/hanuman.png", link: "https://trendypixel.gumroad.com/l/Hanuman-Sunrise-Triptych" }
];

const bundleData = [
    { title: "Cafécore Bundle", sub: "60 Designs", price: "$11.99", img: "https://public-files.gumroad.com/fl96pjtnaqq1s3eizvtpwayta72m", link: "https://trendypixel.gumroad.com/l/Cafecore-Wall-Art-Bundle" }
];

function renderSite() {
    const track = document.getElementById('horizontal-track');
    const bundlesGrid = document.getElementById('bundles-grid');

    if(track) {
        const outro = track.querySelector('.outro-panel');
        triptychData.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'h-panel';
            panel.innerHTML = `
                <a href="${item.link}" class="prod-card" data-gumroad-overlay-checkout="true">
                    <div class="triptych-showcase">
                        <div class="triptych-panel panel-left" style="background-image: url('${item.img}')"></div>
                        <div class="triptych-panel panel-center" style="background-image: url('${item.img}')"></div>
                        <div class="triptych-panel panel-right" style="background-image: url('${item.img}')"></div>
                    </div>
                    <div class="prod-details">
                        <h3>${item.title}</h3>
                        <span>${item.price}</span>
                    </div>
                </a>`;
            track.insertBefore(panel, outro);
        });
    }

    if(bundlesGrid) {
        bundleData.forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.className = 'bundle-card';
            card.innerHTML = `
                <div class="bundle-img-container"><div class="bundle-img" style="background-image: url('${item.img}')"></div></div>
                <div class="bundle-info">
                    <h3>${item.title}</h3>
                    <p>${item.sub}</p>
                    <span class="bundle-price-tag">${item.price}</span>
                </div>`;
            bundlesGrid.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSite();
    
    // Live BG Mouse Move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        gsap.to("#orb-1", { x: x, y: y, duration: 2, ease: "power2.out" });
        gsap.to("#orb-2", { x: -x, y: -y, duration: 2, ease: "power2.out" });
        gsap.to(".cursor", { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(".cursor-follower", { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Triptych Horizontal Scroll
    const track = document.getElementById("horizontal-track");
    gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: { trigger: "#triptych-vault", start: "top top", end: () => "+=" + track.scrollWidth, pin: true, scrub: 1 }
    });

    // Bundle Stacking Effect
    const cards = gsap.utils.toArray('.bundle-card');
    cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, { scale: 0.9, opacity: 0.3, scrollTrigger: { trigger: cards[i + 1], start: "top 80%", end: "top 20%", scrub: true } });
    });

    gsap.to(".progress", { width: "100%", duration: 1, onComplete: () => gsap.to(".preloader", { y: "-100%", duration: 0.8 }) });
});