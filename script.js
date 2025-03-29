// Initialize Swiper with enhanced effects
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 1000,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function() {
            const activeSlide = this.slides[this.activeIndex];
            const img = activeSlide.querySelector('img');
            img.style.transform = 'scale(1.1)';
            setTimeout(() => {
                img.style.transform = 'scale(1)';
            }, 100);
        }
    }
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let navbarTicking = false;

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class based on scroll position
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
            navbarTicking = false;
        });
        navbarTicking = true;
    }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.skill-item, .certificate-card, .web-app-card, .optimization-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.section-title, .certificate-card, .skill-item, .web-app-card, .optimization-card, .fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Enhanced Hero content animation
const heroContent = document.querySelector('.hero-content');
setTimeout(() => {
    heroContent.classList.add('visible');
}, 500);

// Smooth scrolling with enhanced behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Parallax effect for hero section
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const heroSection = document.querySelector('.hero-section');
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Enhanced hover effects for skill items
document.querySelectorAll('.skill-item, .optimization-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
        item.style.boxShadow = '0 8px 25px rgba(233, 69, 96, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Enhanced loading animation for download buttons
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function(e) {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
});

// Typing effect for hero section
const heroText = "Ahmed Mohamed Sabri";
const heroSubtext = "Senior Process Engineer & AI Innovator";
let currentText = "";
let currentSubtext = "";
let i = 0;
let j = 0;

function typeWriter() {
    if (i < heroText.length) {
        currentText += heroText.charAt(i);
        document.querySelector('.hero-content h1').innerHTML = currentText + '<span class="cursor"></span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        setTimeout(subTextWriter, 500);
    }
}

function subTextWriter() {
    if (j < heroSubtext.length) {
        currentSubtext += heroSubtext.charAt(j);
        document.querySelector('.hero-content p').innerHTML = currentSubtext + '<span class="cursor"></span>';
        j++;
        setTimeout(subTextWriter, 50);
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', typeWriter);

// Enhanced scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

let progressTicking = false;
window.addEventListener('scroll', () => {
    if (!progressTicking) {
        window.requestAnimationFrame(() => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
            progressTicking = false;
        });
        progressTicking = true;
    }
});

// Add particle effect to hero section
const createParticles = () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            heroSection.appendChild(particle);
        }
    }
};

createParticles();

// Add mouse move effect to hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        heroSection.style.setProperty('--mouse-x', x);
        heroSection.style.setProperty('--mouse-y', y);
    });
} 