/**
 * Main JavaScript functionality for CLUQ AI Solutions website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for the hero background
    initParticlesJS();
    
    // Initialize main site functionality
    initializeNavbar();
    initRevealAnimations();
    initSmoothScrolling();
    
    // Initialize optional features if they exist on the page
    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) {
        initScrollDownIndicator(scrollDownIndicator);
    }
    
    // Initialize FAQ toggle if FAQs exist
    const faqItems = document.querySelectorAll('.faq-item h2');
    if (faqItems.length > 0) {
        initFaqToggle(faqItems);
    }
});

/**
 * Initialize particles.js background
 */
function initParticlesJS() {
    if (!document.getElementById('particles-js')) return;
    
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

/**
 * Initialize scroll-down indicator functionality
 */
function initScrollDownIndicator(scrollDownIndicator) {
    scrollDownIndicator.addEventListener('click', function() {
        const companyIntro = document.querySelector('.company-intro');
        if (companyIntro) {
            window.scrollTo({
                top: companyIntro.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Initialize reveal animations on scroll
 */
function initRevealAnimations() {
    // Add the reveal class to elements in company-intro
    const companyIntroElements = document.querySelectorAll('.company-intro h2, .company-intro p');
    companyIntroElements.forEach(element => {
        element.classList.add('reveal-on-scroll');
    });

    // Function to reveal elements when scrolled into view
    function revealOnScroll() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }

    // Call revealOnScroll on page load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize FAQ toggle functionality
 */
function initFaqToggle(faqItems) {
    faqItems.forEach((item, index) => {
        // Initially hide all answers except the first one
        if (index !== 0) {
            item.nextElementSibling.style.display = 'none';
        }
        
        // Add click event listener to toggle answers
        item.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            
            if (answer.style.display === 'none' || !answer.style.display) {
                answer.style.display = 'block';
                this.style.color = '#0056b3'; // Darker blue when expanded
            } else {
                answer.style.display = 'none';
                this.style.color = '#007bff'; // Original blue when collapsed
            }
        });
    });
}

/**
 * Initialize navbar functionality
 */
function initializeNavbar() {
    // Mobile menu toggle
    const navbarToggle = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navbarToggle && navMenu) {
        navbarToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Change hamburger icon to X when menu is open
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Handle mobile dropdown toggles
    const dropdownItems = document.querySelectorAll('.nav-dropdown');
    
    // For mobile view - handle dropdown toggle with click
    if (window.innerWidth < 768) {
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (link && dropdown) {
                link.addEventListener('click', function(e) {
                    // Only prevent default on mobile view
                    if (window.innerWidth < 768) {
                        e.preventDefault();
                        item.classList.toggle('open');
                        dropdown.classList.toggle('show');
                    }
                });
            }
        });
    }
    
    // Close the mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only on mobile view and if not a dropdown toggle
            if (window.innerWidth < 768 && !this.parentElement.classList.contains('nav-dropdown')) {
                navMenu.classList.remove('active');
                // Reset hamburger icon
                if (navbarToggle) {
                    const icon = navbarToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth >= 768) {
            dropdownItems.forEach(item => {
                if (!item.contains(e.target)) {
                    const dropdown = item.querySelector('.dropdown-menu');
                    if (dropdown) {
                        dropdown.classList.remove('show');
                    }
                    item.classList.remove('open');
                }
            });
        }
    });
    
    // Add active class to current page link
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href) && href !== '../index.html') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && href === '../index.html') {
            link.classList.add('active');
        }
    });
}