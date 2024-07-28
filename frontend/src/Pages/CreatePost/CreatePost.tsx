import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetPostStatus } from "../../state/slices/postSlice";
import { fade_up } from "../../utils/animate";
import { createPost } from "../../utils/api-communicators/post";
import { ICreatePostData } from "../../utils/constants/interfaces";
const CreatePost = () => {
  useGSAP(() => {
    fade_up(".create-post-heading-container");
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.post.createPostStatus);

  const createPost_click = async (
    data: ICreatePostData,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await dispatch(createPost(data));
    } catch (error) {
      alert("server error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
      dispatch(resetPostStatus("create"));
    }
    if (status === "failed") {
      alert("error creating post.");
      dispatch(resetPostStatus("create"));
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="flex create-post-section flex-col items-center gap-4 border-white p-3">
      <div className="create-post-heading-container">
        {/* <AddPhotoAlternateOutlinedIcon
          sx={{ width: "2.2rem", height: "2.2rem" }}
        /> */}
        <p className="create-post-title">Create Post</p>
      </div>
      <div className="p-3 w-full overflow-y-auto">
        <PostForm formType="create-post" func={createPost_click} />
      </div>
    </section>
  );
};

export default CreatePost;
