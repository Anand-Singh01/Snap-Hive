import { useGSAP } from "@gsap/react";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetPostStatus } from "../../state/slices/postSlice";
import { fade_up } from "../../utils/animate";
import { updatePost } from "../../utils/api-communicators/post";
import { ICreatePostData } from "../../utils/constants/interfaces";

const EditPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const postData = useAppSelector((state) => state.post.postsById[id!]);

  const status = useAppSelector((state) => state.post.updatePostStatus);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
      dispatch(resetPostStatus("update"));
    }
    if (status === "failed") {
      alert("error updating post.");
      dispatch(resetPostStatus("update"));
    }
  }, [dispatch, status, navigate]);

  useGSAP(() => {
    fade_up(".create-post-heading-container");
  }, []);

  const editPost_click = async (
    data: ICreatePostData,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await dispatch(updatePost({ id, payload: data }));
    } catch (error) {
      alert("server error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!postData) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
      <div className="create-post-heading-container">
        {/* <AddPhotoAlternateOutlinedIcon
          sx={{ width: "2.2rem", height: "2.2rem" }}
        /> */}
        <p className="create-post-title">Edit Post</p>
      </div>
      <div className="p-3 w-full overflow-y-auto postFormContainer">
        <PostForm
          formType="edit-post"
          func={editPost_click}
          caption={postData.caption}
          location={postData.location}
          imageUrl={postData.postImage}
          tags={postData.tags}
        />
      </div>
    </section>
  );
};

export default EditPost;
