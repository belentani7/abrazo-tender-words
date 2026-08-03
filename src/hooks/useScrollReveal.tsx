import { useEffect } from "react";

/**
 * Adds `is-visible` class to all `.reveal` elements as they enter the viewport.
 * Re-runs whenever `dep` changes (e.g., when changing section / language).
 */
export const useScrollReveal = (dep?: unknown) => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [dep]);
};
