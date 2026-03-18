// ===== MENU MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Alternar ícone do menu
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== DESTACAR LINK ATIVO NO SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// ===== SCROLL SUAVE PARA LINKS ÂNCORA =====
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

// ===== HEADER COM SOMBRA AO SCROLL =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        header.style.backgroundColor = 'var(--white-color)';
        header.style.backdropFilter = 'none';
    }
});

// ===== ANIMAÇÃO DE NÚMEROS (COUNTER) =====
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const target = parseInt(number.innerText);
        let current = 0;
        const increment = target / 50; // Dividir em 50 passos
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.innerText = target + '+';
                clearInterval(timer);
            } else {
                number.innerText = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Disparar animação quando a seção "Sobre" estiver visível
const aboutSection = document.querySelector('#sobre');
let animated = false;

window.addEventListener('scroll', () => {
    if (!animated && aboutSection) {
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.clientHeight;
        
        if (window.scrollY > (sectionTop - window.innerHeight + sectionHeight / 2)) {
            animateNumbers();
            animated = true;
        }
    }
});

// ===== VALIDAÇÃO SIMPLES DE FORMULÁRIO =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação simples
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const assunto = document.getElementById('assunto');
        const mensagem = document.getElementById('mensagem');
        
        if (!nome.value || !email.value || !assunto.value || !mensagem.value) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (!email.value.includes('@') || !email.value.includes('.')) {
            alert('Por favor, insira um e-mail válido!');
            return;
        }
        
        // Simular envio (aqui você pode integrar com um backend real)
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        contactForm.reset();
    });
}

// ===== NEWSLETTER =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input');
        
        if (!email.value.includes('@') || !email.value.includes('.')) {
            alert('Por favor, insira um e-mail válido!');
            return;
        }
        
        alert('Inscrição realizada com sucesso! Obrigado por assinar nossa newsletter.');
        email.value = '';
    });
}

// ===== EFEITO DE CARREGAMENTO DOS CARDS (OPCIONAL) =====
const serviceCards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});