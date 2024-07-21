import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
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
      if (status === "succeeded") {
        navigate("/");
      }
      if (status === "failed") {
        alert("error creating post.");
      }
    } catch (error) {
      alert("server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex create-post-section flex-col items-center gap-4 overflow-y-auto border-white p-3">
      <div className="create-post-heading-container">
        {/* <AddPhotoAlternateOutlinedIcon
          sx={{ width: "2.2rem", height: "2.2rem" }}
        /> */}
        <p className="create-post-title">Create Post</p>
      </div>
      <PostForm func={createPost_click} />
    </section>
  );
};

export default CreatePost;
