// Lumora Group Website - Main JavaScript File

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initDropdowns();
    initReadMoreButtons();
    initTabs();
    initFilters();
    initFAQ();
    initAnimations();
    initFormValidation();
    initScrollEffects();
    initImageLazyLoading();
});

// ====================
// MOBILE MENU FUNCTIONALITY
// ====================

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    const header = document.querySelector('.header');
    
    if (!mobileToggle || !navList) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navList.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mobileToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ====================
// DROPDOWN FUNCTIONALITY
// ====================

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Desktop: hover to show
        if (window.innerWidth > 992) {
            dropdown.addEventListener('mouseenter', () => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        } 
        // Mobile: click to toggle
        else {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Update dropdown behavior on window resize
    window.addEventListener('resize', function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!menu) return;
            
            if (window.innerWidth > 992) {
                menu.style.opacity = '';
                menu.style.visibility = '';
                menu.style.transform = '';
                dropdown.classList.remove('active');
            }
        });
    });
}

// ====================
// READ MORE BUTTONS FUNCTIONALITY
// ====================

function initReadMoreButtons() {
    // Service Read More buttons
    document.querySelectorAll('.service-item .read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.service-details');
            const isActive = details.classList.contains('active');
            
            // Close all other service details in the same category
            const category = this.closest('.service-category');
            if (category) {
                category.querySelectorAll('.service-details.active').forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.classList.remove('active');
                        otherDetails.previousElementSibling.textContent = otherDetails.previousElementSibling.textContent.replace('Less', 'More');
                    }
                });
                category.querySelectorAll('.read-more-btn.active').forEach(otherButton => {
                    if (otherButton !== this) {
                        otherButton.classList.remove('active');
                        otherButton.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
                    }
                });
            }
            
            // Toggle current
            details.classList.toggle('active');
            this.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
                smoothScrollToElement(details);
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
            }
        });
    });
    
    // Project Read More buttons
    document.querySelectorAll('.project-card .read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.project-details');
            const isActive = details.classList.contains('active');
            
            // Close all other project details in the same tab
            const tab = this.closest('.tab-content');
            if (tab) {
                tab.querySelectorAll('.project-details.active').forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.classList.remove('active');
                    }
                });
                tab.querySelectorAll('.read-more-btn.active').forEach(otherButton => {
                    if (otherButton !== this) {
                        otherButton.classList.remove('active');
                        otherButton.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
                    }
                });
            }
            
            // Toggle current
            details.classList.toggle('active');
            this.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
                smoothScrollToElement(details);
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
            }
        });
    });
    
    // News Read More buttons
    document.querySelectorAll('.news-card .read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.news-details');
            const isActive = details.classList.contains('active');
            
            // Close all other news details
            document.querySelectorAll('.news-details.active').forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.classList.remove('active');
                }
            });
            document.querySelectorAll('.news-card .read-more-btn.active').forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.classList.remove('active');
                    otherButton.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
                }
            });
            
            // Toggle current
            details.classList.toggle('active');
            this.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Read Less';
                smoothScrollToElement(details);
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
            }
        });
    });
    
    // Job Read More buttons
    document.querySelectorAll('.job-card .read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.job-details');
            const isActive = details.classList.contains('active');
            
            // Close all other job details
            document.querySelectorAll('.job-details.active').forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.classList.remove('active');
                }
            });
            document.querySelectorAll('.job-card .read-more-btn.active').forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.classList.remove('active');
                    otherButton.innerHTML = '<i class="fas fa-chevron-down"></i> View Details';
                }
            });
            
            // Toggle current
            details.classList.toggle('active');
            this.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> View Less';
                smoothScrollToElement(details);
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> View Details';
            }
        });
    });
}

// ====================
// TAB FUNCTIONALITY (Projects Page)
// ====================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Trigger animation for new content
            setTimeout(() => {
                animateTabContent(document.getElementById(tabId));
            }, 50);
        });
    });
}

function animateTabContent(tabContent) {
    const items = tabContent.querySelectorAll('.project-card, .gallery-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animated');
    });
}

// ====================
// FILTER FUNCTIONALITY (Careers Page)
// ====================

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter job cards
            jobCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ====================
// FAQ ACCORDION FUNCTIONALITY
// ====================

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked FAQ if it was closed
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// ====================
// ANIMATION HANDLERS
// ====================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.service-card, .project-card, .news-card, .job-card, .feature, .sector-card, .subsidiary-card, .leader-card, .approach-item, .culture-item, .benefit, .value-card, .subsidiary-contact-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards !important;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Smooth transitions for dropdowns */
        .dropdown-menu {
            transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
        }
        
        /* Smooth transitions for expandable content */
        .service-details,
        .project-details,
        .news-details,
        .job-details,
        .faq-answer {
            transition: max-height 0.5s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        
        /* Mobile menu animation */
        .nav-list {
            transition: left 0.3s ease;
        }
        
        .mobile-toggle span {
            transition: all 0.3s ease;
        }
        
        /* Tab content animation */
        .tab-content {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}

// ====================
// FORM VALIDATION
// ====================

function initFormValidation() {
    const forms = document.querySelectorAll('.contact-form, .subsidiary-form, .newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Basic validation
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                    
                    // Email validation
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            isValid = false;
                            showFieldError(field, 'Please enter a valid email address');
                        }
                    }
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success active';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. We'll get back to you soon.</p>
                    `;
                    
                    form.parentNode.insertBefore(successMessage, form.nextSibling);
                    form.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    // Scroll to success message
                    smoothScrollToElement(successMessage);
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'This field is required');
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    
    field.style.borderColor = '#dc3545';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// ====================
// SCROLL EFFECTS
// ====================

function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollToElement(target);
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '30px';
    scrollTopBtn.style.right = '30px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.backgroundColor = 'var(--primary)';
    scrollTopBtn.style.color = 'var(--white)';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.zIndex = '1000';
    scrollTopBtn.style.boxShadow = 'var(--shadow-lg)';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'translateY(0)';
            }, 10);
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                scrollTopBtn.style.display = 'none';
            }, 300);
        }
    });
    
    // Add hover effect to scroll button
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.backgroundColor = 'var(--primary-dark)';
        scrollTopBtn.style.transform = 'translateY(-5px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.backgroundColor = 'var(--primary)';
        scrollTopBtn.style.transform = 'translateY(0)';
    });
}

// ====================
// IMAGE LAZY LOADING
// ====================

function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ====================
// UTILITY FUNCTIONS
// ====================

function smoothScrollToElement(element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ====================
// WINDOW LOAD FUNCTIONS
// ====================

window.addEventListener('load', function() {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize any animations that depend on images being loaded
    setTimeout(() => {
        document.querySelectorAll('.hero, .page-header').forEach(el => {
            el.classList.add('loaded');
        });
    }, 100);
});

// ====================
// ERROR HANDLING
// ====================

window.addEventListener('error', function(e) {
    console.error('Script error:', e.message, 'at', e.filename, ':', e.lineno);
    
    // Fallback for older browsers
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, using fallback animations');
        document.querySelectorAll('.service-card, .project-card, .news-card, .job-card, .feature, .sector-card, .subsidiary-card, .leader-card, .approach-item, .culture-item, .benefit, .value-card, .subsidiary-contact-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
});

// ====================
// BROWSER COMPATIBILITY
// ====================

// Polyfill for forEach on NodeList for older browsers
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Polyfill for classList on older browsers
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g);
                    var index = classes.indexOf(value);
                    
                    fn(classes, index, value);
                    self.className = classes.join(" ");
                };
            }
            
            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),
                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),
                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),
                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },
                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}
