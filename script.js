// script.js - Lumora Group Website - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initDynamicContent();
    initForms();
    initWhatsApp();
    initScrollIndicator();
});

// Mobile Navigation with improved handling
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header');
    
    if (!mobileToggle || !navList) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navList.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects with throttle for performance
function initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Header shadow effect
                if (scrollTop > 50) {
                    header.style.cssText = `
                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(10px);
                        transition: all 0.3s ease;
                    `;
                } else {
                    header.style.cssText = `
                        box-shadow: none;
                        backdrop-filter: none;
                        transition: all 0.3s ease;
                    `;
                }
                
                // Add scrolled class for additional styling
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Enhanced animations with Intersection Observer
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.sector-card, .subsidiary-card, .feature, .service-card, ' +
        '.project-card, .news-card, .job-card, .team-member, .stat-item'
    );
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Use Intersection Observer for better performance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// Dynamic content functionality
function initDynamicContent() {
    initReadMoreButtons();
    initProjectsTabs();
    initJobsFilter();
    initFAQAccordion();
}

// Read More/Less with smooth height transition
function initReadMoreButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-more-btn')) {
            const button = e.target;
            const content = button.closest('[data-expandable]') || 
                           button.closest('.service-item, .project-card, .news-card, .job-card');
            const excerpt = content.querySelector('.excerpt');
            const details = content.querySelector('.details, .full-content');
            
            if (!details) return;
            
            if (details.style.maxHeight && details.style.maxHeight !== '0px') {
                // Collapse
                details.style.maxHeight = '0';
                details.style.opacity = '0';
                setTimeout(() => {
                    excerpt?.style.removeProperty('display');
                    button.textContent = 'Read More';
                }, 200);
            } else {
                // Expand
                excerpt?.style.display = 'none';
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
                button.textContent = 'Read Less';
            }
        }
    });
}

// Projects Tab functionality
function initProjectsTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            if (!targetTab) return;
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content with fade effect
            tabContents.forEach(content => {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }
                }, 150);
            });
        });
    });
}

// Jobs Filter functionality
function initJobsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter job cards with fade animation
            jobCards.forEach(card => {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.98)';
                
                setTimeout(() => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });
}

// FAQ Accordion with smooth height animation
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Set initial height for closed state
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease';
        answer.style.opacity = '0';
        
        question.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });
}

// Form handling with validation
function initForms() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4757';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Disable submit button during submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                alert('Thank you for your message. We will get back to you soon!');
                this.reset();
            } catch (error) {
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            
            if (!email.value || !email.value.includes('@')) {
                email.style.borderColor = '#ff4757';
                alert('Please enter a valid email address.');
                return;
            }
            
            // Disable submit button during submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } catch (error) {
                alert('Subscription failed. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                email.style.borderColor = '';
            }
        });
    }
}

// WhatsApp integration
function initWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = '211912345678';
            const message = 'Hello, I would like to get more information about Lumora Group.';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
        
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: window.innerHeight - 80,
                behavior: 'smooth'
            });
        });
        
        // Add subtle bounce animation
        scrollIndicator.style.animation = 'bounce 2s infinite';
        
        // Add CSS for bounce animation
        if (!document.querySelector('#scroll-indicator-styles')) {
            const style = document.createElement('style');
            style.id = 'scroll-indicator-styles';
            style.textContent = `
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                    40% {transform: translateY(-10px);}
                    60% {transform: translateY(-5px);}
                }
                
                .menu-open {
                    overflow: hidden;
                }
                
                .header.scrolled {
                    padding: 10px 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Add resize handler for better mobile experience
window.addEventListener('resize', () => {
    const navList = document.querySelector('.nav-list');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (window.innerWidth > 768 && navList.classList.contains('active')) {
        navList.classList.remove('active');
        mobileToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', () => {}, { passive: true });
