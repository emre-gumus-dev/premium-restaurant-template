/* ================================================================
   KÖZDE PİDE — ANA JAVASCRIPT DOSYASI
   ================================================================ */

(function () {
    'use strict';

    /* ============== DOM YÜKLENDİĞİNDE BAŞLAT ============== */
    document.addEventListener('DOMContentLoaded', () => {
        initLoader();
        createParticles();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        initScrollReveal();
        initCounters();
        initMenuFilter();
        initAddToCart();
        initFAQ();
        initContactForm();
        initDateInput();
        initToTop();
        initGallery();
        initActiveNav();
        initKeyboard();
        
        console.log('🔥 Közde Pide — 1978\'den beri lezzet!');
    });

    /* ============== YÜKLEME EKRANI ============== */
    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                // Loader kalktıktan sonra body scroll'u serbest bırak
                document.body.style.overflow = '';
            }, 1200);
        });

        // Sayfa yüklenene kadar scroll'u kilitle
        document.body.style.overflow = 'hidden';
    }

    /* ============== KOR PARÇACIKLARI ============== */
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = window.innerWidth < 768 ? 15 : 25;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            
            const size = 3 + Math.random() * 5;
            const left = Math.random() * 100;
            const duration = 8 + Math.random() * 10;
            const delay = Math.random() * 10;
            const drift = (Math.random() * 200 - 100);

            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
            `;
            
            fragment.appendChild(p);
        }

        container.appendChild(fragment);
    }

    /* ============== NAVBAR SCROLL ============== */
    function initNavbar() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        let lastScroll = 0;
        let ticking = false;

        function updateNavbar() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            lastScroll = scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ============== MOBİL MENÜ ============== */
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileOverlay');
        const close = document.getElementById('mobileClose');

        if (!toggle || !menu || !overlay) return;

        function openMenu() {
            menu.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
            toggle.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            menu.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            toggle.setAttribute('aria-expanded', 'false');
        }

        toggle.addEventListener('click', openMenu);
        overlay.addEventListener('click', closeMenu);
        if (close) close.addEventListener('click', closeMenu);

        // Menü linklerine tıklanınca kapat
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ============== SMOOTH SCROLL ============== */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href === '') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const navHeight = document.getElementById('nav')?.offsetHeight || 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ============== SCROLL REVEAL ============== */
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    /* ============== SAYAÇ ANİMASYONU ============== */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-num[data-target]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const steps = 40;
        const stepTime = duration / steps;
        
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    /* ============== MENÜ FİLTRELEME ============== */
    function initMenuFilter() {
        const tabs = document.querySelectorAll('.tab-btn');
        const grid = document.getElementById('menuGrid');
        
        if (!tabs.length || !grid) return;

        // Orijinal kartları sakla
        const allCards = Array.from(grid.querySelectorAll('.menu-card'));

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Aktif tab'i güncelle
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                const filter = tab.dataset.filter;

                // Kartları filtrele
                allCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        card.style.display = '';
                        // Yeniden görünür yap (animasyon için)
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ============== SEPETE EKLE ============== */
    function initAddToCart() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-btn');
            if (!btn) return;

            // Butonu geçici olarak değiştir
            const originalText = btn.textContent;
            btn.textContent = '✓';
            btn.style.background = 'linear-gradient(135deg, #4a7c2a, #2d5016)';
            btn.disabled = true;

            // Kartı hafifçe vurgula
            const card = btn.closest('.menu-card');
            if (card) {
                card.style.borderColor = 'rgba(74, 124, 42, .5)';
                card.style.boxShadow = '0 0 30px rgba(74, 124, 42, .2)';
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                if (card) {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }
            }, 1200);
        });
    }

    /* ============== SSS ACCORDION ============== */
    function initFAQ() {
        const items = document.querySelectorAll('.faq-item');
        if (!items.length) return;

        items.forEach(item => {
            const question = item.querySelector('.faq-q');
            const answer = item.querySelector('.faq-a');
            
            if (!question || !answer) return;

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Diğer açık öğeleri kapat
                items.forEach(other => {
                    if (other !== item && other.classList.contains('open')) {
                        other.classList.remove('open');
                        other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
                        const otherAnswer = other.querySelector('.faq-a');
                        if (otherAnswer) otherAnswer.hidden = true;
                    }
                });

                // Bu öğeyi aç/kapat
                if (isOpen) {
                    item.classList.remove('open');
                    question.setAttribute('aria-expanded', 'false');
                    answer.hidden = true;
                } else {
                    item.classList.add('open');
                    question.setAttribute('aria-expanded', 'true');
                    answer.hidden = false;
                }
            });
        });
    }

    /* ============== İLETİŞİM FORMU ============== */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalHTML = btn.innerHTML;
            
            // Loading durumu
            btn.disabled = true;
            btn.innerHTML = '<span>Gönderiliyor...</span>';
            btn.style.opacity = '.7';

            // Simüle edilmiş gönderim (gerçek projede fetch ile API'ye gönder)
            setTimeout(() => {
                btn.innerHTML = '<span>✓ Gönderildi!</span>';
                btn.style.background = 'linear-gradient(135deg, #4a7c2a, #2d5016)';
                btn.style.opacity = '1';

                // Formu temizle
                form.reset();

                // 2.5 saniye sonra butonu eski haline getir
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 2500);
            }, 1000);
        });
    }

    /* ============== TARİH ALANI ============== */
    function initDateInput() {
        const dateInput = document.querySelector('input[type="date"]');
        if (!dateInput) return;

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
    }

    /* ============== YUKARI ÇIK BUTONU ============== */
    function initToTop() {
        const btn = document.getElementById('toTop');
        if (!btn) return;

        let ticking = false;

        function updateButton() {
            if (window.scrollY > 500) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateButton);
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============== GALERİ LIGHTBOX ============== */
    function initGallery() {
        const items = document.querySelectorAll('.g-item');
        if (!items.length) return;

        items.forEach(item => {
            item.addEventListener('click', () => openLightbox(item));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item);
                }
            });
        });
    }

    function openLightbox(item) {
        const img = item.querySelector('img');
        if (!img) return;

        // Overlay oluştur
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(8px);
            display: grid;
            place-items: center;
            cursor: zoom-out;
            animation: lightboxFadeIn .3s var(--ease);
            padding: 20px;
        `;

        // Büyük görsel
        const bigImg = document.createElement('img');
        bigImg.src = img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1600');
        bigImg.alt = img.alt;
        bigImg.style.cssText = `
            max-width: 90%;
            max-height: 90vh;
            border-radius: 12px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
            animation: lightboxZoomIn .4s var(--ease);
        `;

        // Kapat butonu
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Kapat');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            transition: all .3s;
        `;

        overlay.appendChild(bigImg);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Kapatma işlevleri
        function closeLightbox() {
            overlay.style.animation = 'lightboxFadeOut .3s var(--ease) forwards';
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        }

        overlay.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        // ESC ile kapat
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    /* ============== AKTİF NAV LİNKİ ============== */
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!sections.length || !navLinks.length) return;

        let ticking = false;

        function updateActiveLink() {
            const scrollY = window.scrollY + 150;

            let currentSection = '';
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                
                if (scrollY >= top && scrollY < top + height) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + currentSection) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveLink);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ============== KLAVYE ERİŞİLEBİLİRLİĞİ ============== */
    function initKeyboard() {
        document.addEventListener('keydown', (e) => {
            // ESC ile mobil menüyü kapat
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobileMenu');
                const overlay = document.getElementById('mobileOverlay');
                const toggle = document.getElementById('menuToggle');

                if (mobileMenu?.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    overlay?.classList.remove('show');
                    document.body.style.overflow = '';
                    toggle?.setAttribute('aria-expanded', 'false');
                    toggle?.focus();
                }
            }
        });
    }

})();

/* ============== LIGHTBOX ANİMASYONLARI (CSS'e eklenemez, JS ile enjekte et) ============== */
(function injectLightboxStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes lightboxFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes lightboxFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes lightboxZoomIn {
            from { opacity: 0; transform: scale(.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .lightbox-overlay button:hover {
            background: rgba(255, 107, 26, 0.8) !important;
            border-color: rgba(255, 107, 26, 1) !important;
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(style);
})();
