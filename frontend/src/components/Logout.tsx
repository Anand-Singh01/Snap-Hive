import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { logout } from "../state/slices/userSlice";

const Logout = ({title}:{title:string | ''}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div title="logout" className="cursor-pointer flex gap-3" onClick={signOut}>
      <ExitToAppIcon sx={{ color: "#8d4efa" }} />
      <p>{title}</p>
    </div>
  );
};

export default Logout;
