// Enhanced Drama Night Homepage JavaScript with Modern Effects

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    setupMobileMenu();
    setupCalendarButtons();
    addParallaxEffect();
    addCardAnimations();
    addHoverEffects();

    function setupMobileMenu() {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            toggleBars(hamburger.classList.contains('active'));
        });
        document.addEventListener('click', e => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMobileMenu();
        });
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        toggleBars(false);
    }

    function toggleBars(active) {
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = active ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        bars[1].style.opacity = active ? '0' : '1';
        bars[2].style.transform = active ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    }

    function setupCalendarButtons() {
        document.querySelectorAll('#addToCalendar, #addToCalendarMain').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Drama%20Night%202025%20-%20Pygmalion&dates=20251025T180000/20251025T210000&details=GIIS%20Drama%20Night%202025%20featuring%20Pygmalion&location=School%20Auditorium';
                window.open(url, '_blank');
            });
        });
    }

    // Add parallax scrolling effect
    function addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.stage-lights .spotlight');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Enhanced card animations on scroll
    function addCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'none';
                    entry.target.offsetHeight; // Trigger reflow
                    entry.target.style.animation = null;
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.detail-card, .production-showcase-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Add interactive hover effects
    function addHoverEffects() {
        // Mouse tracking for cards
        document.querySelectorAll('.detail-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Enhanced button interactions
        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    document.addEventListener('keydown', e => e.key === 'Escape' && closeMobileMenu());
});