import gsap from "gsap";

export const bounce = (className: string) => {
  gsap.to(className, {
    opacity: 1,
    y: 0,
    ease: "bounce",
    duration: 1,
  });
};


export const scaleUpPost = (element: HTMLAnchorElement) => {
  gsap.to(element, {
    duration: 0.1,
    boxShadow: "0 0 10px 1px #DCAEFF",
    // scale: 1.01,
    ease: "power1.inOut",
  });
};

export const bounceCard = (element: HTMLAnchorElement) => {
  gsap.to(element, {
    duration: 0.1,
    boxShadow: "0 0 10px 1px #DCAEFF",
    // scale: 0.95,
    ease: "power1.inOut",
  });
};

export const scaleDownPost = (element: HTMLAnchorElement) => {
  gsap.to(element, {
    duration: 0.3,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    scale: 1,
    ease: "power1.inOut",
  });
};

export const scaleUp = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.1,
    ease: "circ",
  });
};

export const scaleDown = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    ease: "circ",
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
