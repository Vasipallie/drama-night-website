// Enhanced Team Page JavaScript with Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    
    let isMobileMenuOpen = false;

    setupMobileMenu();
    setupCalendarButton();
    addTeamCardAnimations();
    addSearchFunctionality();

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

    function setupCalendarButton() {
        document.querySelectorAll('#addToCalendar, #addToCalendarMobile').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Drama%20Night%202025%20-%20Pygmalion&dates=20251025T180000/20251025T210000&details=GIIS%20Drama%20Night%202025%20featuring%20Pygmalion&location=School%20Auditorium';
                window.open(url, '_blank');
            });
        });
    }

    // Enhanced team member card animations
    function addTeamCardAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'teamCardSlideIn 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.member-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
            
            // Add hover effect for team cards
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.03)';
                card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3), 0 0 25px rgba(212, 175, 55, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // Add CSS for the animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes teamCardSlideIn {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add simple search functionality for team members
    function addSearchFunctionality() {
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            max-width: 400px;
            margin: 2rem auto;
            position: relative;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search team members...';
        searchInput.style.cssText = `
            width: 100%;
            padding: 1rem 1.5rem;
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;
        
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            searchInput.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            searchInput.style.boxShadow = 'none';
        });
        
        searchContainer.appendChild(searchInput);
        
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(searchContainer);
        }

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const memberCards = document.querySelectorAll('.member-card');
            
            memberCards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const role = card.querySelector('.role').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || role.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});