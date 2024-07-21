import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { checkAuthStatus } from "./api-communicators/user";

const ProtectedRoute = () => {
  const state = useAppSelector((state) => state.user.isAuthenticated);
  const authCheckState = useAppSelector((state) => state.user.authStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus());
      } catch (error) {
        return <Navigate to={"/login"} />;
      }
    };
    if (!state) {
      checkAuth();
    }
  }, [state, dispatch]);

  if (state && authCheckState === "succeeded") {
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
