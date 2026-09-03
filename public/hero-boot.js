(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".hero-count").forEach(function (el) {
      el.textContent = (el.dataset.value || "0") + (el.dataset.suffix || "");
    });
    return;
  }

  function ease(p) {
    return 1 - Math.pow(1 - p, 4);
  }

  function animateCount(el) {
    if (el.dataset.animating === "1") return;
    var target = Number(el.dataset.value || 0);
    var suffix = el.dataset.suffix || "";
    var finalText = target + suffix;
    var cur = (el.textContent || "").trim();
    if (el.dataset.done === "1" && cur === finalText) return;
    if (cur === finalText) {
      el.dataset.done = "1";
      return;
    }

    el.dataset.animating = "1";
    delete el.dataset.done;
    var dur = Number(el.dataset.duration || 1400);
    var from = cur.endsWith(suffix) ? Number(cur.slice(0, -suffix.length)) || 0 : 0;
    var t0 = performance.now();

    function frame(now) {
      var p = Math.min((now - t0) / dur, 1);
      var v = Math.round(from + (target - from) * ease(p));
      el.textContent = v + suffix;
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        el.dataset.done = "1";
        el.dataset.animating = "0";
      }
    }

    el.textContent = from + suffix;
    requestAnimationFrame(frame);
  }

  function syncCounts(force) {
    document.querySelectorAll(".hero-count").forEach(function (el) {
      var suffix = el.dataset.suffix || "";
      var target = el.dataset.value || "0";
      var finalText = target + suffix;
      var cur = (el.textContent || "").trim();
      if (!force) {
        if (el.dataset.animating === "1") return;
        if (el.dataset.done === "1" && cur === finalText) return;
        if (cur !== "" && cur !== "0" + suffix && cur !== "0") return;
      }
      animateCount(el);
    });
  }

  function boot() {
    syncCounts(true);
  }

  function resync() {
    syncCounts(false);
  }

  window.addEventListener("hero:resync", resync);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
