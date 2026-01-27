// Blog page animations and interactions
// Save as: blog/js/blog.js

document.addEventListener('DOMContentLoaded', function() {
    // Background slider animation
    const slides = document.querySelectorAll('.background-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change background every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all major content sections
    document.querySelectorAll('.blog-content h2, .blog-content h3, .highlight-box, .success-box, .warning-box, .stats-grid, .comparison-table').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Copy code blocks on click
    document.querySelectorAll('.code-block').forEach(block => {
        block.style.cursor = 'pointer';
        block.title = 'Click to copy';
        
        block.addEventListener('click', function() {
            const code = this.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                const originalBorder = this.style.borderLeft;
                this.style.borderLeft = '4px solid #22c55e';
                
                setTimeout(() => {
                    this.style.borderLeft = originalBorder;
                }, 1000);
            });
        });
    });

    // Reading progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8a2be2, #b89aff);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});