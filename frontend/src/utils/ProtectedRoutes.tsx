import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return (
      <div className="h-screen">
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
