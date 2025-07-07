// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default if it's a hash link
        if (this.getAttribute('href').includes('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // If element not found on this page, navigate to home page with hash
                window.location.href = '../index.html#' + targetId;
            }
        }
    });
});

// Animate service features on scroll
const animateServiceFeatures = () => {
    const features = document.querySelectorAll('.service-features li');
    
    features.forEach(feature => {
        const featureTop = feature.getBoundingClientRect().top;
        const featureBottom = feature.getBoundingClientRect().bottom;
        
        if (featureTop < window.innerHeight - 50 && featureBottom > 0) {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }
    });
};

// Initialize feature animations
document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.service-features li');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.5s ease';
    });
    
    animateServiceFeatures();
});

// Handle scroll events
window.addEventListener('scroll', () => {
    animateServiceFeatures();
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
