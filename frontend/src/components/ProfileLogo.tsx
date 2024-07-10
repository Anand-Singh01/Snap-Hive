import { useAppSelector } from "../state/hooks";

const ProfileLogo = () => {
  const imageUrl = useAppSelector((state) => state.user.user.imageUrl);
  return (
    <div className="cursor-pointer">
      <img
        className="sm:w-[2.5rem] w-[2rem] rounded-[5px]"
        src={imageUrl || ""}
        alt=""
      />
    </div>
  );
};

export default ProfileLogo;
