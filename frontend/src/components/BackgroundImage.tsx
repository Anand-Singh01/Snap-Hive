import { useGSAP } from "@gsap/react";
import React from "react";
import { fade_zoom } from "../utils/animate";

interface ImageProps {
  pattern: string;
}

const BackgroundImage: React.FC<ImageProps> = React.memo(
  ({ pattern }) => {
    useGSAP(() => {
      fade_zoom(".img-container");
    }, []);

    return (
      <div
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
        className="img-container"
      ></div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.pattern === nextProps.pattern;
  }
);

export default BackgroundImage;
