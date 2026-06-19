/* ============================================================
   Ahmed Sabri, Portfolio interactions
   Three.js particle hero + GSAP scroll motion + nav + counters
   ============================================================ */
(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $  = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* ---------- Footer year ---------- */
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Navigation: scrolled state, mobile menu ---------- */
    const nav = $('#nav');
    const navToggle = $('#navToggle');
    const navLinksWrap = $('#navLinks');
    const navLinks = $$('.nav__link');

    function setScrolled() {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    setScrolled();

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const open = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
    }
    // Close the mobile menu after picking a link
    if (navLinksWrap) {
        navLinksWrap.addEventListener('click', (e) => {
            if (e.target.closest('a') && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Scroll progress bar ---------- */
    const progress = $('.scroll-progress');
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            setScrolled();
            if (progress) {
                const h = document.documentElement;
                const max = h.scrollHeight - h.clientHeight;
                progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
            }
            ticking = false;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- GSAP: reveals, counters, smooth anchor scroll, scrollspy ---------- */
    const hasGSAP = typeof window.gsap !== 'undefined';
    if (hasGSAP) {
        const gsap = window.gsap;
        if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
        if (window.ScrollToPlugin) gsap.registerPlugin(window.ScrollToPlugin);

        // Hero intro (runs regardless of motion pref, but instant if reduced)
        const heroBits = $$('.hero .reveal');
        if (prefersReduced) {
            gsap.set(heroBits, { opacity: 1, y: 0 });
        } else {
            gsap.to(heroBits, {
                opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                stagger: 0.12, delay: 0.15
            });
        }

        if (window.ScrollTrigger && !prefersReduced) {
            // Scroll reveals
            $$('.reveal-up').forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                });
            });

            // Animated counters
            $$('.stat__num').forEach((el) => {
                const target = parseFloat(el.dataset.count || '0');
                const suffix = el.dataset.suffix || '';
                const obj = { v: 0 };
                window.ScrollTrigger.create({
                    trigger: el,
                    start: 'top 90%',
                    once: true,
                    onEnter: () => {
                        gsap.to(obj, {
                            v: target, duration: 1.6, ease: 'power2.out',
                            onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
                            onComplete: () => { el.textContent = target + suffix; }
                        });
                    }
                });
            });
        } else {
            // Reduced motion: just show everything, set final counter values
            $$('.reveal-up').forEach((el) => el.classList.add('is-in'));
            $$('.stat__num').forEach((el) => {
                el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
            });
        }

        // Smooth anchor scroll with header offset
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74;
        $$('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const id = link.getAttribute('href');
                if (id === '#' || id.length < 2) return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                if (window.ScrollToPlugin && !prefersReduced) {
                    gsap.to(window, {
                        duration: 1, ease: 'power2.inOut',
                        scrollTo: { y: target, offsetY: navH - 4 }
                    });
                } else {
                    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
                }
            });
        });

        // Scroll spy: highlight active nav link
        if (window.ScrollTrigger) {
            const sections = navLinks
                .map((l) => document.querySelector(l.getAttribute('href')))
                .filter(Boolean);
            sections.forEach((section) => {
                window.ScrollTrigger.create({
                    trigger: section,
                    start: 'top 45%',
                    end: 'bottom 45%',
                    onToggle: (self) => {
                        if (self.isActive) {
                            navLinks.forEach((l) => {
                                l.classList.toggle('is-active', l.getAttribute('href') === '#' + section.id);
                            });
                        }
                    }
                });
            });
        }
    } else {
        // No GSAP at all: reveal everything and fill counters
        $$('.reveal, .reveal-up').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
        $$('.stat__num').forEach((el) => {
            el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
        });
    }

    /* ---------- Three.js particle hero ---------- */
    function initHero() {
        const canvas = $('#heroCanvas');
        if (!canvas || typeof window.THREE === 'undefined') return;

        const THREE = window.THREE;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        } catch (err) {
            return; // WebGL unavailable; the CSS gradient backdrop remains
        }

        const hero = $('.hero');
        const getSize = () => ({
            w: hero ? hero.clientWidth : window.innerWidth,
            h: hero ? hero.clientHeight : window.innerHeight
        });

        let { w, h } = getSize();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
        camera.position.z = 38;

        // ---- Sparse, dim point field (no glow, no sparkle) ----
        const COUNT = window.innerWidth < 768 ? 600 : 1100;
        const positions = new Float32Array(COUNT * 3);
        const R = 30;

        for (let i = 0; i < COUNT; i++) {
            // random point inside a sphere (cube-root for even volume distribution)
            const r = R * Math.cbrt(Math.random());
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Flat-lit, muted points (normal blending) so they never glow
        const mat = new THREE.PointsMaterial({
            size: 0.12,
            color: 0x8294b2,
            transparent: true,
            opacity: 0.38,
            depthWrite: false,
            sizeAttenuation: true
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // ---- Faint wireframe lattice for quiet, technical depth ----
        const wire = new THREE.Group();
        const wireInner = new THREE.Mesh(
            new THREE.IcosahedronGeometry(13, 1),
            new THREE.MeshBasicMaterial({ color: 0x6f86a8, wireframe: true, transparent: true, opacity: 0.10 })
        );
        const wireOuter = new THREE.Mesh(
            new THREE.IcosahedronGeometry(21, 1),
            new THREE.MeshBasicMaterial({ color: 0x6f86a8, wireframe: true, transparent: true, opacity: 0.05 })
        );
        wire.add(wireInner, wireOuter);
        scene.add(wire);

        // ---- Mouse parallax ----
        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', (e) => {
                mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
                mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
            }, { passive: true });
        }

        // ---- Resize ----
        function resize() {
            const s = getSize();
            w = s.w; h = s.h;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        }
        window.addEventListener('resize', resize, { passive: true });

        // ---- Render loop (pauses when tab hidden) ----
        let raf = null;
        let t = 0;
        function render() {
            t += 0.0012;
            mouse.x += (mouse.tx - mouse.x) * 0.035;
            mouse.y += (mouse.ty - mouse.y) * 0.035;

            points.rotation.y = t * 0.18;
            points.rotation.x = t * 0.06;
            wire.rotation.y = -t * 0.13;
            wireInner.rotation.y = t * 0.09;

            camera.position.x += (mouse.x * 3.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouse.y * 3.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            raf = requestAnimationFrame(render);
        }

        function start() { if (!raf) raf = requestAnimationFrame(render); }
        function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop(); else if (!prefersReduced) start();
        });

        if (prefersReduced) {
            camera.lookAt(scene.position);
            renderer.render(scene, camera); // single static frame
        } else {
            start();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero);
    } else {
        initHero();
    }
})();
