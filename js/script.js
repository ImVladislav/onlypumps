document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const allNavLinks = document.querySelectorAll('a[href^="#"]'); // Select all internal links
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');
    let loadedImages = 0;
    const totalImages = document.querySelectorAll('img').length;
    
    // Smooth scroll function
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href="#"
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerOffset = 80; // Adjust this value based on your header height
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scroll to all internal links
    allNavLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function updateProgress() {
        const percentage = (loadedImages / totalImages) * 100;
        progress.style.width = `${percentage}%`;
        
        if (loadedImages === totalImages) {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        }
    }
    
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                updateProgress();
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    updateProgress();
                });
                
                img.addEventListener('error', () => {
                    loadedImages++;
                    updateProgress();
                });
            }
        });
    }
    
    document.body.style.overflow = 'hidden';
    preloadImages();
    
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }
    }, 5000);

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            smoothScroll.call(this, e); // Add smooth scroll to mobile links
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}); 