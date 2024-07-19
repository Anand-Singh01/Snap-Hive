import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import Topbar from "./components/Topbar";

const RootLayout = () => {
  return (
    <section className="home md:flex md:gap-4 border-orange-400">
      <div>
        <div className="mb-[2rem] md:w-fit">
          <Topbar />
        </div>
        <div className="">
          <div className="hidden md:block">
            <LeftSideBar />
          </div>
        </div>
      </div>
      <section className="w-full flex-1 md:mt-[3.5rem]">
        <Outlet />
      </section>
    </section>
  );
};

export default RootLayout;
