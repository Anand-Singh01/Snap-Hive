import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import { useAppDispatch } from "./state/hooks";
import { updateUserInfo } from "./state/slices/userSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currPath = window.location.pathname;

  useEffect(() => {
    if (currPath != "/login" && currPath != "/signUp") {
      const userInfo = localStorage.getItem("user-info");
      if (userInfo) {
        const { username, email, imageUrl, name } = JSON.parse(userInfo);
        dispatch(updateUserInfo({ username, email, imageUrl, name }));
      } else {
        navigate("/login");
      }
    }
  }, [dispatch, navigate, currPath]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Explore" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
