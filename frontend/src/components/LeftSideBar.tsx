import { useGSAP } from "@gsap/react";
import { useAppSelector } from "../state/hooks";
import { fade_up, oneByOne } from "../utils/animate";
import LinksList from "./LinksList";
import Logout from "./Logout";
import ProfileLogo from "./ProfileLogo";

const LeftSideBar = () => {
  useGSAP(() => {
    oneByOne(".side-nav-link-container");
    fade_up(".sidebar-profile-container");
  }, []);
  const name = useAppSelector((state) => state.user.user.name);
  const username = useAppSelector((state) => state.user.user.username);
  return (
    <nav className="leftsidebar">
      <div>
        <div className="sidebar-profile-container">
          <ProfileLogo />
          <div>
            <p className="text-[1.1rem] font-bold">{name}</p>
            <p className="text-[0.9rem] text-gray-400 font-semibold">
              @{username}
            </p>
          </div>
        </div>
        <LinksList /> 
        <p className="sidebar-profile-container translate-y-5 border-gray-50 border-[0.1px]"/>
        <div className="side-nav-link-container mt-[2rem] text-purple-500 font-semibold">
          <Logout title={'logout'}/>
        </div>
      </div>
    </nav>
  );
};

export default LeftSideBar;
