// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DawnStar Global - Interactive Features
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

(function() {
    'use strict';

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Global Variables
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    let nav, hero, sections, navLinks;
    let isScrolling = false;
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Utility Functions
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Loading Animation
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Initialize Elements
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    function initElements() {
        nav = document.getElementById('navigation');
        hero = document.getElementById('home');
        sections = document.querySelectorAll('section[id]');
        navLinks = document.querySelectorAll('.nav-menu a');
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Navigation - Scroll Effect & Active State
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    let ticking = false;
    let lastScrollY = 0;
    
    function handleScroll() {
        if (!nav || !hero) return;
        
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        // Update navigation background
        if (scrollY > heroHeight * 0.3) {
            nav.classList.add('scrolled');
    } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = scrollY + 200;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Parallax effect for hero using requestAnimationFrame
        if (hero && scrollY < window.innerHeight) {
            requestAnimationFrame(() => {
                const rate = scrollY * 0.3;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
        
        ticking = false;
    }
    
    // Optimized scroll handler with requestAnimationFrame
    function onScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Mobile Navigation Toggle
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        // Toggle menu
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (isActive) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navMenuLinks = navMenu.querySelectorAll('a');
        navMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Smooth Scrolling for Navigation Links
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip empty or just # links
                if (!targetId || targetId === '#') return;
                
        e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Intersection Observer - Scroll-Triggered Animations
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function initIntersectionObserver() {
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
                    // Optional: Stop observing after animation for performance
                    // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

        // Section titles
        document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
    
        // Section subtitles
        document.querySelectorAll('.section-subtitle').forEach(subtitle => {
            observer.observe(subtitle);
        });
        
        // Promise section elements
        document.querySelectorAll('.promise-lead, .promise-text').forEach((element, index) => {
            element.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
            observer.observe(element);
        });
        
        // Korean Advantage cards
        document.querySelectorAll('.advantage-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
        // Approach blocks
        document.querySelectorAll('.approach-block').forEach((block, index) => {
            block.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(block);
        });
        
        // Coming Soon elements
        const comingSoonProduct = document.querySelector('.coming-soon-product');
        if (comingSoonProduct) observer.observe(comingSoonProduct);
        
        document.querySelectorAll('.coming-soon-text p').forEach((text, index) => {
            text.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
            observer.observe(text);
        });
        
        const comingSoonDate = document.querySelector('.coming-soon-date');
        if (comingSoonDate) observer.observe(comingSoonDate);
        
        // Story columns
        document.querySelectorAll('.story-column').forEach((column, index) => {
            column.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(column);
        });
        
        // Footer columns
        document.querySelectorAll('.footer-column').forEach((column, index) => {
            column.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(column);
        });
        
        // Footer bottom
        const footerBottom = document.querySelector('.footer-bottom');
        if (footerBottom) observer.observe(footerBottom);
    }
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Initialize on DOM Ready
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    document.addEventListener('DOMContentLoaded', function() {
        initElements();
        initMobileNav();
        initSmoothScroll();
        initIntersectionObserver();
        
        // Initial scroll handler call
        handleScroll();
        
        // Console welcome message
        if (console && console.log) {
            console.log(
                '%c🌟 DawnStar Global',
                'color: #10B981; font-size: 24px; font-weight: bold;'
            );
            console.log(
                '%cYour Lifetime Wellness Partner',
                'color: #059669; font-size: 14px;'
            );
            console.log(
                '%cPowered by Korean Beauty Innovation',
                'color: #374151; font-size: 12px;'
            );
            console.log(
                '%cLaunching Spring 2025',
                'color: #D4AF37; font-size: 12px; font-weight: bold;'
            );
        }
    });
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Window Resize Handler
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    const handleResize = debounce(function() {
        // Re-calculate positions if needed
        handleScroll();
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
})();
