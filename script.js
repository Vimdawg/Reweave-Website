// Reweave - Interactive JavaScript with Batik-themed Enhancements
// Navy Blue & White Color Scheme with Indonesian Batik Elements

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeNavigation();
    initializeImpactCalculator();

    // Initialize charts only if canvases exist
    if (document.getElementById('costChart')) {
        initializeCostChart();
    }
    if (document.getElementById('revenueChart')) {
        initializeRevenueChart();
    }

    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeGeminiAPI();
    initializeBatikAnimations();
    initializeAccessibility();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuId = 'mobile-menu';
    const btnId = 'mobile-menu-button';

    const getMobileMenu = () => document.getElementById(mobileMenuId);
    const getMobileMenuButton = () => document.getElementById(btnId);

    function setMenuState(isOpen) {
        const menu = getMobileMenu();
        const btn = getMobileMenuButton();
        if (!menu || !btn) return;
        if (isOpen) {
            menu.classList.remove('hidden');
            btn.style.transform = 'rotate(90deg)';
            btn.setAttribute('aria-expanded', 'true');
        } else {
            menu.classList.add('hidden');
            btn.style.transform = 'rotate(0deg)';
            btn.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleMenu() {
        const menu = getMobileMenu();
        if (!menu) return;
        const isOpen = menu.classList.contains('hidden') === false;
        setMenuState(!isOpen);
    }

    // Event delegation for the hamburger button (survives DOM swaps)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest(`#${btnId}`);
        if (btn) {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Smooth scroll for navigation links and close menu on selection
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const menu = getMobileMenu();
                if (menu && !menu.classList.contains('hidden')) {
                    setMenuState(false);
                }
            }
        });
    });

    // Hide mobile menu if resizing to lg+ breakpoint
    window.addEventListener('resize', debounce(() => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            setMenuState(false);
        }
    }, 150));
}

// Impact calculator functionality
function initializeImpactCalculator() {
    const impactSlider = document.getElementById('cases-slider');
    const casesSoldValue = document.getElementById('cases-sold-value');
    const jeansUpcycled = document.getElementById('jeans-upcycled');
    const waterSaved = document.getElementById('water-saved');
    const paidToArtisans = document.getElementById('paid-to-artisans');

    if (impactSlider) {
        impactSlider.addEventListener('input', (event) => {
            const cases = parseInt(event.target.value);
            updateImpactMetrics(cases, casesSoldValue, jeansUpcycled, waterSaved, paidToArtisans);
            
            // Add batik animation effect
            animateMetricCards();
        });
    }
}

function updateImpactMetrics(cases, casesSoldValue, jeansUpcycled, waterSaved, paidToArtisans) {
    if (casesSoldValue) casesSoldValue.textContent = cases;
    if (jeansUpcycled) jeansUpcycled.textContent = cases;
    if (waterSaved) waterSaved.textContent = (cases * 1200).toLocaleString();
    if (paidToArtisans) paidToArtisans.textContent = (cases * 25).toLocaleString();
}

function animateMetricCards() {
    const metricCards = document.querySelectorAll('.batik-metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Chart initialization with batik-themed colors
function initializeCharts() {
    initializeCostChart();
    initializeRevenueChart();
}

function initializeCostChart() {
    const costCtx = document.getElementById('costChart');
    if (!costCtx) return;
    
    new Chart(costCtx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Artisan Pay', 'Materials', 'Profit & Reinvestment'],
            datasets: [{
                data: [40, 10, 50],
                backgroundColor: ['#1e3a8a', '#fbbf24', '#3b82f6'], // Navy, Batik Gold, Navy Light
                borderColor: '#ffffff',
                borderWidth: 4,
                hoverBackgroundColor: ['#1e40af', '#f59e0b', '#2563eb'],
                hoverBorderWidth: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        },
                        color: '#1e3a8a',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e3a8a',
                    titleColor: '#fef3c7',
                    bodyColor: '#ffffff',
                    borderColor: '#fbbf24',
                    borderWidth: 2,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function initializeRevenueChart() {
    const revenueCtx = document.getElementById('revenueChart');
    if (!revenueCtx) return;
    
    new Chart(revenueCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Direct Sales', '    Partnerships', 'Extensions'],
            datasets: [{
                label: 'Projected Revenue Share',
                data: [65, 25, 10],
                backgroundColor: ['#1e3a8a', '#fbbf24', '#3b82f6'], // Navy, Batik Gold, Navy Light
                borderColor: ['#1e40af', '#f59e0b', '#2563eb'],
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: ['#1e40af', '#f59e0b', '#2563eb']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e3a8a',
                    titleColor: '#fef3c7',
                    bodyColor: '#ffffff',
                    borderColor: '#fbbf24',
                    borderWidth: 2,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: '#fef3c7',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#1e3a8a',
                        font: {
                            family: 'Inter',
                            size: 11,
                            weight: '500'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#1e3a8a',
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.batik-card, .batik-metric-card, .batik-timeline-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('batik-fade-in');
                
                // Add staggered animation for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Intersection observer for navigation and timeline
function initializeIntersectionObserver() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update navigation
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-nav');
                    }
                });

                // Update timeline if in journey section
                if (id === 'journey') {
                    animateTimelineItems();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.batik-timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('batik-slide-in');
        }, index * 300);
    });
}

// Gemini API Integration
function initializeGeminiAPI() {
    const generateDenimStoryBtn = document.getElementById('generate-denim-story');
    const denimStoryOutput = document.getElementById('denim-story-output');
    const denimStoryLoading = document.getElementById('denim-story-loading');

    const generateImpactSummaryBtn = document.getElementById('generate-impact-summary');
    const impactSummaryOutput = document.getElementById('impact-summary-output');
    const impactSummaryLoading = document.getElementById('impact-summary-loading');

    if (generateDenimStoryBtn) {
        generateDenimStoryBtn.addEventListener('click', () => {
            const prompt = "Write a very short (2-3 sentences), imaginative, and inspiring story about a pair of denim jeans' journey before it was upcycled into a unique pickleball paddle case by artisans. Focus on its past life and transformation. Make it sound hopeful and unique.";
            callGeminiAPI(prompt, denimStoryOutput, denimStoryLoading);
        });
    }

    if (generateImpactSummaryBtn) {
        generateImpactSummaryBtn.addEventListener('click', () => {
            const casesSoldValue = document.getElementById('cases-sold-value');
            const jeansUpcycled = document.getElementById('jeans-upcycled');
            const waterSaved = document.getElementById('water-saved');
            const paidToArtisans = document.getElementById('paid-to-artisans');
            
            if (casesSoldValue && jeansUpcycled && waterSaved && paidToArtisans) {
                const cases = parseInt(casesSoldValue.textContent);
                const jeans = parseInt(jeansUpcycled.textContent);
                const water = parseInt(waterSaved.textContent.replace(/,/g, ''));
                const paid = parseInt(paidToArtisans.textContent.replace(/,/g, ''));

                const prompt = `Given that ${cases} Reweave pickleball cases have been sold, which means ${jeans} jeans were upcycled, ${water} liters of water were saved, and RM${paid} was paid to artisans, write a concise, inspiring statement (1-2 sentences) summarizing this combined social and environmental impact.`;
                callGeminiAPI(prompt, impactSummaryOutput, impactSummaryLoading);
            }
        });
    }
}

async function callGeminiAPI(prompt, outputElement, loadingElement) {
    if (!outputElement || !loadingElement) return;
    
    outputElement.textContent = '';
    loadingElement.classList.remove('hidden');
    loadingElement.classList.add('loading-pulse');

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    const apiKey = ""; // API key can be added here if needed
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    let retryCount = 0;
    const maxRetries = 5;
    let delay = 1000;

    while (retryCount < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 429) {
                    retryCount++;
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                    continue;
                } else {
                    throw new Error(`API error: ${response.statusText}`);
                }
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                
                // Animate text appearance
                outputElement.style.opacity = '0';
                outputElement.textContent = text;
                
                setTimeout(() => {
                    outputElement.style.transition = 'opacity 0.5s ease';
                    outputElement.style.opacity = '1';
                }, 100);
            } else {
                outputElement.textContent = "Could not generate content. Please try again.";
            }
            break;
        } catch (error) {
            outputElement.textContent = `Error: ${error.message}`;
            break;
        } finally {
            loadingElement.classList.add('hidden');
            loadingElement.classList.remove('loading-pulse');
        }
    }

    if (retryCount === maxRetries) {
        outputElement.textContent = "Failed to generate content after multiple retries. Please try again later.";
        loadingElement.classList.add('hidden');
        loadingElement.classList.remove('loading-pulse');
    }
}

// Batik-themed animations and interactions
function initializeBatikAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.batik-card, .batik-metric-card, .batik-testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.batik-button, .batik-button-white');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Initialize parallax scrolling for hero section
    initializeParallaxScrolling();
    
    // Floating ornaments animation disabled
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(251, 191, 36, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeParallaxScrolling() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroPattern = hero.querySelector('.batik-hero-pattern');
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${rate}px)`;
        }
    });
}

function initializeFloatingOrnaments() {
    const ornaments = document.querySelectorAll('.batik-ornament, .batik-ornament-small');
    
    ornaments.forEach((ornament, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index % 3);
        
        ornament.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    });
}

// Add CSS for animations that need to be defined in JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes float {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization for scroll events
window.addEventListener('scroll', throttle(() => {
    // Handle scroll-based animations here if needed
}, 16)); // ~60fps

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize accessibility features
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators for keyboard users
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            if (document.body.classList.contains('keyboard-navigation')) {
                element.style.outline = '2px solid #fbbf24';
                element.style.outlineOffset = '2px';
            }
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Export functions for potential external use
window.ReweaveApp = {
    updateImpactMetrics,
    animateMetricCards,
    createRippleEffect,
    callGeminiAPI
};

// Authentication System
class AuthSystem {
    constructor() {
        // Initialize Supabase client from meta tags
        const url = document.querySelector('meta[name="supabase-url"]')?.content;
        const anonKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;

        if (!url || !anonKey) {
            console.error('Supabase configuration missing: set meta[name="supabase-url"] and meta[name="supabase-anon-key"] in index.html');
            this.supabase = null;
        } else {
            this.supabase = supabase.createClient(url, anonKey);
            // Keep UI in sync with auth changes (across tabs/windows too)
            this.supabase.auth.onAuthStateChange((_event, session) => {
                this.currentUser = session?.user || null;
                this.updateUI();
            });
        }

        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
    }

    bindEvents() {
        // Modal triggers (desktop)
        document.getElementById('login-btn')?.addEventListener('click', () => this.openLoginModal());
        document.getElementById('signup-btn')?.addEventListener('click', () => this.openSignupModal());

        // Modal close buttons
        document.getElementById('close-login-modal')?.addEventListener('click', () => this.closeModal('login-modal'));
        document.getElementById('close-signup-modal')?.addEventListener('click', () => this.closeModal('signup-modal'));

        // Switch between modals
        document.getElementById('switch-to-signup')?.addEventListener('click', () => this.switchToSignup());
        document.getElementById('switch-to-login')?.addEventListener('click', () => this.switchToLogin());

        // Form submissions
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signup-form')?.addEventListener('submit', (e) => this.handleSignup(e));

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target.id);
            }
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openLoginModal() {
        document.getElementById('login-modal')?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    openSignupModal() {
        document.getElementById('signup-modal')?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.clearFormErrors();
    }

    closeAllModals() {
        this.closeModal('login-modal');
        this.closeModal('signup-modal');
    }

    switchToSignup() {
        this.closeModal('login-modal');
        this.openSignupModal();
    }

    switchToLogin() {
        this.closeModal('signup-modal');
        this.openLoginModal();
    }

    async handleSignup(e) {
        e.preventDefault();

        if (!this.supabase) {
            this.showError('signup-form-error', 'Authentication is not configured. Please try again later.');
            return;
        }

        this.setLoadingState('signup-form', true);

        const formData = new FormData(e.target);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const termsAccepted = document.getElementById('terms-checkbox')?.checked;

        const validation = this.validateSignupForm(name, email, password, confirmPassword, termsAccepted);
        if (!validation) {
            this.setLoadingState('signup-form', false);
            return;
        }

        try {
            // Sign up with Supabase Auth
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                throw error;
            }

            // Show success message for email verification
            this.showSuccessMessage(
                'Account created successfully! Please check your email to verify your account before signing in.'
            );
            this.closeAllModals();
            
        } catch (error) {
            console.error('Signup error:', error);
            this.showError('signup-form-error', error.message || 'Failed to create account. Please try again.');
        } finally {
            this.setLoadingState('signup-form', false);
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        this.clearFormErrors();

        if (!this.supabase) {
            this.showError('login-form-error', 'Authentication is not configured. Please try again later.');
            return;
        }
        this.setLoadingState('login-form', true);

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password');

        const validation = this.validateLoginForm(email, password);
        if (!validation) {
            this.setLoadingState('login-form', false);
            return;
        }

        try {
            // Sign in with Supabase Auth
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                throw error;
            }

            // Check if email is verified
            if (!data.user.email_confirmed_at) {
                this.showError('login-form-error', 'Please verify your email before signing in. Check your inbox for the verification link.');
                return;
            }

            // After login
            this.currentUser = data.user;
            this.showSuccessMessage('Welcome back! You have been successfully logged in.');
            this.closeAllModals();
            this.updateUI();
            
        } catch (error) {
            console.error('Login error:', error);
            this.showError('login-form-error', error.message || 'Invalid email or password.');
        } finally {
            this.setLoadingState('login-form', false);
        }
    }

    async logout() {
        if (!this.supabase) {
            console.warn('Supabase not configured; cannot logout.');
            return;
        }
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;

            this.currentUser = null;
            this.updateUI();
            this.showSuccessMessage('You have been successfully logged out.');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    async checkLoginStatus() {
        if (!this.supabase) {
            console.warn('Supabase not configured; skipping login status check.');
            return;
        }
        try {
            const { data: { user } } = await this.supabase.auth.getUser();
            this.currentUser = user;
            this.updateUI();
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    validateLoginForm(email, password) {
        let isValid = true;

        if (!email) {
            this.showError('login-email-error', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('login-email-error', 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            this.showError('login-password-error', 'Password is required');
            isValid = false;
        }

        return isValid;
    }

    validateSignupForm(name, email, password, confirmPassword, termsAccepted) {
        let isValid = true;

        if (!name || name.trim().length < 2) {
            this.showError('signup-name-error', 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email) {
            this.showError('signup-email-error', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(email)) {
            this.showError('signup-email-error', 'Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            this.showError('signup-password-error', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showError('signup-password-error', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (password !== confirmPassword) {
            this.showError('signup-confirm-password-error', 'Passwords do not match');
            isValid = false;
        }

        if (!termsAccepted) {
            this.showError('terms-error', 'You must accept the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (!errorElement) return;
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('[id$="-error"]');
        errorElements.forEach(element => {
            element.classList.add('hidden');
            element.textContent = '';
        });

        const inputElements = document.querySelectorAll('input');
        inputElements.forEach(input => {
            input.classList.remove('error', 'success');
        });
    }

    setLoadingState(formId, isLoading) {
        const form = document.getElementById(formId);
        if (!form) return;
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        if (isLoading) {
            form.classList.add('loading');
            submitButton.textContent = 'Please wait...';
            submitButton.disabled = true;
        } else {
            form.classList.remove('loading');
            submitButton.textContent = formId === 'login-form' ? 'Sign In' : 'Create Account';
            submitButton.disabled = false;
        }
    }

    async simulateApiCall() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    updateUI() {
        // Only update the DESKTOP auth sub-container to avoid removing the mobile menu button
        const authSection = document.querySelector('.flex.items-center.space-x-4');
        if (!authSection) return;

        // This is the "hidden md:flex items-center space-x-3" div inside the authSection
        const desktopAuth = authSection.querySelector('.hidden.md\\:flex.items-center.space-x-3');
        if (!desktopAuth) return;

        if (this.currentUser) {
            // Compute a friendly display name
            const meta = this.currentUser.user_metadata || {};
            let displayName =
                (meta.full_name || meta.name || meta.first_name || '').toString().trim();

            if (displayName) {
                displayName = displayName.split(/\s+/)[0];
            } else if (this.currentUser.email) {
                displayName = this.currentUser.email.split('@')[0];
            } else {
                displayName = 'there';
            }

            desktopAuth.innerHTML = `
                <div class="hidden md:flex items-center space-x-3 user-menu">
                    <span class="text-navy text-sm">Welcome, ${displayName}</span>
                    <div class="relative">
                        <button id="user-menu-btn" class="bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wider transition-colors duration-300">
                            Account
                        </button>
                        <div id="user-dropdown" class="user-dropdown hidden absolute right-0 mt-2 bg-white border border-navy/10 rounded-lg shadow-lg z-50">
                            <a href="#" id="profile-link" class="block px-4 py-2 text-sm text-navy hover:bg-batik-cream/30">Profile</a>
                            <a href="#" id="settings-link" class="block px-4 py-2 text-sm text-navy hover:bg-batik-cream/30">Settings</a>
                            <a href="#" id="logout-link" class="block px-4 py-2 text-sm text-navy hover:bg-batik-cream/30">Logout</a>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('user-menu-btn')?.addEventListener('click', this.toggleUserDropdown.bind(this));
            document.getElementById('logout-link')?.addEventListener('click', (e) => { e.preventDefault(); this.logout(); });
        } else {
            desktopAuth.innerHTML = `
                <div class="hidden md:flex items-center space-x-3">
                    <button id="login-btn" class="text-navy hover:text-batik-gold transition-colors duration-300 text-sm font-medium tracking-wider">
                        Login
                    </button>
                    <button id="signup-btn" class="bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg text-sm font-medium tracking-wider transition-colors duration-300">
                        Sign Up
                    </button>
                </div>
            `;
            // Re-attach click handlers to the newly inserted buttons
            document.getElementById('login-btn')?.addEventListener('click', () => this.openLoginModal());
            document.getElementById('signup-btn')?.addEventListener('click', () => this.openSignupModal());
        }
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        dropdown?.classList.toggle('hidden');
    }

    showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize authentication system
const auth = new AuthSystem();