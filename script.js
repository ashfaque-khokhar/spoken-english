/**
 * Core 1,000 Spoken English Words — Collapsible sections
 * Handles accordion open/close with smooth height animation and accessibility.
 */

(function () {
  "use strict";

  const accordion = document.querySelector(".accordion");
  if (!accordion) return;

  const triggers = accordion.querySelectorAll(".accordion-trigger");
  const panels = accordion.querySelectorAll(".accordion-panel");
  const items = accordion.querySelectorAll(".accordion-item");

  function getPanel(trigger) {
    const id = trigger.getAttribute("aria-controls");
    return id ? document.getElementById(id) : null;
  }

  function openPanel(trigger, panel, item) {
    const content = panel.querySelector(".panel-content");
    const startHeight = panel.offsetHeight;
    const endHeight = content ? content.scrollHeight : 0;

    trigger.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
    item.setAttribute("data-open", "true");

    panel.style.height = startHeight + "px";
    panel.style.overflow = "hidden";

    requestAnimationFrame(function () {
      panel.style.height = endHeight + "px";
    });

    const onTransitionEnd = function () {
      panel.removeEventListener("transitionend", onTransitionEnd);
      panel.style.height = "";
      panel.style.overflow = "";
    };
    panel.addEventListener("transitionend", onTransitionEnd);
  }

  function closePanel(trigger, panel, item) {
    const content = panel.querySelector(".panel-content");
    const startHeight = panel.offsetHeight;

    trigger.setAttribute("aria-expanded", "false");
    item.setAttribute("data-open", "false");

    panel.style.height = startHeight + "px";
    panel.style.overflow = "hidden";

    requestAnimationFrame(function () {
      panel.style.height = "0px";
    });

    const onTransitionEnd = function () {
      panel.removeEventListener("transitionend", onTransitionEnd);
      panel.setAttribute("hidden", "");
      panel.style.height = "";
      panel.style.overflow = "";
    };
    panel.addEventListener("transitionend", onTransitionEnd);
  }

  function toggle(trigger) {
    const panel = getPanel(trigger);
    const item = trigger.closest(".accordion-item");
    if (!panel || !item) return;

    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closePanel(trigger, panel, item);
    } else {
      openPanel(trigger, panel, item);
    }
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      toggle(trigger);
    });

    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(trigger);
      }
    });
  });

  // Optional: open first section by default for a friendlier first view
  const firstTrigger = triggers[0];
  if (firstTrigger) {
    const firstPanel = getPanel(firstTrigger);
    const firstItem = firstTrigger.closest(".accordion-item");
    if (firstPanel && firstItem) {
      firstPanel.removeAttribute("hidden");
      firstTrigger.setAttribute("aria-expanded", "true");
      firstItem.setAttribute("data-open", "true");
    }
  }
})();
