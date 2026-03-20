// Carousel functionality
function initCarousel() {
    const carouselSlides = document.getElementById('carouselSlides');

    // List of carousel images - update these filenames to match your images
    const images = [
        'images/carousel/slide1.jpg',
        'images/carousel/slide2.jpg',
        'images/carousel/slide3.jpg',
        'images/carousel/slide4.jpg',
        'images/carousel/slide5.jpg'
    ];

    let currentSlide = 0;

    // Create slide elements
    images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === 0) slide.classList.add('active');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Slide ${index + 1}`;
        img.onerror = function () {
            // Fallback if image doesn't exist
            this.style.background = '#667eea';
        };

        slide.appendChild(img);
        carouselSlides.appendChild(slide);
    });

    // Function to change slides
    function changeSlide() {
        const slides = document.querySelectorAll('.carousel-slide');

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 3 seconds
    setInterval(changeSlide, 3000);
}

// Header scroll effect
function initScrollEffect() {
    const header = document.querySelector('.site-header');
    
    if (!header) {
        console.error('Header not found');
        return;
    }
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize scroll effect immediately
    initScrollEffect();
    
    // Initialize carousel if element exists
    const carouselSlides = document.getElementById('carouselSlides');
    if (carouselSlides) {
        initCarousel();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Also run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    // Wait for DOMContentLoaded
} else {
    // DOM is already ready
    initScrollEffect();
}