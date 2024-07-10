import LeftSideBar from "../../components/LeftSideBar";
import Topbar from "../../components/Topbar";
const HomePage = () => {
  return (
    <section className="home">
      <div className="mb-[2rem]">
        <Topbar />
      </div>
      <div className="flex gap-4">
        <div className="hidden md:block">
          <LeftSideBar />
        </div>
        <div className="flex-1 text-center">Home</div>
      </div>
    </section>
  );
};

export default HomePage;
