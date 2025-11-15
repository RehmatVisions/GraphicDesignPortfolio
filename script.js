// ============================================
// NAVIGATION - EXPERT IMPLEMENTATION
// ============================================

(function() {
    'use strict';
    
    // Get DOM elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Toggle mobile menu
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Update ARIA
        navToggle.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }
    
    // Close mobile menu
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }
    
    // Hamburger click
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    
    // Overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    console.log('✅ Navigation initialized successfully');
    
})();

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.fact-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-section')) {
                animateCounters();
            }
            if (entry.target.classList.contains('skills-section')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Scroll Animation Observer for Cards
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Skills Animation
function animateSkills() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    
    circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (percent / 100) * circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const viewProjectButtons = document.querySelectorAll('.view-project');

const projectData = {
    1: {
        title: 'High-Rise Apartment Poster - DevelopersHub Corp',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.21_8c5a0150.jpg',
        description: 'Showcasing modern high-rise apartments with elegant design, smart space planning, and urban living. Designed on Canva with a clean modern layout, highlighting premium apartments through balanced composition and professional real estate aesthetic. A sleek design showcasing luxury apartments with modern graphics, smooth alignment, and polished real-estate look. Clean layouts, premium visuals, professional presentation—perfect for real estate marketing.',
        tools: ['Canva', 'Photoshop', 'Real Estate Design'],
        link: 'https://www.behance.net/tahirasani'
    },
    2: {
        title: 'Creative Graphic Design',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.21_f8e04233.jpg',
        description: 'Modern visual design combining innovative concepts with clean aesthetics. Focused on delivering impactful messaging through strategic use of color, composition, and typography.',
        tools: ['Photoshop', 'Illustrator', 'Figma'],
        link: 'https://www.behance.net/tahirasani'
    },
    3: {
        title: 'Custom Illustration Work',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_0a1f971c.jpg',
        description: 'Unique custom illustrations crafted with attention to detail and artistic flair. Designed to bring creative concepts to life with vibrant colors and engaging visual storytelling.',
        tools: ['Illustrator', 'Photoshop', 'Procreate'],
        link: 'https://www.behance.net/tahirasani'
    },
    4: {
        title: 'Professional Logo Design',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_0cf71a63.jpg',
        description: 'Memorable logo design that captures brand essence and creates lasting impressions. Developed through careful research, conceptualization, and refinement to ensure perfect brand representation.',
        tools: ['Illustrator', 'Photoshop'],
        link: 'https://www.behance.net/tahirasani'
    },
    5: {
        title: 'Visual Design Concept',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_54b0013c.jpg',
        description: 'Innovative visual design concept showcasing creative problem-solving and aesthetic excellence. Combines strategic thinking with artistic execution to deliver compelling visual solutions.',
        tools: ['Photoshop', 'Illustrator', 'After Effects'],
        link: 'https://www.behance.net/tahirasani'
    },
    6: {
        title: 'Digital Art & Illustration',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_5588c2f5.jpg',
        description: 'Artistic digital illustration featuring rich details and creative composition. Designed to engage audiences through visual storytelling and emotional connection.',
        tools: ['Photoshop', 'Illustrator', 'Procreate'],
        link: 'https://www.behance.net/tahirasani'
    },
    7: {
        title: 'Complete Brand Package',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_999bf035.jpg',
        description: 'Comprehensive brand identity package including logo variations, color palettes, typography guidelines, and brand applications. Ensures consistent brand presence across all touchpoints.',
        tools: ['Illustrator', 'Photoshop', 'InDesign'],
        link: 'https://www.behance.net/tahirasani'
    },
    8: {
        title: 'Innovative Design Solution',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.24_aad18cda.jpg',
        description: 'Creative design solution addressing specific client needs with innovative approaches. Balances aesthetic appeal with functional requirements to deliver exceptional results.',
        tools: ['Figma', 'Photoshop', 'Illustrator'],
        link: 'https://www.behance.net/tahirasani'
    },
    9: {
        title: 'Illustration Series',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.25_b18a81a8.jpg',
        description: 'Cohesive illustration series maintaining consistent style and theme throughout. Perfect for editorial content, marketing materials, and brand storytelling.',
        tools: ['Illustrator', 'Photoshop', 'Procreate'],
        link: 'https://www.behance.net/tahirasani'
    },
    10: {
        title: 'Professional Branding',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.25_df2d6b4a.jpg',
        description: 'Strategic branding design that communicates brand values and differentiates from competitors. Developed through market research and creative exploration.',
        tools: ['Illustrator', 'Photoshop', 'InDesign'],
        link: 'https://www.behance.net/tahirasani'
    },
    11: {
        title: 'Creative Design Approach',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.25_fd823752.jpg',
        description: 'Unique design approach combining creativity with strategic thinking. Delivers visually stunning results that effectively communicate intended messages.',
        tools: ['Photoshop', 'Illustrator', 'Figma'],
        link: 'https://www.behance.net/tahirasani'
    },
    12: {
        title: 'Custom Artwork Design',
        image: 'assets/WhatsApp Image 2025-11-15 at 17.51.27_69928640.jpg',
        description: 'Bespoke artwork design tailored to specific project requirements. Features original concepts, refined execution, and attention to every detail.',
        tools: ['Illustrator', 'Photoshop', 'Procreate'],
        link: 'https://www.behance.net/tahirasani'
    }
};

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalDescription').textContent = project.description;
        
        const toolsContainer = document.querySelector('.modal-tools');
        toolsContainer.innerHTML = project.tools.map(tool => 
            `<span class="tool-tag">${tool}</span>`
        ).join('');
        
        document.querySelector('.modal-link').href = project.link;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

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

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showTestimonial(index) {
    testimonials.forEach(card => card.classList.remove('active'));
    testimonials[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-slide testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Form validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Create WhatsApp message
    const whatsappNumber = '923224778268'; // Tahira's WhatsApp number
    let whatsappMessage = `*New Portfolio Contact*%0A%0A`;
    whatsappMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
    whatsappMessage += `*Email:* ${encodeURIComponent(email)}%0A`;
    if (phone) {
        whatsappMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    }
    whatsappMessage += `%0A*Message:*%0A${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Success feedback
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Opening WhatsApp...</span> <i class="fab fa-whatsapp fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        showNotification('WhatsApp opened! Send your message there.', 'success');
    }, 2000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(255, 105, 180, 0.3)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(255, 105, 180, 0.2)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    setTimeout(() => {
        if (heroTitle) heroTitle.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.opacity = '1';
    }, 300);
    
    setTimeout(() => {
        if (ctaButton) ctaButton.style.opacity = '1';
    }, 500);
});

// Add hover sound effect (optional)
document.querySelectorAll('button, .nav-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
});

// Cursor trail effect (optional enhancement)
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

console.log('Portfolio website loaded successfully! 🎨✨');

// Observe certification cards
document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});

// Observe education items
document.querySelectorAll('.education-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(item);
});

// Observe experience items
document.querySelectorAll('.experience-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
    scrollObserver.observe(item);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    scrollObserver.observe(card);
});

// Service Card 3D Tilt Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-15px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0) rotateY(0)';
    });
});

console.log('Services section loaded! 🎨');

// Achievement Modal
const achievementModal = document.getElementById('achievementModal');
const achievementImage = document.getElementById('achievementImage');
const achievementModalClose = document.querySelector('.achievement-modal-close');
const viewAchievementButtons = document.querySelectorAll('.view-achievement');

viewAchievementButtons.forEach(button => {
    button.addEventListener('click', () => {
        const imageSrc = button.getAttribute('data-image');
        achievementImage.src = imageSrc;
        achievementModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (achievementModalClose) {
    achievementModalClose.addEventListener('click', () => {
        achievementModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (achievementModal) {
    achievementModal.addEventListener('click', (e) => {
        if (e.target === achievementModal) {
            achievementModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    if (typeof scrollObserver !== 'undefined') {
        scrollObserver.observe(card);
    }
});

console.log('Achievements section loaded! 🏆');

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Portfolio initialized successfully!');
    
    // Force initial visibility check for all animated elements
    setTimeout(() => {
        const allAnimatedElements = document.querySelectorAll('[data-aos]');
        allAnimatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                element.classList.add('aos-animate');
            }
        });
    }, 100);
    
    // Ensure all sections are visible
    const sections = ['services', 'certifications', 'experience', 'education'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`✅ ${sectionId} section loaded`);
        } else {
            console.warn(`⚠️ ${sectionId} section not found`);
        }
    });
});

// Smooth scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    console.log('🚀 All resources loaded!');
});
