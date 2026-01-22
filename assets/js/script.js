/* =========================================
   1. SYSTEM INITIALIZATION & GLITCH TYPING
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Initialize Scroll Animations (AOS)
    if(typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1000,
            offset: 100
        });
    }

    // B. Glitch Typing Effect (Home Page)
    if(document.querySelector('.auto-type')) {
        new Typed(".auto-type", {
            strings: [
                "Full-Stack Developer", 
                "AI Architect", 
                "Tech Enthusiast",
                "System Builder"
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    // C. Start Neural Background
    initNeuralNetwork();
});

/* =========================================
   2. HUD NUMBER COUNTERS (ABOUT PAGE)
   ========================================= */
const counters = document.querySelectorAll('.counter');
if(counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                
                const count = () => {
                    const current = +entry.target.innerText;
                    const increment = target / 50;

                    if(current < target) {
                        entry.target.innerText = Math.ceil(current + increment);
                        setTimeout(count, 30);
                    } else {
                        entry.target.innerText = target + (target < 100 ? "+" : "");
                    }
                };
                count();
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));
}

/* =========================================
   3. IMAGE ZOOM MODAL (GALLERY & CERTIFICATES)
   ========================================= */
let currentWidthPercent = 90; // Default width percentage

function openModal(src, captionText) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const caption = document.getElementById("caption");
    
    if(modal && modalImg) {
        modal.style.display = "flex"; // Flexbox for centering
        modalImg.src = src;
        
        if(caption) caption.innerHTML = captionText || "";
        
        // RESET ZOOM STATE ON OPEN
        resetZoom();
        
        document.body.style.overflow = "hidden"; // Lock background scroll
    }
}

// ZOOM IN: Increases Width & Removes Height Limit to allow scrolling
function zoomIn() {
    const img = document.getElementById("img01");
    if(!img) return;

    // Remove the height limit so the image can grow down the page
    img.style.maxHeight = "none";
    
    // Increase width
    if(currentWidthPercent < 200) { // Limit max zoom to 200%
        currentWidthPercent += 20;
        img.style.width = currentWidthPercent + "%";
        img.style.maxWidth = "none"; // Allow it to go wider than the screen
    }
}

// ZOOM OUT: Decreases Width
function zoomOut() {
    const img = document.getElementById("img01");
    if(!img) return;

    if(currentWidthPercent > 40) { // Limit min zoom
        currentWidthPercent -= 20;
        img.style.width = currentWidthPercent + "%";
    }
}

// RESET: Back to "Fit Screen" mode
function resetZoom() {
    const img = document.getElementById("img01");
    if(!img) return;

    currentWidthPercent = 90; // Reset variable
    
    // Re-apply CSS defaults to fit the screen perfectly
    img.style.width = "auto";
    img.style.maxWidth = "90%";
    img.style.maxHeight = "60vh"; // Restore height limit so text is visible
}

// CLOSE IMAGE MODAL
function closeModal(event) {
    // If event is passed (user clicked something), check WHAT they clicked
    if (event) {
        // If user clicked the Image, Caption, or Zoom Buttons, DO NOT CLOSE
        if (event.target.closest('#img01') || 
            event.target.closest('#caption') || 
            event.target.closest('.zoom-controls')) {
            return; 
        }
    }

    const modal = document.getElementById("imageModal");
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Unlock scroll
    }
}

/* =========================================
   4. PROJECT DETAIL PANEL (WORK PAGE) - NEW
   ========================================= */

function openProjectPanel(title, subtitle, challenge, solution, features, link) {
    const overlay = document.getElementById('projectPanelOverlay');
    if(!overlay) return; // Guard clause if not on Projects page
    
    // 1. Fill Data
    document.getElementById('pp-title').innerText = title;
    document.getElementById('pp-subtitle').innerText = subtitle;
    document.getElementById('pp-challenge').innerText = challenge;
    document.getElementById('pp-solution').innerText = solution;
    
    // 2. Build Feature List (Bullet Points)
    const featureList = document.getElementById('pp-features');
    featureList.innerHTML = ""; // Clear old features
    if(Array.isArray(features)) {
        features.forEach(f => {
            let li = document.createElement('li');
            li.innerText = f;
            featureList.appendChild(li);
        });
    }

    // 3. Setup Button
    const btn = document.getElementById('pp-link');
    if(link && link.length > 0) {
        btn.style.display = "inline-flex"; // Flex ensures centering
        btn.href = link;
        // Smart Button Text
        if(link.includes("github")) {
            btn.innerHTML = '<i class="fab fa-github" style="margin-right:8px;"></i> VIEW SOURCE CODE';
        } else if(link.includes("youtube")) {
            btn.innerHTML = '<i class="fab fa-youtube" style="margin-right:8px;"></i> VISIT CHANNEL';
        } else {
            btn.innerHTML = '<i class="fas fa-external-link-alt" style="margin-right:8px;"></i> VISIT LIVE SITE';
        }
    } else {
        btn.style.display = "none";
    }

    // 4. Show Panel
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Lock scroll
}

// CLOSE PROJECT PANEL
function closeProjectPanel() {
    const overlay = document.getElementById('projectPanelOverlay');
    if(overlay) {
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Unlock scroll
    }
}

/* =========================================
   5. NEURAL PARTICLE NETWORK (BACKGROUND)
   ========================================= */
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    // Adjust count based on screen size (Mobile optimization)
    const particleCount = window.innerWidth < 768 ? 35 : 60; 
    const connectionDistance = window.innerWidth < 768 ? 100 : 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 242, 255, 0.7)'; // Cyan color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw Lines (Connections)
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Opacity based on distance
                    ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}