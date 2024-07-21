import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { resetPostState } from "../state/slices/postSlice";
import { resetUserState } from "../state/slices/userSlice";
import { logoutUser } from "../utils/api-communicators/user";

const Logout = ({ title }: { title: string | "" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const status = useAppSelector((state) => state.user.logoutStatus);
  const signOut = async () => {
    try {
      const res = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(res)) {
        dispatch(resetUserState());
        dispatch(resetPostState());
        navigate("/login");
      }
    } catch (error) {
      alert("server error");
    }
  };

  return (
    <div title="logout" className="cursor-pointer flex gap-3" onClick={signOut}>
      <ExitToAppIcon sx={{ color: "#8d4efa" }} />
      <p>{title}</p>
    </div>
  );
};

export default Logout;
