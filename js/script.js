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
            if (link.getAttribute('href').slice(1) === current) {
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
    
    //  Validation du formulaire de contact 
    // Gère la validation du formulaire avec Bootstrap
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Vérifie la validité du formulaire
            if (contactForm.checkValidity()) {
                // Ici, vous pouvez ajouter la logique d'envoi du formulaire
                // Par exemple, avec Fetch API pour envoyer à un backend
                
                // Pour la démo, on affiche juste une alerte de succès
                showSuccessMessage();
                contactForm.reset();
                contactForm.classList.remove('was-validated');
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
    
    //  Effet de typing pour le titre 
    const typingText = document.querySelector('.hero-section h1 span');
    if (typingText) {
        const originalText = typingText.textContent;
        typingText.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                typingText.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        // Démarre l'effet après un court délai
        setTimeout(typeText, 500);
    }
    
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
    
    // inutile mais bon je voulais tester un truc
    console.log('%c Bienvenue sur mon portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cDéveloppé utilisant HTML, CSS, Bootstrap et JavaScript', 'color: #764ba2; font-size: 14px;');
    
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

//  Gestion des erreurs d'images 
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23cccccc"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23666666"%3EImage non disponible%3C/text%3E%3C/svg%3E';
    });
});
