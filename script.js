// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
});

// 2. GUMROAD DATA MOCK (Tum apne products yahan add kar sakte ho)
const products = [
    { title: "Botanical Canvas", price: "$29", img: "https://images.unsplash.com/photo-1594046243098-0fceea9d451e?q=80&w=600", link: "https://trendypixel.gumroad.com/l/botanical" },
    { title: "Streetwear Master", price: "$49", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600", link: "https://trendypixel.gumroad.com/l/streetwear" },
    { title: "The 40K Ultimate", price: "$199", img: "https://images.unsplash.com/photo-1618220179428-22790b46a011?q=80&w=600", link: "https://trendypixel.gumroad.com/l/ultimate" },
    { title: "Minimalist Decals", price: "$15", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600", link: "https://trendypixel.gumroad.com/l/decals" },
    { title: "Dark Aesthetic", price: "$35", img: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=600", link: "https://trendypixel.gumroad.com/l/dark" }
];

// 3. BUILD THE DIALER DYNAMICALLY
const wheel = document.getElementById('wheel');
const totalCards = products.length;
// Spread cards across a 60 degree arc (-30deg to +30deg)
const angleStep = 60 / (totalCards - 1); 
let startAngle = -30;

products.forEach((prod) => {
    const card = document.createElement('a');
    card.href = prod.link;
    card.target = "_blank"; // Opens Gumroad in new tab
    card.className = 'product-card';
    
    // Set rotation to position it on the wheel
    gsap.set(card, { rotation: startAngle });

    card.innerHTML = `
        <div class="card-img" style="background-image: url('${prod.img}')"></div>
        <div class="card-info">
            <h3 class="card-title">${prod.title}</h3>
            <p class="card-price">${prod.price}</p>
        </div>
    `;
    wheel.appendChild(card);
    startAngle += angleStep;
});

// 4. INSANE ANIMATIONS
// Intro Story Animation
gsap.to("#story", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 });

// Scroll to Rotate the Dialer
document.body.style.height = "300vh"; // Simulate scrollable area
        
gsap.to("#wheel", {
    rotation: -60, // Rotates the wheel as you scroll down
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // Smooth scrubbing effect
    }
});