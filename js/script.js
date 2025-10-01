// Drama Night Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sections
    const sections = {
        home: document.getElementById('home'),
        team: document.getElementById('team')
    };
    
    // Initialize page
    init();
    
    function init() {
        // Set up navigation
        setupNavigation();
        
        // Set up mobile menu
        setupMobileMenu();
        
        // Set up interactive elements
        setupInteractiveElements();
        
        // Show home section by default
        showSection('home');
        
        // Set up calendar buttons
        setupCalendarButtons();
        
        // Add scroll effects
        setupScrollEffects();
    }
    
    function setupNavigation() {
        // Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get target section
                const target = this.getAttribute('href').substring(1);
                
                // Show target section
                showSection(target);
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    function setupMobileMenu() {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Reset hamburger animation
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
    
    function showSection(sectionName) {
        // Hide all sections
        Object.values(sections).forEach(section => {
            if (section) {
                section.classList.remove('active');
            }
        });
        
        // Show target section
        if (sections[sectionName]) {
            sections[sectionName].classList.add('active');
        }
        
        // Update page title
        updatePageTitle(sectionName);
        
        // Trigger entrance animations
        triggerSectionAnimations(sectionName);
    }
    
    function updatePageTitle(sectionName) {
        const titles = {
            home: 'Drama Night 2025 - School Theater Production',
            team: 'Cast & Crew - Drama Night 2025'
        };
        
        document.title = titles[sectionName] || titles.home;
    }
    
    function triggerSectionAnimations(sectionName) {
        const section = sections[sectionName];
        if (!section) return;
        
        // Reset animations
        const animatedElements = section.querySelectorAll('.member-card, .detail-card, .performance-card');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            // Staggered animation
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }
    
    function setupInteractiveElements() {
        // Add hover effects to interactive elements
        const interactiveCards = document.querySelectorAll('.member-card, .detail-card, .performance-card');
        
        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effects to buttons
        const buttons = document.querySelectorAll('.cta-btn, .calendar-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                createRippleEffect(e, this);
            });
        });
        
        // Add spotlight following cursor effect
        setupCursorSpotlight();
    }
    
    function createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation CSS if not exists
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function setupCursorSpotlight() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Update spotlight position occasionally
        setInterval(() => {
            const spotlights = document.querySelectorAll('.spotlight');
            spotlights.forEach((spotlight, index) => {
                if (Math.random() > 0.7) { // Random chance to move
                    const offset = 100 + (index * 50);
                    spotlight.style.left = Math.max(0, Math.min(window.innerWidth - 300, mouseX - offset)) + 'px';
                    spotlight.style.top = Math.max(0, Math.min(window.innerHeight - 300, mouseY - offset)) + 'px';
                }
            });
        }, 2000);
    }
    
    function setupCalendarButtons() {
        const calendarButtons = document.querySelectorAll('#addToCalendar, #addToCalendarMain');
        
        calendarButtons.forEach(button => {
            button.addEventListener('click', function() {
                addToGoogleCalendar();
            });
        });
    }
    
    function addToGoogleCalendar() {
        // Event details - customize these as needed
        const eventDetails = {
            title: 'Drama Night 2025 - Shakespeare\'s Greatest Hits',
            startDate: '20250315T190000Z', // March 15, 2025, 7:00 PM UTC
            endDate: '20250315T210000Z',   // March 15, 2025, 9:00 PM UTC
            description: 'Join us for an enchanting evening featuring scenes from Shakespeare\'s most beloved works, brought to life by our talented student performers.',
            location: 'School Auditorium'
        };
        
        // Create Google Calendar URL
        const googleCalendarUrl = createGoogleCalendarUrl(eventDetails);
        
        // Open in new window
        window.open(googleCalendarUrl, '_blank', 'width=600,height=600');
        
        // Show confirmation message
        showNotification('Opening Google Calendar...', 'success');
    }
    
    function createGoogleCalendarUrl(event) {
        const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
        const params = new URLSearchParams({
            text: event.title,
            dates: `${event.startDate}/${event.endDate}`,
            details: event.description,
            location: event.location,
            sf: true,
            output: 'xml'
        });
        
        return `${baseUrl}&${params.toString()}`;
    }
    
    function setupScrollEffects() {
        // Add scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const elementsToObserve = document.querySelectorAll(
            '.detail-card, .member-card, .performance-card, .team-category'
        );
        
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
        
        // Add fade-in CSS if not exists
        if (!document.getElementById('scroll-animations')) {
            const style = document.createElement('style');
            style.id = 'scroll-animations';
            style.textContent = `
                .fade-in {
                    animation: fadeInUp 0.8s ease forwards;
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
            `;
            document.head.appendChild(style);
        }
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    border-left: 4px solid #ffd700;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    backdrop-filter: blur(10px);
                    animation: slideInRight 0.3s ease;
                }
                
                .notification-success {
                    border-left-color: #4caf50;
                }
                
                .notification i {
                    font-size: 1.2rem;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Utility function for smooth scrolling to sections
    window.scrollToSection = function(sectionName) {
        const targetLink = document.querySelector(`[href="#${sectionName}"]`);
        if (targetLink) {
            targetLink.click();
        }
    };
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Set initial URL hash
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Navigate with arrow keys
        if (e.altKey) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const currentSection = document.querySelector('section.active').id;
                const sectionOrder = ['home', 'team'];
                const currentIndex = sectionOrder.indexOf(currentSection);
                
                let nextIndex;
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : sectionOrder.length - 1;
                } else {
                    nextIndex = currentIndex < sectionOrder.length - 1 ? currentIndex + 1 : 0;
                }
                
                const targetLink = document.querySelector(`[href="#${sectionOrder[nextIndex]}"]`);
                if (targetLink) {
                    targetLink.click();
                }
            }
        }
        
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Preload images for better performance
    function preloadImages() {
        const imageUrls = [
            'images/school-logo.png',
            'images/drama-club-logo.png'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
});