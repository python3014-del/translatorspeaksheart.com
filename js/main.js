// ===== 译手言心网站脚本 =====

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileMenu();
    initScrollAnimations();
    initNavigationHighlight();
    initSmoothScroll();
});

// ===== 移动端菜单 =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
}

// ===== 导航高亮 =====
function initNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== 数字动画 =====
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== 导航卡片点击效果 =====
function addCardClickEffect() {
    document.querySelectorAll('.nav-card, .team-card, .tech-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(0, 212, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 添加涟漪动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== 页面加载完成 =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    addCardClickEffect();
    
    // 为数据卡片添加动画
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ===== 滚动时导航栏变化 =====
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 22, 40, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 22, 40, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== 鼠标跟随光效 =====
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.glass-card, .nav-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.15), transparent 50%)`;
        }
    });
});

// ===== 导出函数供外部使用 =====
window.YiShouYanXin = {
    animateNumber: animateNumber,
    addCardClickEffect: addCardClickEffect
};
