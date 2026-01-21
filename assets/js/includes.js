/* =========================================
   SYSTEM INCLUDES (HEADER, FOOTER & CONTACT)
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. GENERATE SYSTEM HEADER
    const headerElement = document.getElementById("header-include");
    if (headerElement) {
        headerElement.innerHTML = `
            <nav class="glass-nav">
                <div class="nav-container">
                    <a href="index.html" class="logo">RP<span style="color:var(--accent);">_DEV</span></a>
                    
                    <ul class="nav-links">
                        <li><a href="index.html">HOME</a></li>
                        <li><a href="about.html">ABOUT</a></li>
                        <li><a href="projects.html">WORK</a></li>
                        <li><a href="certifications.html">CERTIFICATES</a></li>
                        <li><a href="gallery.html">GALLERY</a></li>
                    </ul>

                    <div class="header-actions">
                        <button class="btn-neon" onclick="openContactModal()">CONTACT</button>
                        
                        <div class="hamburger" onclick="toggleMenu()">
                            <i class="fas fa-bars"></i>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="mobile-menu-overlay" id="mobileMenu">
                <span class="close-btn" onclick="toggleMenu()">&times;</span>
                <div class="mobile-links-container">
                    <a href="index.html">HOME</a>
                    <a href="about.html">ABOUT</a>
                    <a href="projects.html">WORK</a>
                    <a href="certifications.html">CERTIFICATES</a>
                    <a href="gallery.html">GALLERY</a>
                    <a href="#" onclick="openContactModal(); toggleMenu()">CONTACT</a>
                </div>
            </div>
        `;
    }

    // 2. GENERATE SYSTEM FOOTER
    const footerElement = document.getElementById("footer-include");
    if (footerElement) {
        footerElement.innerHTML = `
            <footer class="system-footer">
                <div class="container footer-grid">
                    
                    <div class="footer-brand">
                        <h2 class="logo" style="font-size: 1.5rem;">RP<span style="color:var(--accent);">_SYSTEM</span></h2>
                        <p style="color: #666; margin-top: 15px; font-size: 0.9rem;">
                            <span style="height:8px; width:8px; background:var(--accent); border-radius:50%; display:inline-block; margin-right:5px; box-shadow:0 0 5px var(--accent);"></span>
                            SYSTEM ONLINE
                        </p>
                    </div>

                    <div class="footer-contact">
                        <h3 class="footer-heading">CONNECT_NODES</h3>
                        <div class="link-group">
                            <a href="mailto:pandayroshan99@gmail.com"><i class="fas fa-envelope"></i> EMAIL_UPLINK</a>
                            <a href="https://wa.me/918700105930" target="_blank"><i class="fab fa-whatsapp"></i> WHATSAPP_CHAT</a>
                            <a href="https://github.com/roshan-panday" target="_blank"><i class="fab fa-github"></i> REPOSITORY</a>
                        </div>
                    </div>

                    <div class="footer-log">
                        <h3 class="footer-heading">SYSTEM_LOG</h3>
                        <p style="color:#888; font-size: 0.85rem; line-height: 1.6;">
                            [ 2026 ] DESIGNED BY ROSHAN PANDAY<br>
                            NEURAL ARCHITECTURE // v2.5<br>
                            NEW DELHI, INDIA
                        </p>
                    </div>

                </div>
            </footer>
        `;
    }

    // 3. INJECT CONTACT MODAL (FIXED: OPEN APPS DIRECTLY)
    const contactModalHTML = `
        <div id="contactModal" class="contact-modal-overlay">
            <div class="contact-box">
                <span class="close-contact" onclick="closeContactModal()">&times;</span>
                <h2 style="color:white; margin-bottom:10px;">ESTABLISH <span style="color:var(--accent);">CONNECTION</span></h2>
                <p style="color:#888; font-size:0.9rem; margin-bottom:30px;">SELECT COMMUNICATION CHANNEL</p>

                <div class="contact-grid">
                    
                    <div class="contact-item" onclick="location.href='mailto:pandayroshan99@gmail.com'">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <h4>EMAIL</h4>
                            <p>pandayroshan99@gmail.com</p>
                            <span class="copy-status" style="color:var(--accent);">TAP TO OPEN MAIL</span>
                        </div>
                    </div>

                    <div class="contact-item" onclick="location.href='tel:+918700105930'">
                        <i class="fas fa-phone-alt"></i>
                        <div>
                            <h4>PHONE</h4>
                            <p>+91 8700105930</p>
                            <span class="copy-status" style="color:var(--accent);">TAP TO CALL</span>
                        </div>
                    </div>

                    <div class="contact-item no-hover">
                        <i class="fas fa-map-marker-alt" style="color:#ff0055;"></i>
                        <div>
                            <h4>BASE_LOC</h4>
                            <p>New Delhi, India</p>
                        </div>
                    </div>
                </div>

                <div class="social-row">
                    <a href="https://wa.me/918700105930" target="_blank"><i class="fab fa-whatsapp" style="color:#25D366;"></i></a>
                    <a href="https://github.com/roshan-panday" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="https://www.youtube.com/@tigml" target="_blank"><i class="fab fa-youtube" style="color:red;"></i></a>
                    <a href="https://www.linkedin.com/in/pandayroshan" target="_blank"><i class="fab fa-linkedin-in" style="color:#0077b5;"></i></a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', contactModalHTML);

    // 4. HIGHLIGHT ACTIVE LINK
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.style.color = "var(--accent)";
            link.style.textShadow = "0 0 10px var(--accent)";
        }
    });
});

/* =========================================
   HELPER FUNCTIONS
   ========================================= */

/* FIXED MENU LOGIC */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return; 
    
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.justifyContent = 'center';
        menu.style.alignItems = 'center';
        document.body.style.overflow = 'hidden';
    }
}

function openContactModal() {
    document.getElementById("contactModal").style.display = "flex";
    document.body.style.overflow = "hidden"; 
}

function closeContactModal() {
    document.getElementById("contactModal").style.display = "none";
    document.body.style.overflow = "auto"; 
}
