// ==========================================
// Navigation
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Counter Animation for Hero Stats
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// Portfolio Filter
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hide');
                }, 300);
            }
        });
    });
});

// ==========================================
// Scroll Reveal Animation
// ==========================================
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal', 'active');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        project: document.getElementById('project').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to a server
    // For now, we'll just show a success message

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        z-index: 10000;
        text-align: center;
        animation: fadeInUp 0.5s ease-out;
    `;
    successMessage.innerHTML = `
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Message Sent! 🎉</h3>
        <p style="opacity: 0.9;">Thank you for reaching out. I'll get back to you within 24 hours.</p>
    `;

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeInUp 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
});

// ==========================================
// Parallax Effect for Hero Shapes
// ==========================================
const shapes = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
    });
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==========================================
// Lazy Loading for Performance
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Add Animation Classes on Page Load
// ==========================================
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Initialize AOS-like animations for elements
    const animatedElements = document.querySelectorAll('.hero-text, .hero-image, .section-header');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ==========================================
// Mockup Screen Hover Effect
// ==========================================
const mockupScreen = document.querySelector('.mockup-screen');

if (mockupScreen) {
    document.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = mockupScreen.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = (e.clientX - centerX) / width;
        const deltaY = (e.clientY - centerY) / height;

        const rotateX = deltaY * -10;
        const rotateY = deltaX * 10;

        if (
            e.clientX >= left &&
            e.clientX <= left + width &&
            e.clientY >= top &&
            e.clientY <= top + height
        ) {
            mockupScreen.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    mockupScreen.addEventListener('mouseleave', () => {
        mockupScreen.style.transform = 'perspective(1000px) rotateY(-10deg)';
    });
}

// ==========================================
// Portfolio Item Hover Effects
// ==========================================
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const preview = item.querySelector('.portfolio-preview');
        if (preview) {
            preview.style.transform = 'scale(1.05)';
        }
    });

    item.addEventListener('mouseleave', () => {
        const preview = item.querySelector('.portfolio-preview');
        if (preview) {
            preview.style.transform = 'scale(1)';
        }
    });
});

// ==========================================
// Smooth Transitions for Portfolio Preview
// ==========================================
document.querySelectorAll('.portfolio-preview').forEach(preview => {
    preview.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// ==========================================
// Form Input Focus Effects
// ==========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// ==========================================
// Add Transition Classes to Form Groups
// ==========================================
document.querySelectorAll('.form-group').forEach(group => {
    group.style.transition = 'transform 0.2s ease';
});

// ==========================================
// Typing Effect for Hero Title (Optional Enhancement)
// ==========================================
function createTypingEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const heroTitleLines = document.querySelectorAll('.title-line');
// heroTitleLines.forEach((line, index) => {
//     const originalText = line.textContent;
//     setTimeout(() => {
//         createTypingEffect(line, originalText, 50);
//     }, index * 1000);
// });

// ==========================================
// Performance: Debounce Scroll Events
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateNavLink = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateNavLink);

// ==========================================
// Console Easter Egg for Developers
// ==========================================
console.log('%c👨‍💻 Looking for a landing page designer? 👨‍💻', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cYou found the easter egg! 🎉', 'font-size: 16px; color: #ec4899;');
console.log('%cLet\'s create something amazing together!', 'font-size: 14px; color: #14b8a6;');
console.log('%c📧 Contact: contact@adilkan.dev', 'font-size: 12px;');

// ==========================================
// Initialize All Animations on Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animations
    document.body.style.opacity = '0';

    // Fade in body
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('✅ Landing page loaded successfully!');
});

// ==========================================
// Accessibility: Keyboard Navigation Enhancement
// ==========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==========================================
// Add ARIA labels dynamically
// ==========================================
navLinks.forEach(link => {
    const section = link.getAttribute('href').replace('#', '');
    link.setAttribute('aria-label', `Navigate to ${section} section`);
});
