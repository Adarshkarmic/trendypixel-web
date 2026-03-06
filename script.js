// FORCE TOP SCROLL
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

// --- FULL VAULT DATA ---
const triptychData = [
    { title: "Cosmic Shiva", price: "$9+", img: "product_images/cosmic shiva.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Shiva-Triptych-Wall-Art" },
    { title: "Hanuman Sunrise", price: "$9+", img: "product_images/hanuman.png", link: "https://trendypixel.gumroad.com/l/Hanuman-Sunrise-Triptych" },
    { title: "Cosmic Krishna", price: "$9+", img: "product_images/cosmic krishna.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Krishna-Triptych-Wall-Art" },
    { title: "KALI INFERNO", price: "$9+", img: "product_images/goddess maa kali.png", link: "https://trendypixel.gumroad.com/l/KALI-Triptych-Wall-Art" },
    { title: "Zen Garden Buddha", price: "$9+", img: "product_images/zen garden.png", link: "https://trendypixel.gumroad.com/l/Buddha-Zen-Garden-Triptych" },
    { title: "Black & Gold Om", price: "$9+", img: "product_images/om.png", link: "https://trendypixel.gumroad.com/l/Om-Symbol-Triptych-Digital-Wall-art" },
    { title: "Cyberpunk Porsche", price: "$9+", img: "product_images/porsche triptych.png", link: "https://trendypixel.gumroad.com/l/Porsche-City-Triptych" }
];

const bundleData = [
    { title: "Cafécore Wall Art", sub: "60 Designs | POD Ready", price: "$11.99", img: "https://public-files.gumroad.com/fl96pjtnaqq1s3eizvtpwayta72m", link: "https://trendypixel.gumroad.com/l/Cafecore-Wall-Art-Bundle" },
    { title: "Botanical Minimal", sub: "50+ Plant Illustrations", price: "$11.99", img: "https://public-files.gumroad.com/wo5v0mrwb1ng09p1hvihb4ofwl1y", link: "https://trendypixel.gumroad.com/l/Botanical-Wall-Art-Bundle" },
    { title: "Y2K Retro Neon", sub: "50 Posters | 8K High Res", price: "$11.99", img: "https://public-files.gumroad.com/bnjyav8yndd6hd1rc1hf47feqrm4", link: "https://trendypixel.gumroad.com/l/Y2K-RetroNeonWall-Art-Bundle" },
    { title: "Dopamine Decor", sub: "12 Geometric Patterns", price: "$11.99", img: "https://public-files.gumroad.com/fjje7we91bl2kbhrg42jt7fq18un", link: "https://trendypixel.gumroad.com/l/Christmas-DopamineDecor-Bundle" },
    { title: "Cozy Christmas", sub: "48 Designs | 4 Ratios", price: "$11.99", img: "https://public-files.gumroad.com/o253urofss48z6cgh53vl4os9svl", link: "https://trendypixel.gumroad.com/l/Nature-Inspired-CozyChristmasWall-Art-Bundle" },
    { title: "Gothmas Elegance", sub: "18 Dark Gothic Designs", price: "$11.99", img: "https://public-files.gumroad.com/51g7c51n0cbhrwqv31tbvz12op1v", link: "https://trendypixel.gumroad.com/l/Gothic-Christmas-Wall-Art-Bundle" }
];

function buildEmpire() {
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
            card.setAttribute('data-gumroad-overlay-checkout', 'true');
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
    buildEmpire();
    if (window.GumroadOverlay) window.GumroadOverlay.refresh();

    // LIVE BG & CURSOR
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        gsap.to("#orb-1", { x: x, y: y, duration: 2 });
        gsap.to("#orb-2", { x: -x, y: -y, duration: 2 });
        gsap.to("#orb-3", { x: x*0.5, y: -y*0.5, duration: 3 });
        gsap.to(".cursor", { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(".cursor-follower", { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // HORIZONTAL TRIPTYCH
    const track = document.getElementById("horizontal-track");
    gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: { trigger: "#triptych-vault", start: "top top", end: () => "+=" + track.scrollWidth, pin: true, scrub: 1 }
    });

    // STACK EFFECT
    const cards = gsap.utils.toArray('.bundle-card');
    cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, { 
            scale: 0.92, 
            opacity: 0.35, 
            rotationZ: (i % 2 === 0 ? -2 : 2),
            scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 15%", scrub: true } 
        });
    });

    gsap.to(".progress", { width: "100%", duration: 1.5, onComplete: () => {
        gsap.to(".preloader", { y: "-100%", duration: 0.8, ease: "power4.inOut" });
    }});
});