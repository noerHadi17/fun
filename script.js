// Hero Image Slider (No Parallax)
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    if (!slider || slides.length === 0) return;

    function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    const slideWidthPercent = 100 / slides.length;
    const translateX = -currentSlide * slideWidthPercent;
    slider.style.transform = `translateX(${translateX}%)`;
}


    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
}

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
};

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

if (modal && modalImg && captionText && closeBtn) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = item.querySelector('img').src;
            captionText.innerHTML = item.querySelector('h4').innerText;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (name && email && message && name.value && email.value && message.value) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Back to Top Button
const toggleBackToTopButton = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
};

// Initialize back to top button click handler
const initBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
let counterStarted = false;

const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = Math.max(target / 100, 1); // Ensure minimum speed
        let count = 0;
        
        const updateCounter = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is in view
const checkCounterView = () => {
    const statsSection = document.querySelector('.parallax-stats');
    if (statsSection && !counterStarted) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight - 100) {
            counterStarted = true;
            animateCounters();
        }
    }
};

// Testimonials Floating Animation and Click-to-Expand
function initTestimonialsFloating() {
    const slider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!slider || testimonialCards.length === 0) return;
    
    // Clone testimonials for seamless loop
    testimonialCards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
        
        // Add click event to original card
        card.addEventListener('click', function() {
            const testimonialText = this.querySelector('.testimonial-content p');
            const isExpanded = testimonialText.classList.contains('expanded');
            
            // Remove expanded class from all testimonials
            testimonialCards.forEach(otherCard => {
                const otherText = otherCard.querySelector('.testimonial-content p');
                otherText.classList.remove('expanded');
                otherCard.classList.remove('expanded');
            });
            
            // If this testimonial wasn't expanded, expand it
            if (!isExpanded) {
                testimonialText.classList.add('expanded');
                this.classList.add('expanded');
            }
        });
    });
    
    // Pause animation on hover
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Initialize when DOM is loaded and handle scroll events
document.addEventListener('DOMContentLoaded', initializeAll);
window.addEventListener('scroll', handleScroll);

function initializeAll() {
    initHeroSlider();
    initBackToTop();
    initTestimonialsFloating();
    handleScroll();
}

function handleScroll() {
    animateOnScroll();
    checkCounterView();
    toggleBackToTopButton();
}
