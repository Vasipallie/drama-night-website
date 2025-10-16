// Enhanced Drama Night Homepage JavaScript with Modern Effects

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    
    let isMobileMenuOpen = false;

    setupMobileMenu();
    setupCalendarButtons();
    addParallaxEffect();
    addCardAnimations();
    addHoverEffects();

    function setupMobileMenu() {
        if (mobileToggle && mobileNav && mobileBackdrop) {
            // Mobile toggle click
            mobileToggle.addEventListener('click', toggleMobileMenu);

            // Close on backdrop click
            mobileBackdrop.addEventListener('click', closeMobileMenu);

            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });

            // Close menu on window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        }
    }

    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileNav.classList.add('open');
        mobileBackdrop.classList.add('open');
        mobileToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        mobileBackdrop.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        isMobileMenuOpen = false;
    }

    function setupCalendarButtons() {
        document.querySelectorAll('#addToCalendar, #addToCalendarMain, #addToCalendarMobile').forEach(btn => {
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