
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.project-slide');
        const indicators = document.querySelectorAll('.indicator');
        const carouselContainer = document.getElementById('carouselContainer');
        const totalSlides = slides.length;

        // Theme Toggle Function
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            
            body.classList.toggle('light-theme');
            
            if (body.classList.contains('light-theme')) {
                themeToggle.textContent = '🌞';
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            
            if (savedTheme === 'light') {
                body.classList.add('light-theme');
                themeToggle.textContent = '🌞';
            } else {
                themeToggle.textContent = '🌙';
            }
        }

        function showSlide(index) {
            const offset = -index * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index;
            showSlide(index);
        }

        // Auto-play carousel
        setInterval(nextSlide, 5000);

        // Add smooth scrolling and interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Load theme on page load
            loadTheme();
            // Add intersection observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe all sections
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });

            // Add hover effects to skill tags
            document.querySelectorAll('.skill-tag').forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05) rotate(2deg)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Add click animation to project links
            document.querySelectorAll('.project-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });

            // Add parallax effect to header
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
            });

            // Add typing animation to title
            const title = document.querySelector('.header .title');
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        });

        // Add touch support for mobile carousel
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carouselContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        carouselContainer.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const deltaX = startX - currentX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
