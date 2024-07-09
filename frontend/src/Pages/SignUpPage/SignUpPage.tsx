import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import bow from "../../assets/images/bow.png";
import pattern from "../../assets/images/pattern2.jpg";
import BackgroundImage from "../../components/BackgroundImage";
import SignUpForm from "../../components/SignUpForm";
import WelcomeDiv from "../../components/WelcomeDiv";
import { bounce, fade_zoom } from "../../utils/animate";

const SignUpPage = () => {
  const imgRef = useRef(null);
  useGSAP(() => {
    bounce(".login-form-container");
    fade_zoom(imgRef.current!);
  }, []);
  return (
    <div className="">
      <section className="login-section">
        <BackgroundImage pattern={pattern} />
        <WelcomeDiv />
        <div>
          <div className="login-form-container">
            <img ref={imgRef} src={bow} alt="" />
            <h1>Sign up to your account</h1>
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
