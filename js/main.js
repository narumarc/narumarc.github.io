// Background slider functionality
const slides = document.querySelectorAll('.background-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change background every 10 seconds
setInterval(nextSlide, 10000);

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            // Close mobile menu if open
            const nav = document.getElementById('mainNav');
            const hamburger = document.getElementById('hamburgerBtn');
            if (nav && hamburger) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Wait for DOM to load before setting up hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('mainNav');

    if (hamburger && nav) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});
