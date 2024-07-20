// import { ReactNode, useEffect, useState } from "react";
// import { useAppDispatch } from "../../state/hooks";
// import { checkAuthStatus } from "../../utils/api-communicators/user";
// import Loader from "../Loader";

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const dispatch = useAppDispatch();
//   const [isAuthChecked, setIsAuthChecked] = useState(false);

//   useEffect(() => {
//     const verifyAuth = async () => {
//       await dispatch(checkAuthStatus());
//       setIsAuthChecked(true);
//     };
//     verifyAuth();
//   }, [dispatch]);

//   if (!isAuthChecked) {
//     return <Loader />;
//   }

//   return <>{children}</>;
// };

// export default AuthProvider;
