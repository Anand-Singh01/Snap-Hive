import gsap from "gsap";

export const bounce = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    y: 0,
    ease: "bounce",
    duration: 1,
  });
};

export const bounce2 = (element: HTMLElement | null) => {
  gsap.fromTo(
    element,
    { y: -10, opacity: 0 }, // Start position (adjust as needed)
    {
      y: 0,
      opacity: 1,
      ease: "bounce.out",
      duration: 1.5,
      stagger: 1,
    }
  );
};
export const fade_zoom = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    scale: 1,
    ease: "circ.out",
    duration: 3,
  });
};
export const zoom = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    scale: 2,
    ease: "circ.out",
    duration: 1,
  });
};
export const fade_up = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    y: 0,
    x: 0,
    ease: "power1.inOut",
  });
};
export const oneByOne = (className: string) => {
  gsap.to(className, {
    x: 0,
    delay: 0.3,
    opacity: 1,
    stagger: 0.15,
  });
};
