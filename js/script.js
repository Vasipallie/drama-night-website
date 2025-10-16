// Optimized Drama Night Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = {
        home: document.getElementById('home'),
        team: document.getElementById('team')
    };

    setupNavigation();
    setupMobileMenu();
    setupCalendarButtons();
    showSection('home');

    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                const target = this.getAttribute('href').substring(1);
                showSection(target);
                closeMobileMenu();
            });
        });
    }

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

    function showSection(name) {
        Object.values(sections).forEach(s => s && s.classList.remove('active'));
        sections[name] && sections[name].classList.add('active');
    }

    function setupCalendarButtons() {
        document.querySelectorAll('#addToCalendar, #addToCalendarMain').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Drama%20Night%202025%20-%20Pygmalion&dates=20251025T180000/20251025T210000&details=GIIS%20Drama%20Night%202025%20featuring%20Pygmalion&location=School%20Auditorium';
                window.open(url, '_blank');
            });
        });
    }

    window.scrollToSection = name => document.querySelector([href='#'])?.click();
    document.addEventListener('keydown', e => e.key === 'Escape' && closeMobileMenu());
});