import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import bow from "../../assets/images/bow.png";
import pattern from "../../assets/images/patern.jpg";
import BackgroundImage from "../../components/BackgroundImage";
import LoginForm from "../../components/LoginForm";
import WelcomeDiv from "../../components/WelcomeDiv";
import { bounce, fade_zoom } from "../../utils/animate";

const LoginPage = () => {
  const imgRef = useRef(null);
  useGSAP(() => {
    bounce(".login-form-container");
    fade_zoom(imgRef.current!);
  }, []);

  return (
    <section className="login-section">
      <BackgroundImage pattern={pattern} />
      <WelcomeDiv />
      <div>
        <div className="login-form-container">
          <img ref={imgRef} src={bow} alt="" />
          <h1>Sign in to your account</h1>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
