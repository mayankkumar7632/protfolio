// ===========================
// LOADER
// ===========================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});

// ===========================
// CURSOR FOLLOWER
// ===========================
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (cursorFollower) {
    if (!isFinePointer || window.innerWidth <= 768) {
        cursorFollower.style.display = 'none';
    } else {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
}

// ===========================
// PARTICLES
// ===========================
const particlesContainer = document.getElementById('particles');
function createParticles() {
    if (!particlesContainer) return;
    const count = window.innerWidth <= 768 ? 20 : 45;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 3 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.35 + 0.1;
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// ===========================
// TYPED TEXT EFFECT
// ===========================
const titles = ['Web Developer', 'CS Postgraduate', 'Tech Enthusiast', 'Lifelong Learner'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextEl = document.getElementById('typedText');

function typeEffect() {
    if (!typedTextEl) return;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 450;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// ===========================
// NAVBAR & MOBILE MENU
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileBackdrop = document.getElementById('mobileBackdrop');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function openMobileMenu() {
    if (hamburger) hamburger.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
}

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on nav link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// SCROLL REVEAL & STAT COUNTERS & SKILLS (OBSERVER + FALLBACK)
// ===========================
function startCounter(counter) {
    if (counter.classList.contains('counted')) return;
    counter.classList.add('counted');
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 35);
}

function revealOnScroll() {
    const elements = document.querySelectorAll('[data-animation]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const delay = el.getAttribute('data-delay') || 0;

        if (rect.top < windowHeight - 40) {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, parseInt(delay));
        }
    });
}

function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
            startCounter(counter);
        }
    });
}

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, parseInt(delay));
                observer.unobserve(el);
            }
        });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    document.querySelectorAll('[data-animation]').forEach(el => revealObserver.observe(el));

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-fill').forEach(fill => skillObserver.observe(fill));

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.stat-number').forEach(counter => counterObserver.observe(counter));
} else {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
}

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Create toast notification
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = '<i class="fas fa-check-circle" style="color: #10B981; margin-right: 8px;"></i> Message sent successfully! (Demo mode)';
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3400);

        contactForm.reset();
    });
}

// ===========================
// BACK TO TOP
// ===========================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===========================
// 3D TILT EFFECT ON CARDS (DESKTOP FINE POINTER ONLY)
// ===========================
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.skill-card, .cert-card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 22;
            const rotateY = (centerX - x) / 22;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
