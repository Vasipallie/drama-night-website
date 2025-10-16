// Modern Clean Navigation System

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navBtns = document.querySelectorAll('.nav-btn, .mobile-nav-btn');
    const calendarButtons = document.querySelectorAll('#addToCalendar, #addToCalendarMobile');
    
    let isMobileMenuOpen = false;

    // Initialize navigation
    initializeNavigation();

    function initializeNavigation() {
        setupMobileMenu();
        setupCalendarButtons();
        setupNavLinks();
    }

    function setupMobileMenu() {
        if (mobileToggle && mobileNav) {
            // Mobile toggle click
            mobileToggle.addEventListener('click', toggleMobileMenu);

            // Close on overlay click
            mobileNav.addEventListener('click', function(e) {
                if (e.target === mobileNav) {
                    closeMobileMenu();
                }
            });

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
        isMobileMenuOpen = true;
        mobileToggle.classList.add('active');
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    }

    function setupNavLinks() {
        navBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Close mobile menu when navigating
                closeMobileMenu();
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    function setupCalendarButtons() {
        calendarButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Close mobile menu
                closeMobileMenu();

                // Open Google Calendar
                const calendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Drama%20Night%202025%20-%20Pygmalion&dates=20251025T180000/20251025T210000&details=GIIS%20Drama%20Night%202025%20featuring%20Pygmalion&location=School%20Auditorium';
                window.open(calendarUrl, '_blank');
            });
        });
    }

    // Expose global function for external use
    window.toggleMobileMenu = toggleMobileMenu;
});