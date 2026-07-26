(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Ambient petals ---------- */
  function makePetals() {
    if (reduceMotion) return;
    var field = document.getElementById("petals");
    if (!field) return;
    var count = window.innerWidth < 600 ? 10 : 18;

    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "petal";
      var left = Math.random() * 100;
      var duration = 9 + Math.random() * 10;
      var delay = Math.random() * -18;
      var swayDuration = 3 + Math.random() * 3;
      var size = 7 + Math.random() * 7;
      var hue = Math.random() > 0.5 ? "" : "filter: hue-rotate(-8deg);";

      p.style.left = left + "vw";
      p.style.width = size + "px";
      p.style.height = size * 1.15 + "px";
      p.style.animationDuration = duration + "s, " + swayDuration + "s";
      p.style.animationDelay = delay + "s, " + delay + "s";
      p.style.cssText += hue;
      field.appendChild(p);
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Envelope open/close + heart burst ---------- */
  function initEnvelope() {
    var envelope = document.getElementById("envelope");
    var paper = document.getElementById("letter-paper");
    if (!envelope || !paper) return;

    envelope.addEventListener("click", function () {
      var isOpen = envelope.getAttribute("aria-expanded") === "true";
      envelope.setAttribute("aria-expanded", String(!isOpen));

      if (!isOpen) {
        setTimeout(function () {
          paper.classList.add("is-open");
          paper.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        }, 380);
        if (!reduceMotion) burstHearts(envelope);
      } else {
        paper.classList.remove("is-open");
      }
    });
  }

  function burstHearts(anchor) {
    var rect = anchor.getBoundingClientRect();
    var originX = rect.left + rect.width / 2;
    var originY = rect.top + rect.height * 0.35 + window.scrollY;

    for (var i = 0; i < 10; i++) {
      var heart = document.createElement("span");
      heart.textContent = "❤";
      heart.style.position = "absolute";
      heart.style.left = originX + (Math.random() * 80 - 40) + "px";
      heart.style.top = originY + "px";
      heart.style.fontSize = 12 + Math.random() * 10 + "px";
      heart.style.color = "#C9A66B";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "6";
      heart.style.opacity = "0.9";
      heart.style.transition = "transform 1.1s ease-out, opacity 1.1s ease-out";
      document.body.appendChild(heart);

      (function (el) {
        requestAnimationFrame(function () {
          el.style.transform =
            "translate(" + (Math.random() * 120 - 60) + "px, " + (-90 - Math.random() * 70) + "px) rotate(" + (Math.random() * 60 - 30) + "deg)";
          el.style.opacity = "0";
        });
        setTimeout(function () { el.remove(); }, 1200);
      })(heart);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    makePetals();
    initReveal();
    initEnvelope();
  });
})();
