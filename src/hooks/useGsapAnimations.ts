import { useEffect } from "react";
import { gsap } from "gsap";

export const useGsapAnimations = (dependency?: unknown) => {
  useEffect(() => {
    // Fade & Reveal animation for sections
    const elements = document.querySelectorAll(".reveal");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: undefined, // Standard GSAP entry
        }
      );
    });

    // Stagger animation for cards
    const staggerElements = document.querySelectorAll(".reveal-stagger");
    if (staggerElements.length > 0) {
      gsap.fromTo(
        staggerElements,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [dependency]);
};

export default useGsapAnimations;
