import { useGSAP } from "@gsap/react";
import logo from "../assets/images/logo.png";
import { fade_up } from "../utils/animate";
import Logout from "./Logout";
import ProfileLogo from "./ProfileLogo";
const Topbar = () => {
  useGSAP(() => {
    fade_up(".logo_title");
    fade_up(".logout-logo");
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="logo_title">
          <img className="sm:w-[2.5rem] w-[2rem]" src={logo} alt="app logo" />
          <p className="sm:text-lg text-md font-bold">SnapHive</p>
        </div>
        <div className="logout-logo flex items-center gap-[3rem]">
          <Logout/>
          <ProfileLogo />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
