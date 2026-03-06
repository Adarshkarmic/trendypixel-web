// FORCE TOP SCROLL ON REFRESH
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

// --- PRODUCT DATA (AS SPECIFIED) ---
const triptychData = [
    { title: "Cosmic Shiva Triptych", sub: "8K High Res Digital Download", price: "$9+", img: "product_images/cosmic shiva.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Shiva-Triptych-Wall-Art" },
    { title: "Hanuman Sunrise Triptych", sub: "4K Digital Wall Art", price: "$9+", img: "product_images/hanuman.png", link: "https://trendypixel.gumroad.com/l/Hanuman-Sunrise-Triptych" },
    { title: "Cosmic Krishna Triptych", sub: "4K Digital Download", price: "$9+", img: "product_images/cosmic krishna.png", link: "https://trendypixel.gumroad.com/l/Cosmic-Krishna-Triptych-Wall-Art" },
    { title: "KALI INFERNO Triptych", sub: "4K Commercial + Resell", price: "$9+", img: "product_images/goddess maa kali.png", link: "https://trendypixel.gumroad.com/l/KALI-Triptych-Wall-Art" },
    { title: "Minimal White Buddha", sub: "Zen Garden Triptych 4K", price: "$9+", img: "product_images/zen garden.png", link: "https://trendypixel.gumroad.com/l/Buddha-Zen-Garden-Triptych" },
    { title: "Black & Gold Liquid Om", sub: "4K Digital Wall Art", price: "$9+", img: "product_images/om.png", link: "https://trendypixel.gumroad.com/l/Om-Symbol-Triptych-Digital-Wall-art" },
    { title: "Neon Cyberpunk Porsche", sub: "4K Digital Download", price: "$9+", img: "product_images/porsche triptych.png", link: "https://trendypixel.gumroad.com/l/Porsche-City-Triptych" }
];

const bundleData = [
    { title: "Cafécore Wall Art Bundle", sub: "60 Designs | POD Ready", price: "$11.99", img: "https://public-files.gumroad.com/fl96pjtnaqq1s3eizvtpwayta72m", link: "https://trendypixel.gumroad.com/l/Cafecore-Wall-Art-Bundle" },
    { title: "Botanical Wall Art Bundle", sub: "50+ Minimal Plant Illustrations", price: "$11.99", img: "https://public-files.gumroad.com/wo5v0mrwb1ng09p1hvihb4ofwl1y", link: "https://trendypixel.gumroad.com/l/Botanical-Wall-Art-Bundle" },
    { title: "Y2K Retro Neon Wall Art Bundle", sub: "50 Posters | POD Ready", price: "$11.99", img: "https://public-files.gumroad.com/bnjyav8yndd6hd1rc1hf47feqrm4", link: "https://trendypixel.gumroad.com/l/Y2K-RetroNeonWall-Art-Bundle" },
    { title: "Christmas Dopamine Decor", sub: "12 Geometric Wall Art Prints", price: "$11.99", img: "https://public-files.gumroad.com/fjje7we91bl2kbhrg42jt7fq18un", link: "https://trendypixel.gumroad.com/l/Christmas-DopamineDecor-Bundle" },
    { title: "Cozy Christmas Wall Art", sub: "48 Designs | 4 Aspect Ratios", price: "$11.99", img: "https://public-files.gumroad.com/o253urofss48z6cgh53vl4os9svl", link: "https://trendypixel.gumroad.com/l/Nature-Inspired-CozyChristmasWall-Art-Bundle" },
    { title: "Gothmas Elegance Wall Art", sub: "18 Gothic Designs | POD Ready", price: "$11.99", img: "https://public-files.gumroad.com/51g7c51n0cbhrwqv31tbvz12op1v", link: "https://trendypixel.gumroad.com/l/Gothic-Christmas-Wall-Art-Bundle" }
];

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
        bundleData.forEach((item) => {
            const card = document.createElement('a');
            card.href = item.link;
            card.className = 'bundle-card';
            card.setAttribute('data-gumroad-overlay-checkout', 'true');
            card.innerHTML = `
                <div class="bundle-img-container">
                    <div class="bundle-img" style="background-image: url('${item.img}')"></div>
                </div>
                <div class="bundle-info">
                    <h3>${item.title}</h3>
                    <p>${item.sub}</p>
                    <span class="bundle-price-tag">${item.price}</span>
                </div>
            `;
            bundlesGrid.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    if (window.GumroadOverlay) window.GumroadOverlay.refresh();

    const tl = gsap.timeline();
    tl.to(".progress", { width: "100%", duration: 1, ease: "power3.inOut" })
      .to(".preloader", { y: "-100%", duration: 0.8, ease: "power4.inOut" });

    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // --- COLOR SYNC LOGIC ---
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const aurora = document.querySelector('.aurora-bg');
        if (aurora) {
            const x1 = 10 + (scrollPercent * 40);
            const x2 = 90 - (scrollPercent * 40);
            aurora.style.background = `
                radial-gradient(circle at ${x1}% 10%, rgba(255, 0, 128, 0.18) 0%, transparent 50%),
                radial-gradient(circle at ${x2}% 90%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(75, 0, 130, 0.12) 0%, transparent 70%)
            `;
        }
    });

    setTimeout(() => {
        const horizontalTrack = document.getElementById("horizontal-track");
        if(horizontalTrack) {
            gsap.to(horizontalTrack, {
                x: () => -(horizontalTrack.scrollWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: "#triptych-vault",
                    start: "top top",
                    end: () => "+=" + horizontalTrack.scrollWidth,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }

        const bundleCards = gsap.utils.toArray('.bundle-card');
        bundleCards.forEach((card, i) => {
            if (i === bundleCards.length - 1) return;
            gsap.to(card, {
                scale: 0.92, opacity: 0.4, rotationZ: (i % 2 === 0 ? -2 : 2),
                scrollTrigger: { trigger: bundleCards[i + 1], start: "top 85%", end: "top 15%", scrub: true }
            });
        });
        ScrollTrigger.refresh();
    }, 200);
});

// CURSOR
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
});
document.addEventListener('mouseover', (e) => {
    if(e.target.closest('a') || e.target.closest('button')) follower.classList.add('active');
});
document.addEventListener('mouseout', (e) => {
    if(e.target.closest('a') || e.target.closest('button')) follower.classList.remove('active');
});