// Initialize Three.js scene
let scene, camera, renderer, particles;
const particleCount = 1000;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        colors[i] = Math.random();
        colors[i + 1] = Math.random();
        colors[i + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

// Initialize GSAP animations
function initGSAP() {
    // Hero section animations
    gsap.from('.hero-section h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.hero-section h2', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out'
    });

    gsap.from('.hero-section p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power4.out'
    });

    gsap.from('.social-links', {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 0.9,
        ease: 'power4.out'
    });

    // Scroll animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power4.out'
        });
    });

    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            width: width,
            ease: 'power4.out'
        });
    });
}

// Smooth scrolling for navbar links
const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80; // adjust for navbar height
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    
    this.appendChild(successMessage);
    this.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    initSkillBars();
});

// Add scroll-based navbar background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.9)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
}); 