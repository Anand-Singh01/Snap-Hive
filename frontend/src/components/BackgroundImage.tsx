import { useGSAP } from "@gsap/react";
import { fade_zoom } from "../utils/animate";
interface Image {
  pattern: string;
}
const BackgroundImage = ({ pattern }: Image) => {
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
};

export default BackgroundImage;
