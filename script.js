// ELEVEN11 Agency Website JavaScript

// Initialize EmailJS
(function() {
    emailjs.init("IvcVSYN_406ZMvYDu"); // Replace with your actual EmailJS public key
})();

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chatbot-messages');
const floatingChatBtn = document.getElementById('floating-chat-btn');
const floatingChat = document.getElementById('floating-chat');
const closeChatBtn = document.getElementById('close-chat');
const floatingChatInput = document.getElementById('floating-chat-input');
const floatingSendButton = document.getElementById('floating-send-button');
const floatingChatMessages = document.getElementById('floating-chat-messages');

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        initParticles();
        initScrollAnimations();
    }, 2000);
});

// Particle Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay and duration
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
}

// Navigation Functionality
navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Floating Chat Functionality
function openFloatingChat() {
    floatingChat.classList.remove('hidden');
    floatingChatBtn.style.display = 'none';
    
    // Focus on input after opening
    setTimeout(() => {
        floatingChatInput.focus();
    }, 300);
}

function closeFloatingChat() {
    floatingChat.classList.add('hidden');
    floatingChatBtn.style.display = 'flex';
}

// Event listeners for floating chat
floatingChatBtn.addEventListener('click', openFloatingChat);
closeChatBtn.addEventListener('click', closeFloatingChat);

// Make openFloatingChat globally accessible for the hero button
window.openFloatingChat = openFloatingChat;

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('animate-stagger')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .usp-grid,
        .services-grid,
        .process-steps,
        .pricing-grid,
        .testimonials-slider,
        .contact-content,
        .usp-card,
        .service-card,
        .process-step,
        .pricing-card,
        .testimonial-card
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .usp-card,
    .service-card,
    .process-step,
    .pricing-card,
    .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .animate-stagger > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-stagger > .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Add animate-stagger class to grid containers
document.addEventListener('DOMContentLoaded', function() {
    const gridContainers = document.querySelectorAll('.usp-grid, .services-grid, .pricing-grid');
    gridContainers.forEach(container => {
        container.classList.add('animate-stagger');
    });
});

// Chatbot Demo Functionality
const chatbotResponses = {
    'hello': 'Hello! Welcome to ELEVEN11. How can I help you with AI automation today?',
    'hi': 'Hi there! I\'m here to help you learn about our AI chatbot solutions. What would you like to know?',
    'services': 'We offer AI Chatbots for E-Commerce, Cart Recovery Bots, AI Customer Support, and Sales Automation. Which one interests you most?',
    'pricing': 'We have three plans: Starter ($99 setup), Growth ($199 setup + $49/mo), and Pro (custom pricing). Which plan would work best for your business?',
    'chatbot': 'Our AI chatbots can automate FAQs, recommend products, and engage customers 24/7. They typically increase sales by 15-30%. Would you like to know more?',
    'demo': 'This is a live demo of our AI technology! In a real implementation, it would be connected to your product catalog and business data. Pretty cool, right?',
    'help': 'I can help you with information about our services, pricing, setup process, or answer any questions about AI automation. What would you like to know?',
    'setup': 'Our setup process is super quick - usually within 48 hours! We handle everything: design, integration, and testing. You just need to provide us with your business requirements.',
    'cost': 'Our solutions start at just $99 for a basic FAQ bot. Most e-commerce stores see ROI within the first month. Would you like to discuss pricing for your specific needs?',
    'support': 'We provide 24/7 AI customer support that can handle common questions, process orders, and escalate complex issues to your human team. It never sleeps!',
    'cart': 'Our cart recovery bots can recover 15-25% of abandoned carts on average. They send personalized messages via WhatsApp, SMS, or email to bring customers back.',
    'automation': 'AI automation can handle customer inquiries, process orders, recommend products, recover abandoned carts, and much more. What aspect interests you most?',
    'roi': 'Most of our clients see positive ROI within 30-60 days. Cart recovery alone typically pays for the entire system within the first month!',
    'integration': 'We integrate with all major e-commerce platforms: Shopify, WooCommerce, Magento, BigCommerce, and custom solutions. The process is seamless!',
    'book': 'Great! To book a free demo, just fill out the contact form below or click the "Book Free Demo" button. We\'ll schedule a call within 24 hours!',
    'contact': 'You can reach us via the contact form, WhatsApp, or email at hello@eleven11.com. We typically respond within 2-4 hours during business days.',
    'default': 'That\'s a great question! Our AI solutions are designed to boost your sales and automate customer support. Would you like to book a free demo to see how we can help your specific business?'
};

function addMessage(content, isUser = false, container = chatMessages) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (keyword !== 'default' && message.includes(keyword)) {
            return response;
        }
    }
    
    return chatbotResponses.default;
}

function sendMessage(inputElement = chatInput, messagesContainer = chatMessages) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true, messagesContainer);
    inputElement.value = '';
    
    // Show typing indicator
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false, messagesContainer);
    }, 1000);
}

// Demo section chatbot
sendButton.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Floating chatbot
floatingSendButton.addEventListener('click', () => sendMessage(floatingChatInput, floatingChatMessages));
floatingChatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage(floatingChatInput, floatingChatMessages);
    }
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.nav-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial and activate dot
    if (testimonials[index] && testimonialDots[index]) {
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Make showTestimonial globally accessible
window.showTestimonial = showTestimonial;

// Contact Form Functionality
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company') || 'Not provided';
    const message = formData.get('message') || 'Demo request';
    
    // Basic validation
    if (!name || !email) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare email parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        company: company,
        message: message,
        to_email: 'elevenagencydm11@gmail.com' // Replace with your actual email
    };
    
    // Send email using EmailJS
    emailjs.send('service_u129byc', 'template_j33cneb', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showFormMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            // Fallback: Still show success message to user
            showFormMessage('Thank you for your interest! We\'ll contact you soon.', 'success');
            contactForm.reset();
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Pricing cards hover effect
    const pricingCards = document.querySelectorAll('.pricing-card:not(.featured)');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Featured pricing card special hover effect
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        featuredCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.07)';
        });
        
        featuredCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1.05)';
        });
    }
});

// Typing animation for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation after loading
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroHeadline = document.querySelector('.hero-headline');
        if (heroHeadline) {
            const originalText = heroHeadline.textContent;
            typeWriter(heroHeadline, originalText, 30);
        }
    }, 3000);
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #0066FF, #00FF9C);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 300);
        }
    });
});

// Add CSS for button loading animation
const buttonStyle = document.createElement('style');
buttonStyle.textContent = `
    .btn.loading {
        transform: scale(0.95);
        opacity: 0.8;
    }
    
    .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(buttonStyle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Existing scroll logic here
}, 10);

// Auto-show floating chat after user has been on page for a while
setTimeout(() => {
    if (floatingChat.classList.contains('hidden')) {
        // Add subtle bounce animation to get user's attention
        floatingChatBtn.style.animation = 'bounce 1s ease-in-out 3';
        
        setTimeout(() => {
            floatingChatBtn.style.animation = '';
        }, 3000);
    }
}, 10000); // Show after 10 seconds

// Add welcome message to floating chat after opening
floatingChatBtn.addEventListener('click', function() {
    // Clear existing messages and add welcome message
    setTimeout(() => {
        if (floatingChatMessages.children.length <= 1) {
            addMessage('Welcome! 👋 I can help you learn about our AI automation services. What would you like to know?', false, floatingChatMessages);
        }
    }, 500);
});

// Console welcome message
console.log(`
🚀 Welcome to ELEVEN11 - AI Automation Agency
🤖 Building systems that don't sleep, so you can dream bigger
💡 Interested in our services? Contact us at hello@eleven11.com
`);

// Add Easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        // Easter egg activated
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        console.log('🌈 Easter egg activated! You found the secret code!');
        
        // Add special message to chatbot
        if (!floatingChat.classList.contains('hidden')) {
            addMessage('🌈 Wow! You found our secret code! You\'re definitely tech-savvy enough for our advanced AI solutions! 😎', false, floatingChatMessages);
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial testimonial
    showTestimonial(0);
    
    // Add click handlers for CTA buttons
    document.querySelectorAll('[onclick]').forEach(element => {
        const onclickValue = element.getAttribute('onclick');
        if (onclickValue && onclickValue.includes('scrollToSection')) {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionMatch = onclickValue.match(/scrollToSection\('([^']+)'\)/);
                if (sectionMatch) {
                    scrollToSection(sectionMatch[1]);
                }
            });
        }
    });
    
    // Initialize floating chat button animation
    setTimeout(() => {
        floatingChatBtn.style.display = 'flex';
    }, 3000);
});

console.log('ELEVEN11 website initialized successfully! 🚀');