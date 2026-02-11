// 'use strict';

/**
 * Al-Kanz Jewellers - Interactive Scripts
 * Handles navigation, smooth scrolling, and form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initSmoothScrolling();
    initContactForm();
    initRevealOnScroll();
});

/**
 * Changes navbar appearance on scroll
 */
function initNavbarScroll() {
    const header = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '1rem 0';
            header.style.backgroundColor = '#FFFFFF';
        }
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Contact Form Validation and Mock Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('inquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (name.trim() === '' || email.trim() === '') {
                alert('Please fill in both your name and email address.');
                return;
            }

            // Visual feedback for submission
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                alert(`Thank you, ${name}! Your inquiry has been sent to our concierge team. We will contact you at ${email} shortly.`);
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                contactForm.reset();
            }, 1500);
        });
    }
}

/**
 * Simple Scroll Animation (Reveal elements as they enter viewport)
 */
function initRevealOnScroll() {
    const cards = document.querySelectorAll('.collection-card');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Set initial state via JS for graceful degradation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

/**
 * Placeholder for Mobile Menu Toggle 
 * (In case a hamburger icon is added to the HTML later)
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}