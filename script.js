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
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio Modal
    const portfolioItemsModal = document.querySelectorAll('.portfolio-item');
    const modal = document.querySelector('.portfolio-modal');
    const modalImg = modal.querySelector('.modal-img img');
    const modalTitle = modal.querySelector('.modal-info h2');
    const modalDesc = modal.querySelector('.modal-info p');
    const modalLinks = modal.querySelectorAll('.modal-links a');
    const modalTags = modal.querySelector('.modal-tags');
    const modalDetails = modal.querySelector('.modal-details ul');
    const modalClose = modal.querySelector('.modal-close');

    portfolioItemsModal.forEach(item => {
        item.addEventListener('click', (e) => {
            // Don't open modal if clicking on links inside portfolio item
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                return;
            }
            
            const imgSrc = item.querySelector('.portfolio-img img').getAttribute('src');
            const title = item.querySelector('.portfolio-info h3').textContent;
            const desc = item.querySelector('.portfolio-info p').textContent;
            const links = item.querySelectorAll('.portfolio-links a');
            const tags = item.querySelectorAll('.portfolio-tag');
            
            // Set modal content
            modalImg.setAttribute('src', imgSrc);
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            // Set modal links
            links.forEach((link, index) => {
                if (modalLinks[index]) {
                    modalLinks[index].setAttribute('href', link.getAttribute('href'));
                    modalLinks[index].innerHTML = link.innerHTML;
                }
            });
            
            // Set modal tags
            modalTags.innerHTML = '';
            tags.forEach(tag => {
                const tagClone = tag.cloneNode(true);
                modalTags.appendChild(tagClone);
            });
            
            // Set modal details (customize this per project)
            modalDetails.innerHTML = `
                <li>Responsive design that works on all devices</li>
                <li>Modern UI/UX principles applied</li>
                <li>Optimized for performance</li>
                <li>Clean, maintainable code</li>
            `;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Scroll reveal animation
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
});