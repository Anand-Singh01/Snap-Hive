import Skeleton from "@mui/material/Skeleton";
import { useAppSelector } from "../state/hooks";
const ProfileLogo = () => {
  const profilePic = useAppSelector((state) => state.user.user.profilePic);
  return (
    <div className="cursor-pointer">
      {profilePic ? (
        <div className="sm:w-[60px] sm:h-[60px] rounded-full w-[50px] h-[50px] overflow-hidden">
          <img className="post-image" src={profilePic || ""} alt="profilePic" />
        </div>
      ) : (
        <Skeleton
          variant="circular"
          sx={{
            bgcolor: "#c3a0ff",
            width: 35,
            height: 35,
          }}
        />
      )}
    </div>
  );
};

export default ProfileLogo;
