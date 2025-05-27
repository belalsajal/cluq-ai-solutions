/**
 * Main JavaScript functionality for CLUQ AI Solutions website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for the hero background
    initParticlesJS();
    
    // Fix header styling first - before other initializations
    fixHeaderStyling();
    
    // Initialize main site functionality
    initializeNavbar();
    initRevealAnimations();
    initSmoothScrolling();
    initEnhancedButtons(); // Initialize enhanced button effects
    
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
    
    // Initialize the enhanced form controls if we're on the contact page
    if (window.location.pathname.includes('contact.html')) {
        initEnhancedFormControls();
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
    
    // Ensure nav menu is always visible on desktop
    function checkScreenSize() {
        if (window.innerWidth >= 768 && navMenu) {
            // Force display on desktop
            navMenu.style.display = 'flex';
            navMenu.classList.remove('active');
        }
    }
    
    // Run on page load
    checkScreenSize();
    
    // Run on window resize
    window.addEventListener('resize', checkScreenSize);
    
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
    
    // Handle dropdown toggle with click on mobile
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
    
    // Ensure all nav links are properly visible on all pages
    document.querySelectorAll('.nav-menu').forEach(menu => {
        if (window.innerWidth >= 768) {
            menu.style.display = 'flex';
            menu.style.width = 'auto';
            menu.style.visibility = 'visible';
            menu.style.opacity = '1';
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

/**
 * Fix header styling across all pages to ensure consistent navbar display
 */
function fixHeaderStyling() {
    // Fix header element if it exists
    const header = document.querySelector('header');
    if (header) {
        header.style.width = '100%';
        header.style.boxSizing = 'border-box';
    }
    
    // Force nav menu to be visible on desktop
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && window.innerWidth >= 768) {
        navMenu.style.display = 'flex';
        navMenu.style.visibility = 'visible';
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'none';
        navMenu.style.position = 'static';
        navMenu.style.width = 'auto';
        navMenu.style.backgroundColor = 'transparent';
    }
    
    // Adjust navbar container
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'flex';
        navbar.style.justifyContent = 'space-between';
        navbar.style.alignItems = 'center';
        navbar.style.width = '100%';
        navbar.style.boxSizing = 'border-box';
    }
    
    // Fix nav items to ensure they're visible
    document.querySelectorAll('.nav-item').forEach(item => {
        if (window.innerWidth >= 768) {
            item.style.margin = '0';
            item.style.width = 'auto';
            item.style.flexShrink = '0';
        }
    });
    
    // Apply specific fix for portfolio page
    if (window.location.pathname.includes('portfolio.html')) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.fontSize = '0.95rem';
            link.style.whiteSpace = 'nowrap';
            link.style.display = 'flex';
        });
    }
}

/**
 * Initialize enhanced form controls
 */
function initEnhancedFormControls() {
    // Apply enhancements to select dropdowns
    const selectElements = document.querySelectorAll('select.form-control');
    
    selectElements.forEach(select => {
        // Add change event listener to handle selected state styling
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
            
            // Apply ripple effect on select change
            const wrapper = this.closest('.select-wrapper');
            if (wrapper) {
                createRippleEffect(wrapper);
            }
        });
        
        // Add focus and blur event listeners
        select.addEventListener('focus', function() {
            const wrapper = this.closest('.select-wrapper');
            if (wrapper) {
                wrapper.classList.add('focused');
            }
        });
        
        select.addEventListener('blur', function() {
            const wrapper = this.closest('.select-wrapper');
            if (wrapper) {
                wrapper.classList.remove('focused');
            }
        });
    });
    
    // Initialize form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    }
}

/**
 * Create a ripple effect on an element
 */
function createRippleEffect(element) {
    // Remove existing ripples
    const existingRipples = element.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Create new ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Set ripple position
    const rect = element.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        ripple.style.opacity = '0';
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }, 10);
}

/**
 * Validate the contact form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Check each required field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightInvalidField(field);
        } else {
            removeInvalidHighlight(field);
        }
    });
    
    // If form is valid, submit
    if (isValid) {
        // Show success message (in a real scenario, this would send data to a server)
        showFormSubmissionMessage('success', 'Your message has been sent! We\'ll get back to you soon.');
    } else {
        showFormSubmissionMessage('error', 'Please fill in all required fields.');
    }
}

/**
 * Highlight invalid form fields
 */
function highlightInvalidField(field) {
    field.classList.add('invalid');
    
    // Add shake animation
    field.classList.add('shake');
    setTimeout(() => {
        field.classList.remove('shake');
    }, 820);
    
    // Add event listener to remove invalid class when user starts typing
    field.addEventListener('input', function onInput() {
        if (field.value.trim()) {
            removeInvalidHighlight(field);
            field.removeEventListener('input', onInput);
        }
    });
}

/**
 * Remove invalid highlight from a form field
 */
function removeInvalidHighlight(field) {
    field.classList.remove('invalid');
}

/**
 * Show form submission success/error message
 */
function showFormSubmissionMessage(type, message) {
    // Check if message container already exists
    let messageContainer = document.querySelector('.form-message');
    
    // If not, create it
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.classList.add('form-message');
        
        // Add it after the form
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(messageContainer, form.nextSibling);
        }
    }
    
    // Set message content and class
    messageContainer.textContent = message;
    messageContainer.className = `form-message ${type}`;
    
    // Show the message with animation
    messageContainer.style.opacity = '0';
    messageContainer.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide the message after a delay
    if (type === 'success') {
        setTimeout(() => {
            messageContainer.style.opacity = '0';
            messageContainer.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                messageContainer.remove();
            }, 500);
        }, 5000);
    }
}

/**
 * Initialize enhanced button effects
 */
function initEnhancedButtons() {
    // Get all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        // Add mouse movement effect (subtle glow following cursor)
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the button
            const y = e.clientY - rect.top;  // y position within the button
            
            // Update the position of the after pseudo-element
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
        
        // Add click effect
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('button-ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Check if this button is on the current page path
        const href = button.getAttribute('href');
        const currentPath = window.location.pathname;
        
        // If the button leads to the current page, add a class
        if (href && currentPath.includes(href)) {
            button.classList.add('current-page');
            button.innerHTML = `<i class="fas fa-check-circle"></i> You're Here`;
            button.style.pointerEvents = 'none'; // Disable clicking
        }
    });
}