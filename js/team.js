// Enhanced Team Page JavaScript with Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    setupMobileMenu();
    setupCalendarButton();
    addTeamCardAnimations();
    addSearchFunctionality();

    function setupMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                toggleBars(hamburger.classList.contains('active'));
            });

            // Close menu when clicking outside
            document.addEventListener('click', e => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
        }
    }

    function closeMobileMenu() {
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            toggleBars(false);
        }
    }

    function toggleBars(active) {
        const bars = hamburger?.querySelectorAll('.bar');
        if (bars && bars.length >= 3) {
            bars[0].style.transform = active ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            bars[1].style.opacity = active ? '0' : '1';
            bars[2].style.transform = active ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        }
    }

    function setupCalendarButton() {
        const calendarButton = document.getElementById('addToCalendar');
        if (calendarButton) {
            calendarButton.addEventListener('click', () => {
                const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Drama%20Night%202025%20-%20Pygmalion&dates=20251025T180000/20251025T210000&details=GIIS%20Drama%20Night%202025%20featuring%20Pygmalion&location=School%20Auditorium';
                window.open(url, '_blank');
            });
        }
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