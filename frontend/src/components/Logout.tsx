import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { logout } from "../state/slices/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="cursor-pointer" onClick={signOut}>
      <ExitToAppIcon sx={{ color: "#8d4efa" }} />
    </div>
  );
};

export default Logout;
