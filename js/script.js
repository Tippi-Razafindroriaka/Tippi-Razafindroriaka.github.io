document.addEventListener('DOMContentLoaded', function() {
    
    //  Navigation Active Link 
    // Met à jour le lien actif dans la navbar en fonction du scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Vérifie si la section est visible dans la fenêtre
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        // Met à jour la classe active sur les liens de navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    //  Défilement fluide pour les liens d'ancrage 
    // Gère le défilement fluide lors du clic sur les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Calcule la position avec offset pour la navbar fixe
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Ferme le menu mobile après le clic (si ouvert)
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    //  Animation de la navbar au scroll 
    // Ajoute une ombre à la navbar quand on scroll vers le bas
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    //  Animation des barres de progression 
    // Anime les barres de progression quand la section compétences est visible
    const progressBars = document.querySelectorAll('.progress-bar');
    const competencesSection = document.getElementById('competences');
    let isCurrentlyAnimating = false;
    
    const animateProgressBars = () => {
        if (!competencesSection) return;
        
        const sectionPosition = competencesSection.getBoundingClientRect();
        const screenPosition = window.innerHeight;
        
        // Vérifie si la section compétences est visible
        const isVisible = sectionPosition.top < screenPosition * 0.75 && sectionPosition.bottom > 100;
        
        if (isVisible && !isCurrentlyAnimating) {
            // Lance l'animation
            isCurrentlyAnimating = true;
            
            // Anime chaque barre avec un délai progressif
            progressBars.forEach((bar, index) => {
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                // Sauvegarde la largeur cible
                if (!bar.getAttribute('data-width')) {
                    bar.setAttribute('data-width', targetWidth);
                }
                
                bar.style.width = '0';
                bar.style.transition = 'width 1.5s ease-out';
                
                // Délai progressif pour chaque barre
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, index * 100);
            });
        } else if (!isVisible && isCurrentlyAnimating) {
            // Réinitialise quand on quitte la section
            isCurrentlyAnimating = false;
            progressBars.forEach(bar => {
                bar.style.transition = 'width 0.3s ease-out';
                bar.style.width = '0';
            });
        }
    };
    
    // Exécute l'animation au scroll
    window.addEventListener('scroll', animateProgressBars);
    // Exécute aussi au chargement initial
    animateProgressBars();
    
    //  Validation du formulaire de contact avec EmailJS 
    // Gère la validation et l'envoi du formulaire via EmailJS
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Vérifie la validité du formulaire
            if (contactForm.checkValidity()) {
                // Désactive le bouton pendant l'envoi
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi en cours...';
                
                // Configuration EmailJS
                // Remplacez ces valeurs par les vôtres depuis https://dashboard.emailjs.com/
                const serviceID = 'service_c5eeqa9';  // Ex: 'service_abc123'
                const templateID = 'template_b5qgohu'; // Ex: 'template_xyz789'
                
                // Prépare les données du formulaire
                const templateParams = {
                    from_name: contactForm.querySelector('#firstName').value + ' ' + contactForm.querySelector('#lastName').value,
                    from_email: contactForm.querySelector('#email').value,
                    subject: contactForm.querySelector('#subject').value,
                    message: contactForm.querySelector('#message').value,
                    to_name: 'Tippi' // Votre nom
                };
                
                // Envoie l'email via EmailJS
                emailjs.send(serviceID, templateID, templateParams)
                    .then(function(response) {
                        console.log('Email envoyé avec succès!', response.status, response.text);
                        showSuccessMessage();
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                        
                        // Réactive le bouton
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                    }, function(error) {
                        console.error('Erreur lors de l\'envoi:', error);
                        showErrorMessage(error);
                        
                        // Réactive le bouton
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                    });
            } else {
                // Affiche les messages d'erreur de validation
                contactForm.classList.add('was-validated');
            }
        });
    }
    
    // Fonction pour afficher un message de succès
    function showSuccessMessage() {
        // Crée un toast Bootstrap pour le message de succès
        const toastHTML = `
            <div class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true" style="z-index: 9999;">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        Message envoyé avec succès! Je vous répondrai bientôt.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // Ajoute le toast au body
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        // Affiche le toast
        const toastElement = document.querySelector('.toast:last-child');
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
        
        // Supprime le toast du DOM après disparition
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    // Fonction pour afficher un message d'erreur
    function showErrorMessage(error) {
        // Crée un toast Bootstrap pour le message d'erreur
        const toastHTML = `
            <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true" style="z-index: 9999;">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement par email.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.querySelector('.toast:last-child');
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 7000
        });
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    //  Animation d'apparition des éléments au scroll 
    // Ajoute une classe pour animer les éléments quand ils entrent dans la vue
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe tous les cards et sections
    document.querySelectorAll('.card, .alert').forEach(element => {
        observer.observe(element);
    });
    
    //  Gestion des carousels 
    // Pause automatique des carousels au hover
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        carousel.addEventListener('mouseenter', () => {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (bsCarousel) {
                bsCarousel.cycle();
            }
        });
    });
    
    //  Terminal typing effect for hero role label 
    initTyping();
    initParticles();
    
    //  Lazy loading des images 
    // Charge les images de manière optimisée
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    //  Bouton retour en haut 
    // Crée un bouton pour revenir en haut de la page
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary btn-lg position-fixed bottom-0 end-0 m-4';
    backToTopButton.style.cssText = 'display: none; z-index: 1000; border-radius: 50%; width: 60px; height: 60px;';
    backToTopButton.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTopButton);
    
    // Affiche/cache le bouton selon le scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Action du bouton
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('%c[+] Bienvenue sur mon portfolio!', 'color: #00ff41; font-family: monospace; font-size: 14px;');
    console.log('%c[*] Tippi RAZAFINDRORIAKA — Security Researcher & Developer', 'color: #58a6ff; font-family: monospace;');
    
});

//  Fonction utilitaire pour détecter le mobile 
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajuste certains comportements pour mobile
if (isMobile()) {
    // Désactive certaines animations sur mobile pour de meilleures performances
    document.documentElement.style.scrollBehavior = 'auto';
}

// ── Gestion des erreurs d'images ──────────────────────────────
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%230d1117"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="14" fill="%2300ff41"%3E[ image non disponible ]%3C/text%3E%3C/svg%3E';
    });
});

// ── Terminal typing effect ─────────────────────────────────────
function initTyping() {
    const el = document.getElementById('typed-role');
    if (!el) return;

    const roles = [
        'Security_Researcher',
        'Web_Developer',
        'Penetration_Tester',
        'CTF_Player',
        'Network_Analyst'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = roles[roleIndex];
        if (!deleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(tick, deleting ? 45 : 90);
    }
    setTimeout(tick, 600);
}

// ── Particle network canvas ────────────────────────────────────
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const section = canvas.parentElement;
    const COUNT = window.innerWidth < 768 ? 30 : 60;
    const MAX_DIST = 130;
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width  = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); });

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r:  Math.random() * 1.5 + 0.8
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.35;
                    ctx.strokeStyle = `rgba(0,255,65,${alpha})`;
                    ctx.lineWidth   = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            ctx.fillStyle = 'rgba(0,255,65,0.65)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
        });

        animFrame = requestAnimationFrame(draw);
    }

    draw();

    // Pause particles when tab is hidden to save resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animFrame);
        } else {
            draw();
        }
    });
}
