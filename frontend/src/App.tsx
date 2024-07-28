import { Route, Routes } from "react-router-dom";
import AllUsers from "./Pages/AllUsers/AllUsers";
import CreatePost from "./Pages/CreatePost/CreatePost";
import EditPost from "./Pages/EditPost/EditPost";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Explore from "./Pages/Explore/Explore";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Profile from "./Pages/Profile/Profile";
import Saved from "./Pages/Saved/Saved";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import RootLayout from "./RootLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/post-details/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
