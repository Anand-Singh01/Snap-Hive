// This component makes a smooth transition from blurry image to an optimized one
import { useState } from "react";
import "../css/index.css";
interface blurEffect {
  src: string;
  placeholder: string;
}
const BlurImage = ({ src, placeholder }: blurEffect) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="image-container">
      {/* dummy image */}
      <img
        loading="lazy"
        src={placeholder}
        className={`image ${loaded ? "image-hidden" : "image-blur"}`}
        alt=""
      />
      {/* Optimized image */}
      <img
        loading="lazy"
        src={src}
        className={`image ${loaded ? "image-shown" : "image-hidden"}`}
        onLoad={handleImageLoad}
        alt=""
      />
    </div>
  );
};
export default BlurImage;
