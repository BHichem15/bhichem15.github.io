document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    // Interactive elements effect
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .submit-button, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(100, 255, 218, 0.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--highlight)';
        });
    });
    
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Animate links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio Modal Functionality
    const modal = document.querySelector('.portfolio-modal');
    const modalImg = modal.querySelector('.modal-img img');
    const modalTitle = modal.querySelector('.modal-info h2');
    const modalDesc = modal.querySelector('.modal-info p');
    const modalLinks = modal.querySelectorAll('.modal-links a');
    const modalTags = modal.querySelector('.modal-tags');
    const modalDetails = modal.querySelector('.modal-details ul');
    const modalClose = modal.querySelector('.modal-close');

    // Add click event to each portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't open modal if clicking on links inside portfolio item
            if (e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            // Get all necessary data from the portfolio item
            const imgSrc = item.querySelector('.portfolio-img img')?.src;
            const title = item.querySelector('.portfolio-info h3')?.textContent;
            const desc = item.querySelector('.portfolio-info p')?.textContent;
            const liveLink = item.querySelector('.portfolio-links a[href*="youtube"], .portfolio-links a[href*="demo"]')?.href;
            const codeLink = item.querySelector('.portfolio-links a[href*="github"]')?.href;
            const tags = item.querySelectorAll('.portfolio-tag');
            
            // Set modal content
            if (imgSrc) modalImg.src = imgSrc;
            if (title) modalTitle.textContent = title;
            if (desc) modalDesc.textContent = desc;
            
            // Set modal links
            if (liveLink && modalLinks[0]) {
                modalLinks[0].href = liveLink;
                modalLinks[0].innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
            }
            
            if (codeLink && modalLinks[1]) {
                modalLinks[1].href = codeLink;
                modalLinks[1].innerHTML = '<i class="fab fa-github"></i> View Code';
            }
            
            // Clear and rebuild tags
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const tagClone = tag.cloneNode(true);
                modalTags.appendChild(tagClone);
            });
            
            // Set project details - customize this per project
            const projectDetails = {
                'HardMonX': [
                    'Real-time system performance monitoring',
                    'Simple and user-friendly graphical interface',
                    'Works on Windows, Linux, and MacOS',
                    'Lightweight and resource-efficient'
                ],
                // Add details for other projects here
            };
            
            modalDetails.innerHTML = (projectDetails[title] || [
                'High-quality project implementation',
                'Responsive design',
                'Optimized performance',
                'Clean and maintainable code'
            ]).map(detail => `<li>${detail}</li>`).join('');
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal handlers
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Initialize ScrollReveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.hero-content, .hero-image', { origin: 'left' });
    scrollReveal.reveal('.about-image, .about-text', { interval: 200 });
    scrollReveal.reveal('.skill-category', { interval: 200 });
    scrollReveal.reveal('.portfolio-item', { interval: 200 });
    scrollReveal.reveal('.contact-form, .contact-info', { origin: 'right', interval: 200 });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }

    // Initialize skill bars animation
    animateSkillBars();
});
document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.querySelector('.custom-language-switcher');
    if (!switcher) return;

    const selectedOption = switcher.querySelector('.selected-option');
    const options = switcher.querySelector('.options');
    const hiddenSelect = switcher.querySelector('.hidden-select');
    const allOptions = options.querySelectorAll('li');
    const arrow = selectedOption.querySelector('.arrow');

    // Set initial selected option
    function setInitialOption() {
        const initialValue = hiddenSelect.value;
        const initialOption = options.querySelector(`[data-value="${initialValue}"]`);
        if (initialOption) {
            selectedOption.innerHTML = initialOption.innerHTML + '<span class="arrow">▼</span>';
        }
    }
    setInitialOption();

    // Toggle dropdown
    selectedOption.addEventListener('click', function(e) {
        e.stopPropagation();
        switcher.classList.toggle('active');
    });

    // Handle option selection
    allOptions.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            hiddenSelect.value = value;
            
            // Update selected display
            selectedOption.innerHTML = this.innerHTML + '<span class="arrow">▼</span>';
            
            // Trigger change event
            hiddenSelect.dispatchEvent(new Event('change'));
            
            // Close dropdown
            switcher.classList.remove('active');
            
            // Add hover effect
            switcher.classList.add('clicked');
            setTimeout(() => {
                switcher.classList.remove('clicked');
            }, 300);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        switcher.classList.remove('active');
    });

    // Keyboard accessibility
    switcher.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switcher.classList.toggle('active');
        }
    });

    // Add hover effects
    switcher.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 6px 10px rgba(0, 188, 212, 0.4)';
        this.style.transform = 'translateY(-2px)';
    });

    switcher.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.boxShadow = '0 4px 6px rgba(0, 188, 212, 0.3)';
            this.style.transform = 'translateY(0)';
        }
    });
});

// Connect with i18next if needed
document.getElementById('language').addEventListener('change', function() {
    i18next.changeLanguage(this.value);
});