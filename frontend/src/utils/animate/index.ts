import gsap from "gsap";

export const bounce = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    y: 0,
    ease: "bounce",
    duration: 1,
  });
};

export const fade_zoom = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    scale: 1,
    ease: "circ.out",
    duration: 1,
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
