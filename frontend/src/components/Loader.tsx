import { useGSAP } from "@gsap/react";
import { ThreeDots } from "react-loader-spinner";
import { zoom } from "../utils/animate";
const Loader = () => {
  useGSAP(() => {
    zoom(".loader");
  }, []);
  return (
    <div className="loader px-3 flex justify-center items-center">
      <ThreeDots
        visible={true}
        height="25"
        width="25"
        color="#ffff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
