(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".hero-count").forEach(function (el) {
      el.textContent = (el.dataset.value || "0") + (el.dataset.suffix || "");
    });
    return;
  }

  function easeOut(p) {
    return 1 - Math.pow(1 - p, 3);
  }

  function animateCount(el) {
    if (el.dataset.done === "1" || el.dataset.animating === "1") return;
    el.dataset.animating = "1";
    var target = Number(el.dataset.value || 0);
    var suffix = el.dataset.suffix || "";
    var dur = Number(el.dataset.duration || 650);
    var t0 = performance.now();
    el.textContent = "0" + suffix;

    function frame(now) {
      var p = Math.min((now - t0) / dur, 1);
      var v = Math.round(easeOut(p) * target);
      el.textContent = v + suffix;
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        el.dataset.done = "1";
        el.dataset.animating = "0";
      }
    }

    requestAnimationFrame(frame);
  }

  function syncCounts() {
    document.querySelectorAll(".hero-count").forEach(function (el) {
      if (el.dataset.done === "1" || el.dataset.animating === "1") return;
      var suffix = el.dataset.suffix || "";
      var target = el.dataset.value || "0";
      var cur = el.textContent || "";
      if (cur === target + suffix) {
        el.dataset.done = "1";
        return;
      }
      if (cur === "" || cur === "0" + suffix || cur === "0") {
        animateCount(el);
      }
    });
  }

  function bootRotator(root) {
    if (root.dataset.rotatorBooted === "1") return;
    root.dataset.rotatorBooted = "1";

    var items = [];
    try {
      items = JSON.parse(root.dataset.items || "[]");
    } catch (e) {
      items = [];
    }
    if (items.length < 2) return;

    var word = root.querySelector(".hero-rotator-word");
    if (!word) return;

    var interval = Number(root.dataset.interval || 2800);
    var index = 0;
    word.classList.add("is-visible");

    window.setInterval(function () {
      index = (index + 1) % items.length;
      word.classList.remove("is-visible");
      window.requestAnimationFrame(function () {
        word.textContent = items[index];
        word.classList.add("is-visible");
      });
    }, interval);
  }

  function boot() {
    document.querySelectorAll(".hero-count").forEach(animateCount);
    document.querySelectorAll(".hero-rotator-live").forEach(bootRotator);
    document.documentElement.classList.add("hero-booted");
  }

  function init() {
    boot();
    window.setTimeout(syncCounts, 2500);
    window.setTimeout(syncCounts, 4500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
