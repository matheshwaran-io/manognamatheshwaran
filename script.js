(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loveCounter = 0;

  /* ---------- Ambient Petals ---------- */
  function makePetals() {
    if (reduceMotion) return;
    var field = document.getElementById("petals");
    if (!field) return;
    var count = window.innerWidth < 600 ? 12 : 22;

    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      var left = Math.random() * 100;
      var duration = 9 + Math.random() * 10;
      var delay = Math.random() * -18;
      var swayDuration = 3 + Math.random() * 3;
      var size = 8 + Math.random() * 8;

      p.style.left = left + "vw";
      p.style.width = size + "px";
      p.style.height = size * 1.15 + "px";
      p.style.animationDuration = duration + "s, " + swayDuration + "s";
      p.style.animationDelay = delay + "s, " + delay + "s";
      field.appendChild(p);
    }
  }

  /* ---------- Mouse Cursor Sparkle Trail ---------- */
  function initSparkles() {
    if (reduceMotion || window.innerWidth < 768) return;
    var layer = document.getElementById("sparkleLayer");
    if (!layer) return;

    var lastTime = 0;
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - lastTime < 60) return; // limit spawn frequency
      lastTime = now;

      var sparkle = document.createElement("span");
      sparkle.className = "cursor-sparkle";
      var sparkles = ["✨", "💖", "🌸", "⭐", "❤️"];
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = e.clientX + "px";
      sparkle.style.top = e.clientY + "px";

      var dx = (Math.random() - 0.5) * 60 + "px";
      var dy = (Math.random() - 0.5) * 60 - 20 + "px";
      sparkle.style.setProperty("--dx", dx);
      sparkle.style.setProperty("--dy", dy);

      layer.appendChild(sparkle);
      setTimeout(function () { sparkle.remove(); }, 1200);
    });
  }

  /* ---------- Scroll Progress & Glass Header ---------- */
  function initScrollEffects() {
    var progressBar = document.getElementById("scrollProgress");
    var header = document.getElementById("header");

    window.addEventListener("scroll", function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = (scrollTop / docHeight) * 100;

      if (progressBar) progressBar.style.width = progress + "%";
      if (header) {
        if (scrollTop > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      }
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal, .reveal-hero");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3D Tilt Effect on Polaroids ---------- */
  function initPolaroidTilt() {
    if (reduceMotion || window.innerWidth < 768) return;
    var polaroids = document.querySelectorAll(".polaroid");

    polaroids.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var tiltX = (y / (rect.height / 2)) * -10;
        var tiltY = (x / (rect.width / 2)) * 10;
        card.style.transform = "perspective(1000px) rotateX(" + tiltX + "deg) rotateY(" + tiltY + "deg) scale(1.05)";
      });

      card.addEventListener("mouseleave", function () {
        var rot = card.style.getPropertyValue("--r") || "0deg";
        card.style.transform = "rotate(" + rot + ")";
      });
    });
  }

  /* ---------- Lightbox Modal ---------- */
  function initLightbox() {
    var modal = document.getElementById("lightboxModal");
    var backdrop = document.getElementById("lightboxBackdrop");
    var closeBtn = document.getElementById("lightboxClose");
    var img = document.getElementById("lightboxImg");
    var caption = document.getElementById("lightboxCaption");
    var modalLoveBtn = document.getElementById("modalLoveBtn");
    var polaroids = document.querySelectorAll(".polaroid");

    if (!modal || !img) return;

    function openModal(src, text) {
      img.src = src;
      if (caption) caption.textContent = text;
      modal.classList.add("is-active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    polaroids.forEach(function (card) {
      card.addEventListener("click", function () {
        var imageEl = card.querySelector("img");
        var captionEl = card.querySelector("figcaption");
        if (imageEl && imageEl.src) {
          openModal(imageEl.src, captionEl ? captionEl.textContent : "");
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-active")) {
        closeModal();
      }
    });

    if (modalLoveBtn) {
      modalLoveBtn.addEventListener("click", function (e) {
        burstHearts(e.clientX, e.clientY);
        incrementLoveCount();
      });
    }
  }

  /* ---------- Envelope & Letter Logic ---------- */
  function initEnvelope() {
    var envelope = document.getElementById("envelope");
    var paper = document.getElementById("letter-paper");
    var resealBtn = document.getElementById("resealBtn");
    var letterLoveBtn = document.getElementById("letterLoveBtn");
    if (!envelope || !paper) return;

    function openEnvelope() {
      var isOpen = envelope.getAttribute("aria-expanded") === "true";
      if (!isOpen) {
        envelope.setAttribute("aria-expanded", "true");
        setTimeout(function () {
          paper.classList.add("is-open");
          paper.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        }, 400);

        if (!reduceMotion) {
          var rect = envelope.getBoundingClientRect();
          burstHearts(rect.left + rect.width / 2, rect.top + window.scrollY + 100);
          burstConfetti(rect.left + rect.width / 2, rect.top + window.scrollY + 100);
        }
      }
    }

    function closeEnvelope() {
      envelope.setAttribute("aria-expanded", "false");
      paper.classList.remove("is-open");
      envelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    envelope.addEventListener("click", openEnvelope);
    if (resealBtn) resealBtn.addEventListener("click", closeEnvelope);
    if (letterLoveBtn) {
      letterLoveBtn.addEventListener("click", function (e) {
        var rect = letterLoveBtn.getBoundingClientRect();
        burstHearts(rect.left + rect.width / 2, rect.top + window.scrollY);
        incrementLoveCount();
      });
    }
  }

  /* ---------- Heart Explosion Effect ---------- */
  function burstHearts(originX, originY) {
    var count = 16;
    for (var i = 0; i < count; i++) {
      var heart = document.createElement("span");
      heart.textContent = Math.random() > 0.3 ? "❤️" : "💖";
      heart.style.position = "absolute";
      heart.style.left = originX + "px";
      heart.style.top = originY + "px";
      heart.style.fontSize = 14 + Math.random() * 14 + "px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "999";
      heart.style.opacity = "1";
      heart.style.transition = "transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s ease";
      document.body.appendChild(heart);

      (function (el) {
        var angle = Math.random() * Math.PI * 2;
        var dist = 80 + Math.random() * 100;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist - 50;

        requestAnimationFrame(function () {
          el.style.transform = "translate(" + dx + "px, " + dy + "px) scale(" + (0.8 + Math.random() * 0.5) + ") rotate(" + (Math.random() * 60 - 30) + "deg)";
          el.style.opacity = "0";
        });
        setTimeout(function () { el.remove(); }, 1300);
      })(heart);
    }
  }

  /* ---------- Gold Confetti Burst ---------- */
  function burstConfetti(originX, originY) {
    for (var i = 0; i < 20; i++) {
      var particle = document.createElement("span");
      particle.textContent = Math.random() > 0.5 ? "✨" : "⭐";
      particle.style.position = "absolute";
      particle.style.left = originX + "px";
      particle.style.top = originY + "px";
      particle.style.fontSize = 12 + Math.random() * 12 + "px";
      particle.style.color = "#D4AF37";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "999";
      particle.style.transition = "transform 1.4s ease-out, opacity 1.4s ease-out";
      document.body.appendChild(particle);

      (function (el) {
        var dx = (Math.random() - 0.5) * 220;
        var dy = -120 - Math.random() * 100;

        requestAnimationFrame(function () {
          el.style.transform = "translate(" + dx + "px, " + dy + "px) rotate(" + (Math.random() * 360) + "deg)";
          el.style.opacity = "0";
        });
        setTimeout(function () { el.remove(); }, 1500);
      })(particle);
    }
  }

  /* ---------- Love Counter Ticker ---------- */
  function incrementLoveCount() {
    loveCounter++;
    var counterEl = document.getElementById("loveCount");
    if (counterEl) counterEl.textContent = loveCounter;
  }

  function initHeroActions() {
    var loveBtn = document.getElementById("heroLoveBtn");
    if (loveBtn) {
      loveBtn.addEventListener("click", function (e) {
        var rect = loveBtn.getBoundingClientRect();
        burstHearts(rect.left + rect.width / 2, rect.top + window.scrollY);
        incrementLoveCount();
      });
    }
  }

  /* ---------- Ambiance Audio Toggle Simulator ---------- */
  function initMusicToggle() {
    var btn = document.getElementById("musicToggle");
    var isPlaying = false;

    if (btn) {
      btn.addEventListener("click", function () {
        isPlaying = !isPlaying;
        var label = btn.querySelector(".music-label");
        var icon = btn.querySelector(".music-icon");
        if (isPlaying) {
          if (label) label.textContent = "Playing ♪";
          if (icon) icon.textContent = "🎶";
          btn.style.background = "var(--wine)";
          btn.style.color = "#fff";
        } else {
          if (label) label.textContent = "Ambiance";
          if (icon) icon.textContent = "🎵";
          btn.style.background = "";
          btn.style.color = "";
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    makePetals();
    initSparkles();
    initScrollEffects();
    initReveal();
    initPolaroidTilt();
    initLightbox();
    initEnvelope();
    initHeroActions();
    initMusicToggle();
  });
})();
