import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { resetPostState } from "../state/slices/postSlice";
import { resetUserState } from "../state/slices/userSlice";
import { checkAuthStatus } from "./api-communicators/user";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const authCheckState = useAppSelector((state) => state.user.authStatus);
  const initialCheck = useRef(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await dispatch(checkAuthStatus());
        if (checkAuthStatus.rejected.match(res)) {
          dispatch(resetUserState());
          dispatch(resetPostState());
        }
      } catch (error) {
        return <Navigate to={"/login"} />;
      } finally {
        initialCheck.current = true;
      }
    };
    if (!isAuthenticated && !initialCheck.current) {
      checkAuth();
    }
  }, [dispatch, isAuthenticated]);

  if (isAuthenticated && authCheckState === "succeeded") {
    return (
      <div className="h-screen">
        <Outlet />
      </div>
    );
  }
  if (authCheckState === "failed") {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
