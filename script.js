// Global Variables
let vantaEffects = {
    hero: null,
    about: null,
    skills: null,
    contact: null
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoading();
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeContactForm();
    initializeVantaEffects();
    initializeBackToTop();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// Navigation
function initializeNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Smooth Scrolling Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    const text = 'Frontend Developer & Engineer';
    let index = 0;

    function typeText() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // About section animations
                if (target.classList.contains('about-text')) {
                    target.classList.add('animate');
                }
                if (target.classList.contains('highlights-grid')) {
                    target.classList.add('animate');
                }

                // Skills section animations
                if (target.classList.contains('technical-skills')) {
                    target.classList.add('animate');
                    animateSkillBars();
                }
                if (target.classList.contains('soft-skills')) {
                    target.classList.add('animate');
                }

                // Contact section animations
                if (target.classList.contains('contact-info')) {
                    target.classList.add('animate');
                }
                if (target.classList.contains('contact-form-container')) {
                    target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = [
        '.about-text',
        '.highlights-grid',
        '.technical-skills',
        '.soft-skills',
        '.contact-info',
        '.contact-form-container'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => observer.observe(element));
    });
}

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const statusElement = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        const submitBtn = form.querySelector('.form-submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(data);
            
            // Show success message
            showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            form.reset();
            
        } catch (error) {
            // Show error message
            showFormStatus('error', 'Failed to send message. Please try again or email me directly.');
        } finally {
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Log form data for demo purposes
        console.log('Form submitted with data:', data);
        
        // Simulate API call delay
        setTimeout(() => {
            // Simulate success (90% chance)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// Show form status
function showFormStatus(type, message) {
    const statusElement = document.getElementById('form-status');
    statusElement.className = `form-status ${type}`;
    statusElement.innerHTML = type === 'success' 
        ? `<i class="fas fa-check-circle"></i> ${message}`
        : `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Hide status after 5 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

// Vanta.js Effects
function initializeVantaEffects() {
    // Wait for Vanta.js to load
    setTimeout(() => {
        initializeVantaHero();
        initializeVantaAbout();
        initializeVantaSkills();
        initializeVantaContact();
    }, 1000);
}

function initializeVantaHero() {
    if (window.VANTA && window.VANTA.NET) {
        const heroElement = document.getElementById('hero');
        if (heroElement && !vantaEffects.hero) {
            vantaEffects.hero = window.VANTA.NET({
                el: heroElement,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3b82f6,
                backgroundColor: 0x0f172a,
                points: 10.00,
                maxDistance: 23.00,
                spacing: 17.00
            });
        }
    }
}

function initializeVantaAbout() {
    if (window.VANTA && window.VANTA.CELLS) {
        const aboutElement = document.getElementById('about');
        if (aboutElement && !vantaEffects.about) {
            vantaEffects.about = window.VANTA.CELLS({
                el: aboutElement,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                color1: 0x334155,
                color2: 0x475569,
                size: 1.5,
                speed: 1.0
            });
        }
    }
}

function initializeVantaSkills() {
    if (window.VANTA && window.VANTA.WAVES) {
        const skillsElement = document.getElementById('skills');
        if (skillsElement && !vantaEffects.skills) {
            vantaEffects.skills = window.VANTA.WAVES({
                el: skillsElement,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x0f172a,
                shininess: 35.00,
                waveHeight: 15.00,
                waveSpeed: 0.75,
                zoom: 0.75
            });
        }
    }
}

function initializeVantaContact() {
    if (window.VANTA && window.VANTA.DOTS) {
        const contactElement = document.getElementById('contact');
        if (contactElement && !vantaEffects.contact) {
            vantaEffects.contact = window.VANTA.DOTS({
                el: contactElement,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3b82f6,
                color2: 0x22d3ee,
                backgroundColor: 0x0f172a,
                size: 3.00,
                spacing: 35.00
            });
        }
    }
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

// Email and Phone Click Handlers (Automatic opening)
document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    
    // Handle email links
    if (href && href.startsWith('mailto:')) {
        e.preventDefault();
        const email = href.replace('mailto:', '');
        
        // Try to open default email client
        try {
            window.location.href = href;
            
            // Show confirmation message
            showNotification(`Opening email client to send to: ${email}`, 'info');
        } catch (error) {
            // Fallback: copy email to clipboard
            copyToClipboard(email);
            showNotification(`Email address copied to clipboard: ${email}`, 'success');
        }
    }
    
    // Handle phone links
    if (href && href.startsWith('tel:')) {
        e.preventDefault();
        const phone = href.replace('tel:', '');
        
        // Try to open phone dialer
        try {
            window.location.href = href;
            
            // Show confirmation message
            showNotification(`Opening phone dialer for: ${phone}`, 'info');
        } catch (error) {
            // Fallback: copy phone to clipboard
            copyToClipboard(phone);
            showNotification(`Phone number copied to clipboard: ${phone}`, 'success');
        }
    }
});

// Utility Functions
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Modern approach
        navigator.clipboard.writeText(text);
    } else {
        // Fallback approach
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(12px);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Handle window resize for Vanta effects
window.addEventListener('resize', () => {
    Object.values(vantaEffects).forEach(effect => {
        if (effect && effect.resize) {
            effect.resize();
        }
    });
});

// Cleanup Vanta effects on page unload
window.addEventListener('beforeunload', () => {
    Object.values(vantaEffects).forEach(effect => {
        if (effect && effect.destroy) {
            effect.destroy();
        }
    });
});

// Intersection Observer for performance (pause animations when not visible)
if ('IntersectionObserver' in window) {
    const vantaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const effect = vantaEffects[sectionId];
            
            if (effect) {
                if (entry.isIntersecting) {
                    // Resume animation
                    if (effect.play) effect.play();
                } else {
                    // Pause animation for better performance
                    if (effect.pause) effect.pause();
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections with Vanta effects
    ['hero', 'about', 'skills', 'contact'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            vantaObserver.observe(element);
        }
    });
}

// Add smooth scrolling for anchor links
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

// Performance optimization: Lazy load Vanta effects
function lazyLoadVantaEffect(sectionId, initFunction) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !vantaEffects[sectionId]) {
                initFunction();
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    observer.observe(element);
}

// Enhanced initialization with lazy loading
function initializeEnhancedVantaEffects() {
    setTimeout(() => {
        lazyLoadVantaEffect('hero', initializeVantaHero);
        lazyLoadVantaEffect('about', initializeVantaAbout);
        lazyLoadVantaEffect('skills', initializeVantaSkills);
        lazyLoadVantaEffect('contact', initializeVantaContact);
    }, 500);
}

// Replace the original Vanta initialization
// initializeVantaEffects(); // Comment out the original
initializeEnhancedVantaEffects(); // Use the enhanced version