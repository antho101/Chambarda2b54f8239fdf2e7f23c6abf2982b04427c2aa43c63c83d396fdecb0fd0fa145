// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll(
    '.about-content, .event-card, .formation-card, .contact-content, .stat-item, .highlight-card'
);
elementsToAnimate.forEach(el => observer.observe(el));

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // In production, you would replace this with actual form submission:
        /*
        fetch('YOUR_FORM_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Message envoyé avec succès !', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
        */
    }, 1500);
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1.5rem 2rem',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease-out',
        fontFamily: 'Work Sans, sans-serif',
        fontSize: '1rem',
        fontWeight: '600',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add animation keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// FACEBOOK EVENTS (PLACEHOLDER)
// ==========================================
// Note: Pour intégrer réellement les événements Facebook, vous aurez besoin de:
// 1. Créer une application Facebook Developer
// 2. Obtenir un token d'accès
// 3. Utiliser l'API Facebook Graph pour récupérer les événements
// 
// Voici un exemple de structure pour les événements:

function loadFacebookEvents() {
    // Cette fonction est un placeholder
    // En production, vous devrez utiliser l'API Facebook Graph
    
    // Exemple de structure d'événement:
    const sampleEvents = [
        {
            name: "Match d'Improvisation",
            date: "2026-03-15",
            time: "20:00",
            location: "Mons",
            description: "Soirée d'improvisation théâtrale avec matchs entre deux équipes",
            link: "https://www.facebook.com/events/example"
        }
    ];
    
    // Pour implémenter réellement:
    /*
    // 1. Avec Facebook SDK
    FB.api(
        '/YOUR_PAGE_ID/events',
        'GET',
        { access_token: 'YOUR_ACCESS_TOKEN', time_filter: 'upcoming' },
        function(response) {
            if (response && !response.error) {
                displayEvents(response.data);
            }
        }
    );
    
    // 2. Ou avec fetch API
    fetch('https://graph.facebook.com/v18.0/YOUR_PAGE_ID/events?access_token=YOUR_TOKEN&time_filter=upcoming')
        .then(response => response.json())
        .then(data => {
            displayEvents(data.data);
        })
        .catch(error => console.error('Erreur:', error));
    */
}

function displayEvents(events) {
    const eventsContainer = document.getElementById('facebook-events');
    eventsContainer.innerHTML = '';
    
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="event-placeholder">
                <p>Aucun événement à venir pour le moment. Suivez notre page Facebook pour être informé !</p>
            </div>
        `;
        return;
    }
    
    events.forEach(event => {
        const eventDate = new Date(event.start_time || event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleDateString('fr-FR', { month: 'short' });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-date">
                <span class="event-day">${day}</span>
                <span class="event-month">${month}</span>
            </div>
            <div class="event-details">
                <h3>${event.name}</h3>
                <p class="event-location">${event.place?.name || event.location || 'Mons'}</p>
                <p class="event-description">${event.description?.substring(0, 150) || ''}...</p>
                <a href="${event.link || '#'}" target="_blank" class="event-link">En savoir plus</a>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const target = parseInt(number.textContent);
            if (!isNaN(target)) {
                animateCounter(number, target);
                statsObserver.unobserve(number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// PARALLAX EFFECT ON HERO
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==========================================
// LAZY LOADING IMAGES (if you add images later)
// ==========================================
if ('IntersectionObserver' in window) {
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
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Le Chambard - Site web chargé avec succès !');
    
    // You can call loadFacebookEvents() here when you have the API set up
    // loadFacebookEvents();
    
    // Add a subtle animation to the logo
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
        });
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    }
});

// ==========================================
// PERFORMANCE: Debounce scroll events
// ==========================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll for performance
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
});

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// ACCESSIBILITY: Keyboard navigation
// ==========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ==========================================
// PRINT INSTRUCTIONS FOR FACEBOOK API
// ==========================================
console.log(`
%c🎭 Le Chambard - Instructions pour l'intégration Facebook

Pour afficher les événements Facebook automatiquement:

1. Créez une application Facebook Developer: https://developers.facebook.com/
2. Obtenez un token d'accès pour votre page
3. Décommentez le code dans loadFacebookEvents()
4. Remplacez 'YOUR_PAGE_ID' et 'YOUR_ACCESS_TOKEN' par vos vraies valeurs

Ressources:
- Facebook Graph API: https://developers.facebook.com/docs/graph-api
- Events API: https://developers.facebook.com/docs/graph-api/reference/event

`, 'color: #FF4655; font-size: 14px; font-weight: bold;');