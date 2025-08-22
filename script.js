


// ELEVEN11 Agency Website - Optimized JavaScript

// Configuration
const CONFIG = {
    emailJS: {
        publicKey: "IvcVSYN_406ZMvYDu",
        serviceID: "service_u129byc", 
        templateID: "template_j33cneb"
    },
    timing: {
        loadingScreen: 2000,
        scrollDebounce: 10,
        testimonialRotate: 5000,
        chatAutoShow: 10000
    }
};

// DOM Cache - Initialize once, reuse everywhere
const DOM = {};
let isInitialized = false;

// Initialize DOM cache
function initDOMCache() {
    if (isInitialized) return;
    
    DOM.loadingScreen = document.getElementById('loading-screen');
    DOM.navbar = document.getElementById('navbar');
    DOM.navToggle = document.getElementById('nav-toggle');
    DOM.navMenu = document.getElementById('nav-menu');
    DOM.backToTopBtn = document.getElementById('back-to-top');
    DOM.contactForm = document.getElementById('contact-form');
    DOM.formMessage = document.getElementById('form-message');
    DOM.floatingChatBtn = document.getElementById('floating-chat-btn');
    DOM.floatingChat = document.getElementById('floating-chat');
    DOM.closeChatBtn = document.getElementById('close-chat');
    DOM.testimonials = document.querySelectorAll('.testimonial-card');
    DOM.testimonialDots = document.querySelectorAll('.nav-dot');
    
    isInitialized = true;
}

// Utility Functions
const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    
    showMessage: (element, message, type, duration = 5000) => {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('hidden'), duration);
    }
};

// Loading Screen Handler
class LoadingScreen {
    static init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (DOM.loadingScreen) {
                    DOM.loadingScreen.classList.add('hidden');
                    document.body.style.overflow = 'visible';
                }
                ParticleSystem.init();
                ScrollAnimations.init();
            }, CONFIG.timing.loadingScreen);
        });
    }
}

// Optimized Particle System
class ParticleSystem {
    static particles = [];
    static container = null;
    
    static init() {
        this.container = document.getElementById('particles');
        if (!this.container) return;
        
        // Reduce particle count for performance
        const particleCount = window.innerWidth < 768 ? 20 : 30;
        this.createParticles(particleCount);
    }
    
    static createParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 6}s;
                animation-duration: ${Math.random() * 3 + 3}s;
            `;
            this.container.appendChild(particle);
        }
    }
}

// Navigation Handler
class Navigation {
    static isMenuOpen = false;
    
    static init() {
        if (!DOM.navToggle || !DOM.navMenu) return;
        
        DOM.navToggle.addEventListener('click', this.toggleMenu);
        
        // Close menu on link click
        DOM.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.closeMenu);
        });
        
        // Scroll effects - debounced
        window.addEventListener('scroll', utils.debounce(this.handleScroll, CONFIG.timing.scrollDebounce));
    }
    
    static toggleMenu = () => {
        DOM.navMenu.classList.toggle('active');
        DOM.navToggle.classList.toggle('active');
        this.isMenuOpen = !this.isMenuOpen;
    }
    
    static closeMenu = () => {
        DOM.navMenu.classList.remove('active');
        DOM.navToggle.classList.remove('active');
        this.isMenuOpen = false;
    }
    
    static handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 100) {
            DOM.navbar?.classList.add('scrolled');
        } else {
            DOM.navbar?.classList.remove('scrolled');
        }
        
        // Back to top button
        if (DOM.backToTopBtn) {
            if (scrollY > 500) {
                DOM.backToTopBtn.classList.remove('hidden');
            } else {
                DOM.backToTopBtn.classList.add('hidden');
            }
        }
    }
}

// Optimized Scroll Animations
class ScrollAnimations {
    static observer = null;
    
    static init() {
        if (!('IntersectionObserver' in window)) return; // Graceful degradation
        
        this.observer = new IntersectionObserver(this.handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements
        const elements = document.querySelectorAll(`
            .usp-grid, .services-grid, .process-steps, .pricing-grid,
            .testimonials-slider, .contact-content, .usp-card,
            .service-card, .process-step, .pricing-card
        `);
        
        elements.forEach(el => this.observer.observe(el));
    }
    
    static handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Staggered animations for grids
                if (entry.target.classList.contains('animate-stagger')) {
                    const children = Array.from(entry.target.children);
                    children.forEach((child, index) => {
                        setTimeout(() => child.classList.add('animate-in'), index * 100);
                    });
                }
                
                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Chatbot System
class ChatbotSystem {
    static responses = new Map([
        ['hello', 'Hello! Welcome to ELEVEN11. How can I help you with AI automation today?'],
        ['hi', 'Hi there! I\'m here to help you learn about our AI chatbot solutions. What would you like to know?'],
        ['services', 'We offer AI Chatbots for E-Commerce, Cart Recovery Bots, AI Customer Support, and Sales Automation. Which one interests you most?'],
        ['pricing', 'We have three plans: Starter ($99 setup), Growth ($199 setup + $49/mo), and Pro (custom pricing). Which plan would work best for your business?'],
        ['chatbot', 'Our AI chatbots can automate FAQs, recommend products, and engage customers 24/7. They typically increase sales by 15-30%. Would you like to know more?'],
        ['demo', 'This is a live demo of our AI technology! In a real implementation, it would be connected to your product catalog and business data. Pretty cool, right?'],
        ['help', 'I can help you with information about our services, pricing, setup process, or answer any questions about AI automation. What would you like to know?']
    ]);
    
    static init() {
        // Demo chatbot
        const demoInput = document.getElementById('chat-input');
        const demoSendBtn = document.getElementById('send-button');
        const demoMessages = document.getElementById('chatbot-messages');
        
        if (demoSendBtn && demoInput) {
            demoSendBtn.addEventListener('click', () => this.sendMessage(demoInput, demoMessages));
            demoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage(demoInput, demoMessages);
            });
        }
        
        // Floating chatbot
        const floatingInput = document.getElementById('floating-chat-input');
        const floatingSendBtn = document.getElementById('floating-send-button');
        const floatingMessages = document.getElementById('floating-chat-messages');
        
        if (floatingSendBtn && floatingInput) {
            floatingSendBtn.addEventListener('click', () => this.sendMessage(floatingInput, floatingMessages));
            floatingInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage(floatingInput, floatingMessages);
            });
        }
    }
    
    static sendMessage(inputElement, messagesContainer) {
        if (!inputElement || !messagesContainer) return;
        
        const message = inputElement.value.trim();
        if (!message) return;
        
        this.addMessage(message, true, messagesContainer);
        inputElement.value = '';
        
        // Bot response with delay
        setTimeout(() => {
            const response = this.getBotResponse(message);
            this.addMessage(response, false, messagesContainer);
        }, 1000);
    }
    
    static addMessage(content, isUser, container) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-content"><p>${content}</p></div>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }
    
    static getBotResponse(message) {
        const normalizedMessage = message.toLowerCase().trim();
        for (const [keyword, response] of this.responses) {
            if (normalizedMessage.includes(keyword)) {
                return response;
            }
        }
        return 'That\'s a great question! Our AI solutions are designed to boost your sales and automate customer support. Would you like to book a free demo to see how we can help your specific business?';
    }
}

// Floating Chat Handler
class FloatingChat {
    static init() {
        if (!DOM.floatingChatBtn || !DOM.floatingChat || !DOM.closeChatBtn) return;
        
        DOM.floatingChatBtn.addEventListener('click', this.open);
        DOM.closeChatBtn.addEventListener('click', this.close);
        
        // Auto-show after delay
        setTimeout(() => {
            if (DOM.floatingChat?.classList.contains('hidden')) {
                DOM.floatingChatBtn.style.animation = 'bounce 1s ease-in-out 3';
                setTimeout(() => DOM.floatingChatBtn.style.animation = '', 3000);
            }
        }, CONFIG.timing.chatAutoShow);
    }
    
    static open = () => {
        DOM.floatingChat.classList.remove('hidden');
        DOM.floatingChatBtn.style.display = 'none';
        
        // Add welcome message if empty
        const messages = document.getElementById('floating-chat-messages');
        if (messages && messages.children.length <= 1) {
            setTimeout(() => {
                ChatbotSystem.addMessage('Welcome! 👋 I can help you learn about our AI automation services. What would you like to know?', false, messages);
            }, 500);
        }
        
        // Focus input
        setTimeout(() => {
            document.getElementById('floating-chat-input')?.focus();
        }, 300);
    }
    
    static close = () => {
        DOM.floatingChat.classList.add('hidden');
        DOM.floatingChatBtn.style.display = 'flex';
    }
}

// Testimonials Handler
class TestimonialSlider {
    static currentIndex = 0;
    
    static init() {
        if (!DOM.testimonials.length) return;
        
        this.show(0);
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % DOM.testimonials.length;
            this.show(this.currentIndex);
        }, CONFIG.timing.testimonialRotate);
        
        // Make globally accessible
        window.showTestimonial = (index) => this.show(index);
    }
    
    static show(index) {
        DOM.testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        DOM.testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

// Contact Form Handler
class ContactForm {
    static init() {
        if (!DOM.contactForm) return;
        
        // Lazy load EmailJS
        this.loadEmailJS().then(() => {
            DOM.contactForm.addEventListener('submit', this.handleSubmit);
        });
    }
    
    static async loadEmailJS() {
        if (window.emailjs) return;
        
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(CONFIG.emailJS.publicKey);
                resolve();
            };
            document.head.appendChild(script);
        });
    }
    
    static handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(DOM.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not provided',
            message: formData.get('message') || 'Demo request'
        };
        
        // Validation
        if (!data.name || !data.email) {
            utils.showMessage(DOM.formMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        if (!utils.isValidEmail(data.email)) {
            utils.showMessage(DOM.formMessage, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Submit form
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            await emailjs.send(CONFIG.emailJS.serviceID, CONFIG.emailJS.templateID, {
                from_name: data.name,
                from_email: data.email,
                company: data.company,
                message: data.message,
                to_email: 'elevenagencydm11@gmail.com'
            });
            
            utils.showMessage(DOM.formMessage, 'Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            DOM.contactForm.reset();
        } catch (error) {
            utils.showMessage(DOM.formMessage, 'Thank you for your interest! We\'ll contact you soon.', 'success');
            DOM.contactForm.reset();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
}

// Smooth Scrolling Handler
class SmoothScroll {
    static init() {
        // Handle anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            this.scrollToSection(targetId);
        });
        
        // Back to top button
        if (DOM.backToTopBtn) {
            DOM.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Make globally accessible
        window.scrollToSection = this.scrollToSection;
        window.openFloatingChat = FloatingChat.open;
    }
    
    static scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}

// Performance Optimizations
class PerformanceOptimizations {
    static init() {
        // Add CSS for animations
        this.addAnimationStyles();
        
        // Remove will-change after animations
        document.addEventListener('animationend', (e) => {
            e.target.style.willChange = 'auto';
        });
        
        // Add grid stagger classes
        document.querySelectorAll('.usp-grid, .services-grid, .pricing-grid').forEach(container => {
            container.classList.add('animate-stagger');
        });
    }
    
    static addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .usp-card, .service-card, .process-step, .pricing-card, .testimonial-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, opacity;
            }
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .animate-stagger > * {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform, opacity;
            }
            .animate-stagger > .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Main Application
class App {
    static async init() {
        // Initialize DOM cache first
        initDOMCache();
        
        // Initialize all systems
        LoadingScreen.init();
        Navigation.init();
        SmoothScroll.init();
        FloatingChat.init();
        TestimonialSlider.init();
        ChatbotSystem.init();
        ContactForm.init();
        PerformanceOptimizations.init();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
