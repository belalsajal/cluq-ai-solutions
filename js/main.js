document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for the hero background
    if (document.getElementById('particles-js')) {
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

    // Initialize Navbar functionality
    initializeNavbar();

    // Initialize Featured Projects Slider
    initializeProjectSlider();

    // Initialize project cards navigation
    initializeProjectCards();

    // Initialize Read More buttons
    initReadMoreButtons();

    // Initialize preview project cards
    initProjectPreviewCards();

    // Smooth scrolling for the scroll-down indicator
    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) {
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

    // Reveal animations when scrolling
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

    // Add the reveal class to elements in company-intro
    const companyIntroElements = document.querySelectorAll('.company-intro h2, .company-intro p');
    companyIntroElements.forEach(element => {
        element.classList.add('reveal-on-scroll');
    });

    // Call revealOnScroll on page load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Call-to-action button functionality
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Thank you for your interest! We will get back to you shortly.');
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item h2');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            // Initially hide all answers except the first one
            if (item !== faqItems[0]) {
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

    // Handle mobile navigation toggle if needed in the future
    // Placeholder for potential mobile menu toggle
    
    // Smooth scrolling for anchor links
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
});

// Navbar functionality
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

function initializeProjectSlider() {
    const slider = document.querySelector('.featured-projects-slider');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const indicators = document.querySelectorAll('.indicator');
    const detailButtons = document.querySelectorAll('.project-details-btn');
    
    // Initialize state
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.featured-project').length;
    
    // Skip if elements don't exist (not on the portfolio page)
    if (!slider || !prevButton || !nextButton) return;
    
    // Set up navigation buttons
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSliderPosition();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSliderPosition();
    });
    
    // Set up indicator dots
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSliderPosition();
        });
    });
    
    // Set up project details toggle
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectContent = this.closest('.featured-project-content');
            const description = projectContent.querySelector('.project-description');
            const highlights = projectContent.querySelector('.project-highlights');
            
            // Toggle expanded state
            description.classList.toggle('expanded');
            highlights.classList.toggle('visible');
            this.classList.toggle('expanded');
            
            // Update button text based on state
            if (this.classList.contains('expanded')) {
                this.textContent = 'Hide Details';
            } else {
                this.textContent = 'View Project Details';
            }
        });
    });
    
    // Function to update the slider position
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active indicator
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Initialize slider position
    updateSliderPosition();
}

function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const slider = document.querySelector('.featured-projects-slider');
    
    // Skip if elements don't exist
    if (!projectCards.length || !slider) return;
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-project-id'));
            
            // Navigate to the featured project slider and show the selected project
            document.querySelector('.featured-projects').scrollIntoView({ behavior: 'smooth' });
            
            // Set the slider to show the selected project
            slider.style.transform = `translateX(-${projectId * 100}%)`;
            
            // Update active indicator
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === projectId);
            });
        });
    });
}

function initReadMoreButtons() {
    // Code for read more functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentContainer = this.closest('.collapsible-content');
            if (parentContainer) {
                parentContainer.classList.toggle('expanded');
                
                if (parentContainer.classList.contains('expanded')) {
                    this.textContent = 'Read Less';
                } else {
                    this.textContent = 'Read More';
                }
            }
        });
    });
}

function initProjectPreviewCards() {
    // No additional functionality needed - let the native <a> tag links work
    // Project cards in portfolio.html are already proper links to detail pages
    console.log("Project preview cards initialized with native link behavior");
}

// Commented out expandable card functionality as it's not needed
// Project Cards Expandable Functionality
/*
function initializeExpandableCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCard(card);
            });
        }
        
        card.addEventListener('click', () => {
            if (!card.classList.contains('expanded')) {
                toggleCard(card);
            }
        });
    });
}

function toggleCard(card) {
    // Close any already expanded cards
    const expandedCards = document.querySelectorAll('.project-card.expanded');
    expandedCards.forEach(expandedCard => {
        if (expandedCard !== card) {
            expandedCard.classList.remove('expanded');
            const btn = expandedCard.querySelector('.expand-btn');
            if (btn) {
                btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        }
    });
    
    // Toggle the clicked card
    card.classList.toggle('expanded');
    const btn = card.querySelector('.expand-btn');
    
    if (btn) {
        if (card.classList.contains('expanded')) {
            btn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
        } else {
            btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
        }
    }
    
    // Scroll to the expanded card
    if (card.classList.contains('expanded')) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}
*/