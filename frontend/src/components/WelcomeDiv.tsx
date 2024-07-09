import { useGSAP } from "@gsap/react";
import { bounce } from "../utils/animate";

const WelcomeDiv = () => {
  useGSAP(() => {
    bounce(".info-form-container");
  }, []);

  return (
    <div className="info-form-container">
      <h1>
        Welcome to <span>Snap Hive !</span>
      </h1>
      <p>
        Snap Hive is your digital hive for sharing moments, exploring new
        content, and staying connected with friends and followers.
      </p>
    </div>
  );
};
export default WelcomeDiv;
