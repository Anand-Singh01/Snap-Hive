import profile from "../assets/images/profile.webp";
import { useAppSelector } from "../state/hooks";
import Button from "./Button";
const SignUpSuccess = () => {
  const username = useAppSelector((state) => state.user.user.username);
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <div className="w-[25rem] h-[25rem] flex border-[1px] flex-col items-center rounded-lg">
        <img className="w-[10rem] rounded-xl" src={profile} alt="" />
        <p className="italic text-[2rem] font-bold">Thank you for joining us</p>
        <p className="text-2xl">Anand</p>
        <p className="my-[3rem]"></p>
        <Button type="button" className="btn" children={"Continue"}></Button>
      </div>
    </section>
  );
};

export default SignUpSuccess;
