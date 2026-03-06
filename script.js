gsap.registerPlugin(ScrollTrigger);

const triptychData = [
    { title: "Cosmic Shiva", price: "$9+", img: "product_images/cosmic shiva.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Shiva-Triptych-Wall-Art" },
    { title: "Hanuman Sunrise", price: "$9+", img: "product_images/hanuman.png", link: "https://trendypixel.gumroad.com/l/Hanuman-Sunrise-Triptych" },
    { title: "Cosmic Krishna", price: "$9+", img: "product_images/cosmic krishna.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Krishna-Triptych-Wall-Art" }
];

const bundleData = [
    { title: "Cafécore Bundle", sub: "60 Designs | POD Ready", price: "$11.99", img: "https://public-files.gumroad.com/fl96pjtnaqq1s3eizvtpwayta72m", link: "https://trendypixel.gumroad.com/l/Cafecore-Wall-Art-Bundle" }
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
                    <div class="prod-details"><h3>${item.title}</h3><span>${item.price}</span></div>
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
                <div class="bundle-info"><h3>${item.title}</h3><p>${item.sub}</p><span class="bundle-price-tag">${item.price}</span></div>`;
            bundlesGrid.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSite();
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // LIVE COLOR SYNC
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const aurora = document.querySelector('.aurora-bg');
        if (aurora) {
            aurora.style.background = `radial-gradient(circle at ${15 + scrollPercent * 30}% 15%, rgba(255, 0, 128, 0.15), transparent 50%)`;
        }
    });

    gsap.to("#horizontal-track", {
        x: () => -(document.getElementById("horizontal-track").scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: { trigger: "#triptych-vault", start: "top top", end: () => "+=" + document.getElementById("horizontal-track").scrollWidth, pin: true, scrub: 1 }
    });

    const cards = gsap.utils.toArray('.bundle-card');
    cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, { scale: 0.92, opacity: 0.35, rotationZ: (i % 2 === 0 ? -2 : 2), scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 15%", scrub: true } });
    });

    gsap.to(".progress", { width: "100%", duration: 1, onComplete: () => gsap.to(".preloader", { y: "-100%", duration: 0.8 }) });
});

document.addEventListener('mousemove', (e) => {
    gsap.to(".cursor", { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(".cursor-follower", { x: e.clientX, y: e.clientY, duration: 0.15 });
});