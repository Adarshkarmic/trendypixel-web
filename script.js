gsap.registerPlugin(ScrollTrigger);

// --- 1. YOUR GUMROAD DATA (SYNCED) ---
// --- 1. YOUR GUMROAD DATA (SYNCED WITH ALL 8 TRIPTYCHS) ---
// --- 1. YOUR GUMROAD DATA (SYNCED WITH EXACT FILE NAMES & LINKS) ---
const triptychData = [
    { 
        title: "Cosmic Shiva Triptych", 
        sub: "4K High Res Digital Download", 
        price: "$9+", 
        img: "product_images/cosmic shiva.png", // Exact naam match kar diya
        link: "https://trendypixel.gumroad.com/l/Cosmic-Shiva-Triptych-Wall-Art" 
    },
    { 
        title: "Hanuman Sunrise Triptych", 
        sub: "4K Digital Wall Art", 
        price: "$9+", 
        img: "product_images/hanuman.png", // NOTE: Ye file VS code me daalni padegi
        link: "https://trendypixel.gumroad.com/l/Hanuman-Sunrise-Triptych" 
    },
    { 
        title: "Cosmic Krishna Triptych", 
        sub: "4K Digital Download", 
        price: "$9+", 
        img: "product_images/cosmic krishna.png", 
        link: "https://trendypixel.gumroad.com/l/Cosmic-Krishna-Triptych-Wall-Art" 
    },
    { 
        title: "KALI INFERNO Triptych", 
        sub: "4K Commercial + Resell", 
        price: "$9+", 
        img: "product_images/goddess maa kali.png", 
        link: "https://trendypixel.gumroad.com/l/KALI-Triptych-Wall-Art" 
    },
    { 
        title: "Minimal White Buddha", 
        sub: "Zen Garden Triptych 4K", 
        price: "$9+", 
        img: "product_images/zen garden.png", 
        link: "https://trendypixel.gumroad.com/l/Buddha-Zen-Garden-Triptych" 
    },
    { 
        title: "Black & Gold Liquid Om", 
        sub: "4K Digital Wall Art", 
        price: "$9+", 
        img: "product_images/om.png", 
        link: "https://trendypixel.gumroad.com/l/Om-Symbol-Triptych-Digital-Wall-art" 
    },
    { 
        title: "Neon Cyberpunk Porsche", 
        sub: "4K Digital Download", 
        price: "$9+", 
        img: "product_images/porsche triptych.png", 
        link: "https://trendypixel.gumroad.com/l/Porsche-City-Triptych" 
    },
    
];


// --- 2. YOUR BUNDLES DATA (EVERGREEN COLLECTION) ---
const bundleData = [
    { 
        title: "Cafécore Wall Art Bundle", 
        sub: "60 Designs | POD Ready", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/fl96pjtnaqq1s3eizvtpwayta72m",
        link: "https://trendypixel.gumroad.com/l/Cafecore-Wall-Art-Bundle" 
    },
    { 
        title: "Botanical Wall Art Bundle", 
        sub: "50+ Minimal Plant Illustrations", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/wo5v0mrwb1ng09p1hvihb4ofwl1y", // 👈 Gumroad image address yahan daalo
        link: "https://trendypixel.gumroad.com/l/Botanical-Wall-Art-Bundle" 
    },
    { 
        title: "Y2K Retro Neon Wall Art Bundle", 
        sub: "50 Posters | POD Ready", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/bnjyav8yndd6hd1rc1hf47feqrm4", // 👈 Gumroad image address yahan daalo
        link: "https://trendypixel.gumroad.com/l/Y2K-RetroNeonWall-Art-Bundle" 
    },
    { 
        title: "Christmas Dopamine Decor", 
        sub: "12 Geometric Wall Art Prints", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/fjje7we91bl2kbhrg42jt7fq18un",
        link: "https://trendypixel.gumroad.com/l/Christmas-DopamineDecor-Bundle" 
    },
    { 
        title: "Cozy Christmas Wall Art", 
        sub: "48 Designs | 4 Aspect Ratios", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/o253urofss48z6cgh53vl4os9svl", // 👈 Gumroad image address yahan daal        
        link: "https://trendypixel.gumroad.com/l/Nature-Inspired-CozyChristmasWall-Art-Bundle" 
    },
    { 
        title: "Gothmas Elegance Wall Art", 
        sub: "18 Gothic Designs | POD Ready", 
        price: "$11.99", 
        img: "https://public-files.gumroad.com/51g7c51n0cbhrwqv31tbvz12op1v", // 👈 Gumroad image address yahan daalo
        link: "https://trendypixel.gumroad.com/l/Gothic-Christmas-Wall-Art-Bundle" 
    }
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

// --- 3. INITIALIZE ANIMATIONS & SCROLL (AFTER LOAD) ---
window.addEventListener("load", () => {
    renderProducts();

    if (window.GumroadOverlay) {
        window.GumroadOverlay.refresh();
    }

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
        const horizontalTrack = document.getElementById("horizontal-track");
        if(horizontalTrack) {
            const totalWidth = horizontalTrack.scrollWidth;
            gsap.to(horizontalTrack, {
                x: () => -(totalWidth - window.innerWidth) + "px",
                ease: "none",
                scrollTrigger: {
                    trigger: "#triptych-vault",
                    start: "top top",
                    end: () => "+=" + totalWidth,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }
        ScrollTrigger.refresh();
    }, 200);

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

// --- 5. AFFILIATE LOGIC (Master ID Set) ---
const form = document.getElementById('licenseForm');
if(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const masterID = "TP-COMM-B2B-2025";
        document.getElementById('nameDisplay').innerText = document.getElementById('userName').value;
        document.getElementById('idDisplay').innerText = masterID;
        document.getElementById('licenseView').style.display = 'block';
        gsap.fromTo('#licenseView', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 });
        
        setTimeout(() => { 
            window.location.href = "https://trendypixel.gumroad.com/affiliates"; 
        }, 3500);
    });
}