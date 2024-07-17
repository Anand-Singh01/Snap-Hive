import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const user: boolean = true;
  return (
    <div className="">{user ? <Outlet /> : <Navigate to={"/login"} />}</div>
  );
};

export default ProtectedRoutes;
