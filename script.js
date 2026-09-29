import "./style.css";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const initialHash = window.location.hash;
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const pinnedLayout = window.matchMedia(
  "(min-width: 901px) and (min-height: 640px)",
);
let userPausedMotion = false;
try {
  userPausedMotion = localStorage.getItem("dawnstar-motion") === "paused";
} catch {
  /* Storage is optional. */
}
let motionPaused = motionPreference.matches || userPausedMotion;
let animationContext, lenis, ticker, approachTimeline;
let selectedStage = 0;
let ambientLoops = [];
const stageProgress = [0.08, 0.46, 0.87];
const stageDescriptions = [
  "What you need, what you prefer and what you already use. These are the starting points for the recommendations we’re developing.",
  "We’re designing Wellyn to compare product and ingredient information against your preferences, budget and environment, with a reason for each suggestion.",
  "The next step is support using what you choose: keeping track of what works and revisiting your products as the seasons and your needs change.",
];
const stageTitles = [
  "01 — Personal context",
  "02 — Product comparison",
  "03 — Ongoing support",
];

function updateStageLabels(index) {
  selectedStage = index;
  $$(".approach-steps button").forEach((button, i) =>
    button.setAttribute("aria-pressed", String(i === index)),
  );
  $(".approach-counter").textContent = stageTitles[index];
  $("#approach-description").textContent = stageDescriptions[index];
}

function showStaticStage(index) {
  const isPlan = index === 1;
  gsap.set(".context-node, .context-center, .context-ring", {
    autoAlpha: isPlan ? 0 : 1,
    scale: 1,
    x: 0,
    y: 0,
    rotation: 0,
  });
  gsap.set(".simple-plan", { autoAlpha: isPlan ? 1 : 0, y: 0 });
  gsap.set(".simple-plan > div", { autoAlpha: 1, y: 0 });
  gsap.set(".evolving-note", { autoAlpha: index === 2 ? 1 : 0 });
  if (index === 2) {
    gsap.set(".context-center", { y: -28, scale: 0.83 });
    gsap.set(".context-node", { scale: 0.88 });
  }
  updateStageLabels(index);
}

// Keep the current scene in view when pin spacing is added or removed.
function captureReadingPosition() {
  const pin = approachTimeline?.scrollTrigger;
  if (pin && window.scrollY >= pin.start && window.scrollY <= pin.end) {
    return {
      element: $("#approach"),
      stage: selectedStage,
      progress: pin.progress,
      top: 0,
    };
  }
  const section = $$("main > section, main > footer").find(
    (element) =>
      element.getBoundingClientRect().bottom > window.innerHeight * 0.25,
  );
  return section
    ? {
        element: section,
        top: section.getBoundingClientRect().top,
        stage: selectedStage,
      }
    : null;
}

function restoreReadingPosition(reading) {
  if (!reading) return;
  const trigger = approachTimeline?.scrollTrigger;
  let target =
    window.scrollY + reading.element.getBoundingClientRect().top - reading.top;
  let progress;
  if (reading.element.id === "approach" && reading.top <= 1) {
    if (trigger) {
      progress = reading.progress ?? stageProgress[reading.stage];
      target = trigger.start + (trigger.end - trigger.start) * progress;
    } else {
      target = window.scrollY + reading.element.getBoundingClientRect().top;
    }
  }
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(target, { immediate: true, force: true });
  } else window.scrollTo({ top: target, behavior: "instant" });
  ScrollTrigger.update();
  if (progress !== undefined) {
    approachTimeline.progress(progress);
    trigger.getTween()?.progress(1);
  }
}

function syncAmbientLoops() {
  ambientLoops.forEach(({ tween, trigger }) =>
    tween.paused(document.hidden || !trigger.isActive),
  );
}
function ambientMotion(selector, settings, scene) {
  const tween = gsap.to(selector, { ...settings, paused: true });
  const trigger = ScrollTrigger.create({
    trigger: scene,
    start: "top bottom",
    end: "bottom top",
    onToggle: syncAmbientLoops,
  });
  ambientLoops.push({ tween, trigger });
}
document.addEventListener("visibilitychange", syncAmbientLoops);

function buildMotion({ preservePosition = false } = {}) {
  const reading = preservePosition ? captureReadingPosition() : null;
  const stage = selectedStage;
  if (ticker) gsap.ticker.remove(ticker);
  if (lenis) {
    lenis.destroy();
    lenis = undefined;
  }
  animationContext?.revert();
  gsap.killTweensOf(
    ".routine-row, .decision-panel, .chosen-product img, .routine-plan",
  );
  gsap.set(
    ".routine-row, .decision-panel, .chosen-product img, .routine-plan",
    { clearProps: "transform,opacity" },
  );
  approachTimeline = undefined;
  ambientLoops = [];
  document.body.classList.toggle("motion-paused", motionPaused);
  $(".motion-toggle").setAttribute(
    "aria-label",
    motionPaused ? "Enable motion" : "Pause motion",
  );
  $(".motion-label").textContent = motionPaused
    ? "Enable motion"
    : "Pause motion";
  $(".motion-icon").textContent = motionPaused ? "▷" : "Ⅱ";
  gsap.set(
    ".context-node, .context-center, .context-ring, .simple-plan, .simple-plan > div, .evolving-note",
    { clearProps: "all" },
  );
  updateStageLabels(0);
  if (motionPaused) {
    showStaticStage(stage);
    ScrollTrigger.refresh();
    restoreReadingPosition(reading);
    return;
  }

  // Touch keeps native scrolling; smooth wheel input only on roomy desktop layouts.
  if (pinnedLayout.matches && window.matchMedia("(pointer: fine)").matches) {
    lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    ticker = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(ticker);
  }
  animationContext = gsap.context(() => {
    if (!preservePosition && window.scrollY < 100) {
      gsap.from(".hero-line, .hero-you", {
        yPercent: 18,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-portrait", {
        scale: 0.95,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
      });
      gsap.from(".hero-copy p, .hero-copy .button", {
        y: 14,
        opacity: 0,
        delay: 0.3,
        duration: 0.85,
        stagger: 0.1,
      });
    }
    ambientMotion(
      ".orbit-one",
      { rotation: "+=360", duration: 100, ease: "none", repeat: -1 },
      ".hero",
    );
    ambientMotion(
      ".orbit-two",
      { rotation: "-=360", duration: 130, ease: "none", repeat: -1 },
      ".hero",
    );
    ambientMotion(
      ".hero-orbit-copy",
      { rotation: 6, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true },
      ".hero",
    );
    gsap.to(".hero-portrait img", {
      scale: 1.28,
      yPercent: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    // Typography remains stable on small screens so the CTA never drifts into the photograph.
    if (pinnedLayout.matches)
      gsap.to(".hero-copy", {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    gsap.from(".reveal-word", {
      opacity: 0.3,
      stagger: 0.11,
      ease: "none",
      scrollTrigger: {
        trigger: ".vision h2",
        start: "top 88%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });
    gsap.from(".highlight", {
      "--highlight-scale": 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".vision h2",
        start: "top 75%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });
    gsap.fromTo(
      ".vision-thread span",
      { y: -35 },
      {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".vision-thread",
          start: "top bottom",
          end: "bottom 30%",
          scrub: true,
        },
      },
    );
    gsap.from(".wellyn-wordmark", {
      y: 45,
      opacity: 0.3,
      scrollTrigger: {
        trigger: ".wellyn",
        start: "top 85%",
        end: "top 30%",
        scrub: 0.7,
      },
    });
    // Let the products settle into a considered pair; keep controls stationary.
    gsap.from(".product-visual img", {
      y: 32,
      rotation: (index) => (index === 0 ? -7 : 7),
      opacity: 0,
      stagger: 0.12,
      duration: 1.1,
      ease: "power3.out",
      clearProps: "transform,opacity",
      scrollTrigger: {
        trigger: ".product-options",
        start: "top 88%",
        once: true,
      },
    });
    gsap.to(".wellyn-orbit", {
      rotation: 7,
      ease: "none",
      scrollTrigger: {
        trigger: ".wellyn",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
    gsap.fromTo(
      ".chapters-image",
      { clipPath: "inset(6% 6% 6% 6% round 42% 42% 42% 42%)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: ".chapters-visual",
          start: "top 95%",
          end: "top 25%",
          scrub: 0.8,
        },
      },
    );
    gsap.fromTo(
      ".chapters-image img",
      { scale: 1.13 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".chapters-visual",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    gsap.from(".chapters-copy h2, .chapters-intro", {
      y: 28,
      opacity: 0,
      stagger: 0.13,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".chapters-copy",
        start: "top 78%",
        once: true,
      },
    });
    gsap.from(".principles-heading h2, .principle-list details", {
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: { trigger: ".principles", start: "top 80%", once: true },
    });
    gsap.from(".footer-wordmark", {
      yPercent: 25,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact",
        start: "top 75%",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    if (!pinnedLayout.matches) {
      showStaticStage(stage);
      return;
    }
    const canvas = $(".context-canvas");
    approachTimeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: ".approach",
        start: "top top",
        end: () =>
          `+=${Math.min(1300, Math.max(950, window.innerHeight * 1.4))}`,
        pin: ".approach-stage",
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = self.progress < 0.25 ? 0 : self.progress < 0.7 ? 1 : 2;
          if (next !== selectedStage) updateStageLabels(next);
        },
      },
    });
    approachTimeline
      .to(".context-ring", { rotation: 60, duration: 1, ease: "none" }, 0)
      .to(
        ".context-node",
        {
          x: (_, node) =>
            (canvas.clientWidth - node.offsetWidth) / 2 - node.offsetLeft,
          y: (_, node) =>
            (canvas.clientHeight - node.offsetHeight) / 2 - node.offsetTop,
          scale: 0.35,
          autoAlpha: 0,
          duration: 0.65,
          stagger: 0.045,
        },
        0.55,
      )
      .to(".context-center", { scale: 0.7, autoAlpha: 0, duration: 0.4 }, 0.85)
      .to(".context-ring", { scale: 0.55, autoAlpha: 0, duration: 0.45 }, 0.8)
      .fromTo(
        ".simple-plan",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4 },
        1.1,
      )
      .fromTo(
        ".simple-plan > div",
        { y: 25, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.45 },
        1.15,
      )
      .to(".simple-plan", { autoAlpha: 0, y: -20, duration: 0.35 }, 2.6)
      .to(
        ".context-ring",
        { scale: 1, autoAlpha: 1, rotation: 220, duration: 1.1, ease: "none" },
        3,
      )
      .to(
        ".context-node",
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          scale: 0.88,
          duration: 0.65,
          stagger: 0.055,
        },
        3,
      )
      .to(
        ".context-center",
        { autoAlpha: 1, scale: 0.83, y: -28, duration: 0.6 },
        3,
      )
      .to(".evolving-note", { autoAlpha: 1, duration: 0.45 }, 3.5)
      .to({}, { duration: 0.35 });
  });
  ScrollTrigger.refresh();
  restoreReadingPosition(reading);
  syncAmbientLoops();
}

$(".motion-toggle").addEventListener("click", () => {
  motionPaused = !motionPaused;
  userPausedMotion = motionPaused;
  try {
    localStorage.setItem(
      "dawnstar-motion",
      motionPaused ? "paused" : "enabled",
    );
  } catch {
    /* Session state still works. */
  }
  buildMotion({ preservePosition: true });
});
motionPreference.addEventListener("change", (event) => {
  motionPaused = event.matches || userPausedMotion;
  buildMotion({ preservePosition: true });
});
pinnedLayout.addEventListener("change", () => {
  closeMenu();
  buildMotion({ preservePosition: true });
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

$$(".approach-steps button").forEach((button) =>
  button.addEventListener("click", () => {
    const index = Number(button.dataset.step);
    if (approachTimeline?.scrollTrigger && !motionPaused) {
      const trigger = approachTimeline.scrollTrigger;
      const target =
        trigger.start + (trigger.end - trigger.start) * stageProgress[index];
      if (lenis) lenis.scrollTo(target, { duration: 0.75 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    } else showStaticStage(index);
  }),
);

const menuButton = $(".menu-toggle");
const mobileNav = $("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  mobileNav.hidden = open;
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Open navigation" : "Close navigation",
  );
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!$(".site-header").contains(event.target)) closeMenu();
});
$$('a[href^="#"]').forEach((anchor) =>
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    const scrollTarget = target.id === "main" ? $("#top") : target;
    if (lenis && !motionPaused)
      lenis.scrollTo(scrollTarget, { offset: 0, duration: 1.2 });
    else
      scrollTarget.scrollIntoView({
        behavior: motionPaused ? "instant" : "smooth",
      });
    history.replaceState(null, "", anchor.getAttribute("href"));
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }),
);

let period = "morning";
let selectedProduct = "gel";
const productProfiles = {
  gel: {
    name: "Daily gel-cream",
    image: "/images/curation-gel.webp",
    feel: "Lightweight",
    tradeoff: "Less cushioning than the rich cream.",
    light:
      "You chose a lighter feel. This example gel-cream matches that texture preference.",
    rich: "A lighter alternative to your rich-feel preference. You can still choose it if that trade-off suits you.",
  },
  cream: {
    name: "Rich moisture cream",
    image: "/images/curation-cream.webp",
    feel: "Rich and cushioning",
    tradeoff: "A heavier finish than the gel-cream.",
    light:
      "A richer alternative to your light-feel preference. Consider whether you enjoy a more cushioning finish.",
    rich: "You chose a richer feel. This example cream matches that texture preference.",
  },
};

function renderCuration() {
  const preference = $("#texture").value;
  $$(".product-option").forEach((button) => {
    const selected = button.dataset.product === selectedProduct;
    button.setAttribute("aria-pressed", String(selected));
    button.querySelector(".product-action").textContent = selected
      ? "Selected"
      : "Compare option";
  });
  const profile = productProfiles[selectedProduct];
  const matchesPreference =
    selectedProduct === (preference === "rich" ? "cream" : "gel");
  $("#curation-title").textContent = matchesPreference
    ? "Matches your texture preference."
    : "A different texture to consider.";
  $("#curation-reason").textContent = profile[preference];
  $("#choice-feel").textContent = profile.feel;
  $("#choice-tradeoff").textContent = profile.tradeoff;
  $("#routine-product-name").textContent = profile.name;
  $("#routine-product-image").src = profile.image;
  renderRoutine(false);
}

function setDemoView(view, moveFocus = false) {
  const reading = {
    element: $("#curation"),
    top: $("#curation").getBoundingClientRect().top,
  };
  const isProducts = view === "products";
  $("#product-panel").hidden = !isProducts;
  $("#routine-panel").hidden = isProducts;
  $("#demo-title").innerHTML = isProducts
    ? "One preference.<br>Two options."
    : "From your choice<br>to your routine.";
  $$(".experience-tabs button").forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.view === view)),
  );
  if (moveFocus)
    $(".experience-tabs [data-view='routine']").focus({ preventScroll: true });
  if (!motionPaused) {
    gsap.fromTo(
      isProducts ? ".decision-panel" : ".chosen-product img, .routine-plan",
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        clearProps: "transform,opacity",
        overwrite: true,
      },
    );
  }
  ScrollTrigger.refresh();
  lenis?.resize();
  // Refreshing the earlier pinned scene must not move the controls being used.
  restoreReadingPosition(reading);
  // A person entering from the bottom of the shortlist should see the new
  // view's title and controls, not only the bottom of the routine.
  if (moveFocus && $(".experience-tabs").getBoundingClientRect().top < 24) {
    const target =
      window.scrollY + $(".demo-brand").getBoundingClientRect().top - 24;
    if (lenis && !motionPaused) lenis.scrollTo(target, { duration: 0.65 });
    else
      window.scrollTo({
        top: target,
        behavior: motionPaused ? "instant" : "smooth",
      });
  }
}
$$(".experience-tabs button").forEach((button) =>
  button.addEventListener("click", () => setDemoView(button.dataset.view)),
);
$(".curation-continue").addEventListener("click", () =>
  setDemoView("routine", true),
);
$$(".product-option").forEach((button) =>
  button.addEventListener("click", () => {
    selectedProduct = button.dataset.product;
    renderCuration();
  }),
);
$("#texture").addEventListener("change", () => {
  selectedProduct = $("#texture").value === "rich" ? "cream" : "gel";
  renderCuration();
});
const routines = {
  morning: [
    ["Cleanse", "Your existing cleanser.", "drop"],
    ["Moisturize", "Your selected moisturizer.", "bottle"],
    ["Protect", "Your sunscreen, used as directed.", "sun"],
  ],
  evening: [
    ["Cleanse", "Your existing cleanser.", "drop"],
    ["Your care step", "Follow your product directions.", "moon"],
    ["Moisturize", "Your selected moisturizer.", "bottle"],
  ],
};
const insights = {
  everyday: "Keep track of how the new product fits with what you already use.",
  dry: "Does your usual moisturizer still feel comfortable on drier days?",
  warm: "Has warmer weather changed the texture you prefer?",
};
function renderRoutine(animate = true) {
  const weather = $("#weather").value;
  const steps = routines[period].map((step) => [...step]);
  steps[period === "morning" ? 1 : 2][1] =
    productProfiles[selectedProduct].name;
  $("#routine-steps").innerHTML = steps
    .map(
      ([title, note, icon], index) =>
        `<div class="routine-row"><span class="routine-number">0${index + 1}</span><div><h4>${title}</h4><p>${note}</p></div><span class="routine-icon" aria-hidden="true"><svg><use href="#${icon}"/></svg></span></div>`,
    )
    .join("");
  $("#routine-insight").textContent = insights[weather];
  $$(".routine-tabs button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.period === period),
    ),
  );
  if (animate && !motionPaused)
    gsap.fromTo(
      ".routine-row",
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, overwrite: true },
    );
}
$$(".routine-tabs button").forEach((button) =>
  button.addEventListener("click", () => {
    period = button.dataset.period;
    renderRoutine();
  }),
);
$("#weather").addEventListener("change", () => renderRoutine());
$(".copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("contact@dawnstarcorp.com");
    $(".copy-status").textContent = "Copied: contact@dawnstarcorp.com";
  } catch {
    $(".copy-status").textContent = "contact@dawnstarcorp.com";
  }
});
$$(".principle-list details").forEach((detail) =>
  detail.addEventListener("toggle", () => {
    ScrollTrigger.refresh();
    lenis?.resize();
  }),
);
$("#year").textContent = String(new Date().getFullYear());
renderCuration();
buildMotion();
document.fonts.ready.then(() => ScrollTrigger.refresh());
// External fragment navigation and browser history must also cancel any
// in-flight smooth scroll, just like the site's own navigation links do.
window.addEventListener("hashchange", () => {
  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(target, { immediate: true, force: true });
  } else target.scrollIntoView({ behavior: "instant" });
});
window.addEventListener("load", () => {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
    // Pin spacing is inserted after the browser's first fragment scroll.
    // Realign a directly opened section once its final layout is known.
    if (!initialHash || window.location.hash !== initialHash) return;
    const target = document.getElementById(initialHash.slice(1));
    if (!target) return;
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true });
      } else target.scrollIntoView({ behavior: "instant" });
    });
  });
});
