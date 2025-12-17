document.addEventListener('DOMContentLoaded', function() {

    /* =========================
       MOBILE NAV TOGGLE
    ========================= */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    /* =========================
       HERO SCROLL INDICATOR
    ========================= */
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight - 80,
                behavior: 'smooth'
            });
        });
    }

    /* =========================
       HEADER SHADOW ON SCROLL
    ========================= */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 100 
                ? '0 5px 15px rgba(0,0,0,.1)' 
                : 'none';
        });
    }

    /* =========================
       ANIMATION ON SCROLL
    ========================= */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.sector-card, .subsidiary-card, .feature, .service-card, .project-card, .news-card, .job-card');
        elements.forEach(el => {
            const elPos = el.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            if (elPos < screenPos) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }

    const animatedElements = document.querySelectorAll('.sector-card, .subsidiary-card, .feature, .service-card, .project-card, .news-card, .job-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    /* =========================
       READ MORE / LESS
    ========================= */
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.closest('.service-item, .project-card, .news-card, .job-card');
            const excerpt = content.querySelector('.service-excerpt, .project-excerpt, .news-excerpt, .job-excerpt');
            const details = content.querySelector('.service-details, .project-details, .news-details, .job-details');
            if (!details || !excerpt) return;

            if (details.classList.contains('active')) {
                details.classList.remove('active');
                excerpt.style.display = 'block';
                this.textContent = 'Read More';
            } else {
                details.classList.add('active');
                excerpt.style.display = 'none';
                this.textContent = 'Read Less';
            }
        });
    });

    /* =========================
       PROJECTS TABS
    ========================= */
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) targetContent.classList.add('active');
        });
    });

    /* =========================
       JOBS FILTER
    ========================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            jobCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* =========================
       FAQ ACCORDION
    ========================= */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (!answer) return;
            this.classList.toggle('active');
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* =========================
       FORMS
    ========================= */
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    /* =========================
       WHATSAPP INTEGRATION
    ========================= */
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phone = '+211912345678';
            const message = 'Hello, I would like to get more information about Lumora Group.';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

});
