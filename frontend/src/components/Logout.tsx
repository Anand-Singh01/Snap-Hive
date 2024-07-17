import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { logoutUser } from "../utils/api-communicators/user";

const Logout = ({ title }: { title: string | "" }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(res)) {
      navigate("/login");
    }
    if (logoutUser.rejected.match(res)) {
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
