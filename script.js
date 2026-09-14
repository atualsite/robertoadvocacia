/* =============================================
   ERICA ADVOCACIA — JAVASCRIPT PRINCIPAL
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------
       TEMA — MODO ESCURO / CLARO
       ----------------------------------------- */
    const html = document.documentElement;
    const themeSwitcher = document.getElementById('themeSwitcher');
    const mobileThemeSwitcher = document.getElementById('mobileThemeSwitcher');

    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return 'dark';
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        document.querySelectorAll('.theme-btn').forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    }

    applyTheme(getPreferredTheme());

    function setupThemeSwitcher(switcher) {
        if (switcher) {
            switcher.querySelectorAll('.theme-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    const theme = this.getAttribute('data-theme');
                    applyTheme(theme);
                });
            });
        }
    }

    setupThemeSwitcher(themeSwitcher);
    setupThemeSwitcher(mobileThemeSwitcher);

    /* -----------------------------------------
       COOKIE BANNER
       ----------------------------------------- */
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.add('hidden');
        }
    }

    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
        hideCookieBanner();
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            hideCookieBanner();
        });
    }

    if (cookieReject) {
        cookieReject.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'false');
            hideCookieBanner();
        });
    }

    /* -----------------------------------------
       MENU MOBILE
       ----------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileNavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* -----------------------------------------
       SCROLL SUAVE
       ----------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                if (mobileNav) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    /* -----------------------------------------
       HEADER — SOMBRA NO SCROLL
       ----------------------------------------- */
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    /* -----------------------------------------
       WHATSAPP FLUTUANTE — MOBILE
       ----------------------------------------- */
    const whatsappFloat = document.querySelector('.whatsapp-float');
    let whatsappTimer = null;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function showWhatsapp() {
        if (whatsappFloat) {
            whatsappFloat.classList.add('visible');
        }
    }

    function hideWhatsapp() {
        if (whatsappFloat) {
            whatsappFloat.classList.remove('visible');
        }
    }

    function handleWhatsappScroll() {
        if (!isMobile()) {
            showWhatsapp();
            return;
        }

        if (window.scrollY > 100) {
            if (!whatsappFloat.classList.contains('visible')) {
                if (whatsappTimer) clearTimeout(whatsappTimer);
                whatsappTimer = setTimeout(showWhatsapp, 3000);
            }
        } else {
            if (whatsappTimer) clearTimeout(whatsappTimer);
            hideWhatsapp();
        }
    }

    window.addEventListener('scroll', handleWhatsappScroll);
    handleWhatsappScroll();

    window.addEventListener('resize', function() {
        if (!isMobile()) {
            showWhatsapp();
            if (whatsappTimer) clearTimeout(whatsappTimer);
        } else {
            handleWhatsappScroll();
        }
    });

    /* -----------------------------------------
       STATS — CONTADOR ANIMADO
       ----------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        update();
    }

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                statNumbers.forEach(function (num) {
                    animateCounter(num);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* -----------------------------------------
       DEPOIMENTOS — SLIDER
       ----------------------------------------- */
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        testimonials.forEach(function (t) { t.classList.remove('active'); });
        dots.forEach(function (d) { d.classList.remove('active'); });
        if (testimonials[index]) testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    startAutoSlide();

    /* -----------------------------------------
       FORMULÁRIO — ENVIO
       ----------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var area = document.getElementById('area').value;
            var message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !area || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(function () {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    /* -----------------------------------------
       SCROLL REVEAL — ANIMAÇÃO DE ENTRADA
       ----------------------------------------- */
    var revealElements = document.querySelectorAll('.area-card, .info-item, .diff-card, .about-content, .about-image');

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    /* -----------------------------------------
       NAV LINK ATIVO NO SCROLL
       ----------------------------------------- */
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(function (link) {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = '#C6A15B';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

});