(function () {
  "use strict";

  /* ── helpers ─────────────────────────────────────────── */
  var $ = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.from((r||document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); } catch(e) { console.warn("[" + name + "]", e); }
  }

  /* ── Nav ──────────────────────────────────────────────── */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;

    // Scroll state
    var onScroll = function() {
      nav.classList.toggle("is-scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hamburger / mobile menu
    var btn  = $(".nav-hamburger");
    var menu = $(".mobile-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", function() {
      var open = menu.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      menu.setAttribute("aria-hidden", !open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    // Close on link click
    $$("a", menu).forEach(function(a) {
      a.addEventListener("click", function() {
        menu.classList.remove("is-open");
        btn.classList.remove("is-open");
        btn.setAttribute("aria-expanded", false);
        menu.setAttribute("aria-hidden", true);
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Smooth anchor scroll ─────────────────────────────── */
  function initAnchorScroll() {
    document.addEventListener("click", function(e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navH = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navH,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ── Hero mouse gradient ──────────────────────────────── */
  function initHeroGradient() {
    if (!fineHover) return;
    var grad = $(".hero-gradient");
    if (!grad) return;
    var raf = null;
    var tx = 60, ty = 40;
    var cx = 60, cy = 40;

    document.addEventListener("mousemove", function(e) {
      tx = (e.clientX / window.innerWidth)  * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    });

    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      document.documentElement.style.setProperty("--mx", cx.toFixed(2) + "%");
      document.documentElement.style.setProperty("--my", cy.toFixed(2) + "%");
      raf = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ── Scroll reveals (IntersectionObserver) ────────────── */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -3% 0px" });

    els.forEach(function(el) { io.observe(el); });

    // Safety: force-reveal anything still hidden after 6s
    setTimeout(function() {
      $$("[data-reveal]:not(.is-visible)").forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ── Hero title line reveal ───────────────────────────── */
  function initHeroReveal() {
    var lines = $$(".hero-line");
    lines.forEach(function(line, i) {
      line.style.opacity = "0";
      line.style.transform = "translateY(80px)";
      line.style.transition = "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)";
      line.style.transitionDelay = (0.3 + i * 0.18) + "s";
      setTimeout(function() {
        line.style.opacity = "1";
        line.style.transform = "none";
      }, 100);
    });

    // Fade items
    var fades = $$("[data-reveal='fade']", $(".hero-inner"));
    fades.forEach(function(el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
      el.style.transitionDelay = (0.9 + i * 0.12) + "s";
      setTimeout(function() {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 100);
    });

    // Stats
    var stats = $$(".hero-stat[data-reveal]");
    stats.forEach(function(el, i) {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.6s ease";
      el.style.transitionDelay = (1.2 + i * 0.1) + "s";
      setTimeout(function() { el.style.opacity = "1"; }, 100);
    });
  }

  /* ── Count-up numbers ─────────────────────────────────── */
  function initCountUp() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target;
        var target = parseFloat(el.dataset.countNum || el.dataset.count || el.textContent) || 0;
        var duration = 1600;
        var start = performance.now();
        var isFloat = target !== Math.floor(target);

        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          var val = target * ease;
          el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = isFloat ? target.toFixed(1) : Math.round(target).toString();
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.05 });

    $$("[data-count], [data-count-num]").forEach(function(el) { io.observe(el); });
  }

  /* ── Service cards modal ──────────────────────────────── */
  function initServiceModal() {
    var modal    = $("#service-modal");
    var backdrop = $(".service-modal-backdrop");
    var closeBtn = $(".service-modal-close");
    var numEl    = $("#modal-num");
    var titleEl  = $("#modal-title");
    var descEl   = $("#modal-desc");

    if (!modal) return;

    var data = (window.__OCEANGATE__ || window.__BRAND__ || {}).services || [];

    function open(id) {
      var svc = data.find(function(s){ return s.id === id; });
      if (!svc) return;
      var card = $('[data-service-id="' + id + '"]');
      var num  = card ? (card.querySelector(".service-num") || {}).textContent : "";
      numEl.textContent  = num;
      titleEl.textContent = svc.title;
      descEl.textContent  = svc.desc;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    $$(".service-expand").forEach(function(btn) {
      btn.addEventListener("click", function() {
        open(btn.dataset.expand);
      });
    });

    if (backdrop) backdrop.addEventListener("click", close);
    if (closeBtn) closeBtn.addEventListener("click", close);

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  /* ── Coverage map port interaction ───────────────────── */
  function initCoverage() {
    var portGroups = $$(".port-group");
    var portBtns   = $$(".port-item");
    var mapEl      = $(".coverage-map");
    var mapInner   = $(".coverage-map-inner");
    var tooltip    = $("#port-tooltip");
    var ttImg      = $("#tooltip-img");
    var ttCoast    = $("#tooltip-coast");
    var ttName     = $("#tooltip-name");
    var ttDesc     = $("#tooltip-desc");

    var portMeta = {
      moin:       { name: "Moín",       coast: "Caribbean", desc: "CR's largest container terminal & main Atlantic gateway.",      img: "assets/img/moin-demo.png"       },
      limon:      { name: "Limón",      coast: "Caribbean", desc: "Historic general cargo & cruise operations since 1871.",       img: "assets/img/limon-demo.png"      },
      puntarenas: { name: "Puntarenas", coast: "Pacific",   desc: "Multi-purpose Pacific hub with ferry & bulk cargo services.",  img: "assets/img/puntarenas-demo.png" },
      caldera:    { name: "Caldera",    coast: "Pacific",   desc: "Primary Pacific container port — 40 km from San José.",       img: "assets/img/caldera-demo.png"    },
      quepos:     { name: "Quepos",     coast: "Pacific",   desc: "Marina & fishing port — gateway to Manuel Antonio.",          img: "assets/img/quepos-demo.png"     },
      golfito:    { name: "Golfito",    coast: "Pacific",   desc: "Southern Gulf port for bulk & offshore vessel support.",      img: "assets/img/golfito-demo.png"    }
    };

    /* ── Reveal port markers on scroll ── */
    var markers = $$(".port-group .port-outer, .port-group .port-dot, .port-group .port-center");
    markers.forEach(function(el, i) {
      el.style.transitionDelay = (0.28 + i * 0.06) + "s";
    });

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        markers.forEach(function(el) { el.style.opacity = "1"; });
        io.disconnect();
      });
    }, { threshold: 0.02 });
    if (mapEl) io.observe(mapEl);

    /* ── Tooltip positioning ── */
    function showTooltip(portId, groupEl) {
      if (!tooltip || !mapInner) return;
      var meta = portMeta[portId];
      if (!meta) return;
      ttName.textContent  = meta.name;
      ttCoast.textContent = meta.coast + " Coast";
      ttDesc.textContent  = meta.desc;
      if (ttImg) { ttImg.src = meta.img; ttImg.alt = meta.name; }

      var dot = groupEl.querySelector(".port-dot");
      var ref = dot ? dot.getBoundingClientRect() : groupEl.getBoundingClientRect();
      var box = mapInner.getBoundingClientRect();
      var cx  = ref.left - box.left + ref.width  / 2;
      var cy  = ref.top  - box.top  + ref.height / 2;
      var ttW = 205, ttH = 155, gap = 14;
      var left = Math.max(8, Math.min(cx - ttW / 2, box.width - ttW - 8));
      var top  = cy - ttH - gap;
      if (top < 8) top = cy + gap;
      tooltip.style.left = left + "px";
      tooltip.style.top  = top  + "px";
      tooltip.classList.add("is-visible");
    }

    function hideTooltip() {
      if (tooltip) tooltip.classList.remove("is-visible");
    }

    function activate(portId) {
      portBtns.forEach(function(b)  { b.classList.remove("is-active"); });
      portGroups.forEach(function(g){ g.classList.remove("is-active"); });
      portBtns.forEach(function(b) {
        if (b.dataset.targetPort === portId) b.classList.add("is-active");
      });
      portGroups.forEach(function(g) {
        if (g.dataset.port === portId) g.classList.add("is-active");
      });
    }

    function deactivate() {
      portBtns.forEach(function(b)  { b.classList.remove("is-active"); });
      portGroups.forEach(function(g){ g.classList.remove("is-active"); });
      hideTooltip();
    }

    /* ── Port group events ── */
    portGroups.forEach(function(group) {
      var pid = group.dataset.port;
      if (fineHover) {
        group.addEventListener("mouseenter", function() { activate(pid); showTooltip(pid, group); });
        group.addEventListener("mouseleave", deactivate);
      } else {
        group.addEventListener("click", function() {
          var already = group.classList.contains("is-active");
          deactivate();
          if (!already) { activate(pid); showTooltip(pid, group); }
        });
      }
    });

    /* ── Port card events ── */
    portBtns.forEach(function(btn) {
      var pid = btn.dataset.targetPort;
      var grp = $(".port-group[data-port='" + pid + "']");
      if (fineHover) {
        btn.addEventListener("mouseenter", function() { activate(pid); if (grp) showTooltip(pid, grp); });
        btn.addEventListener("mouseleave", deactivate);
      } else {
        btn.addEventListener("click", function() {
          var already = btn.classList.contains("is-active");
          deactivate();
          if (!already) { activate(pid); if (grp) showTooltip(pid, grp); }
        });
      }
    });

    /* ── Hide tooltip when clicking outside ── */
    if (!fineHover) {
      document.addEventListener("click", function(e) {
        if (!e.target.closest(".port-group") && !e.target.closest(".port-item")) deactivate();
      });
    }
  }

  /* ── Ops Center live clock ────────────────────────────── */
  function initOpsClock() {
    var el = $("#ops-time");
    if (!el) return;
    function tick() {
      var now = new Date();
      var h = ("0" + now.getUTCHours()).slice(-2);
      var m = ("0" + now.getUTCMinutes()).slice(-2);
      el.textContent = h + ":" + m + " UTC";
    }
    tick();
    setInterval(tick, 30000);
  }

  /* ── Card hover tilt ──────────────────────────────────── */
  function initTilt() {
    if (!fineHover) return;
    var cards = $$(".service-card, .why-card, .testimonial-card");
    cards.forEach(function(card) {
      card.addEventListener("mousemove", function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = "perspective(600px) rotateY(" + (x * 5) + "deg) rotateX(" + (-y * 5) + "deg)";
      });
      card.addEventListener("mouseleave", function() {
        card.style.transform = "";
      });
    });
  }

  /* ── Contact form ─────────────────────────────────────── */
  function initContactForm() {
    var form   = $("#contact-form");
    var submit = $("#form-submit");
    if (!form || !submit) return;

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      submit.classList.add("is-sending");
      submit.disabled = true;

      // Simulate async send (replace with real fetch in production)
      setTimeout(function() {
        submit.classList.remove("is-sending");
        submit.classList.add("is-done");
        setTimeout(function() {
          submit.classList.remove("is-done");
          submit.disabled = false;
          form.reset();
        }, 3000);
      }, 1800);
    });
  }

  /* ── GSAP ScrollTrigger animations ───────────────────── */
  function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax on scroll
    gsap.to(".hero-bg img", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    // Process timeline line draw
    var timeline = $(".process-timeline");
    if (timeline) {
      gsap.from(".process-timeline::before", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-timeline",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      });
    }

    // Section title char reveals
    $$(".section-title[data-reveal='chars']").forEach(function(el) {
      var text = el.innerHTML;
      var wrapped = text.replace(/(\S)/g, function(char) {
        return '<span class="char-wrap"><span class="char">' + char + '</span></span>';
      });
      el.innerHTML = wrapped;

      var chars = $$(".char", el);
      var io2 = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (!e.isIntersecting) return;
          chars.forEach(function(c, i) {
            setTimeout(function() { c.classList.add("is-visible"); }, i * 22);
          });
          io2.unobserve(e.target);
        });
      }, { threshold: 0.03 });
      io2.observe(el);
    });

    // Why cards stagger
    var whyCards = $$(".why-card");
    if (whyCards.length) {
      gsap.from(whyCards, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 85%"
        }
      });
    }

    // Industry cards stagger
    var indCards = $$(".industry-card");
    if (indCards.length) {
      gsap.from(indCards, {
        opacity: 0,
        y: 24,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: ".industries-grid",
          start: "top 90%",
          once: true
        }
      });
    }
  }

  /* ── Favicon SVG inline ───────────────────────────────── */
  function initFavicon() {
    var existing = $('link[rel="icon"]');
    if (existing) return; // already set from HTML
    // fallback inline SVG favicon
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "data:image/svg+xml," + encodeURIComponent([
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">',
      '<rect width="32" height="32" fill="#07111E"/>',
      '<circle cx="16" cy="16" r="14" stroke="#0B63FF" stroke-width="1.5" fill="none"/>',
      '<path d="M6 20 Q10 14 16 16 Q22 18 26 12" stroke="#2E9BFF" stroke-width="2" fill="none" stroke-linecap="round"/>',
      '<path d="M16 8 L14 18 L16 17 L18 18 Z" fill="#FFFFFF"/>',
      '</svg>'
    ].join(""));
    document.head.appendChild(link);
  }

  /* ── Boot ─────────────────────────────────────────────── */
  function boot() {
    safe(initFavicon,      "initFavicon");
    safe(initNav,          "initNav");
    safe(initAnchorScroll, "initAnchorScroll");
    safe(initHeroReveal,   "initHeroReveal");
    safe(initHeroGradient, "initHeroGradient");
    safe(initReveals,      "initReveals");
    safe(initCountUp,      "initCountUp");
    safe(initServiceModal, "initServiceModal");
    safe(initCoverage,     "initCoverage");
    safe(initOpsClock,     "initOpsClock");
    safe(initTilt,         "initTilt");
    safe(initContactForm,  "initContactForm");

    if (window.gsap && window.ScrollTrigger) {
      safe(initGSAP, "initGSAP");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
