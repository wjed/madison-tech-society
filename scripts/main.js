// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form type
            const formType = this.classList.contains('contact-form') ? 'contact' :
                           this.classList.contains('join-form') ? 'membership' :
                           this.classList.contains('newsletter-form') ? 'newsletter' : 'form';
            
            // Show success message
            showSuccessMessage(formType);
            
            // Reset form
            this.reset();
        });
    });
    
    // RSVP buttons
    const rsvpButtons = document.querySelectorAll('.event-card .btn');
    rsvpButtons.forEach(button => {
        if (button.textContent.includes('RSVP')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSuccessMessage('rsvp');
            });
        }
    });
    
    // Calendar buttons
    const calendarButtons = document.querySelectorAll('.calendar-buttons .btn');
    calendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Calendar integration coming soon! For now, please check our events page regularly for updates.');
        });
    });
    
    // Social media and external links
    const socialLinks = document.querySelectorAll('.social-link, .btn[href="#"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Link coming soon! Follow us for updates.');
            }
        });
    });
    
    // Member login button
    const loginButton = document.querySelector('.member-login .btn');
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Member login portal coming soon! Check back later for access to exclusive content.');
        });
    }
});

function showSuccessMessage(type) {
    let message = '';
    
    switch(type) {
        case 'contact':
            message = 'Thank you for your message! We\'ll get back to you within 24 hours.';
            break;
        case 'membership':
            message = 'Thank you for your interest in joining MTS! We\'ll send you a welcome email with next steps soon.';
            break;
        case 'newsletter':
            message = 'Successfully subscribed to our newsletter! You\'ll receive updates about upcoming events and opportunities.';
            break;
        case 'rsvp':
            message = 'RSVP confirmed! We\'ll send you event details and reminders via email.';
            break;
        default:
            message = 'Thank you! Your submission has been received.';
    }
    
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: auto;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});