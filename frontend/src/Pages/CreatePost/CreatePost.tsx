import { useGSAP } from "@gsap/react";
import PostForm from "../../components/PostForm";
import { fade_up } from "../../utils/animate";
const CreatePost = () => {
  useGSAP(() => {
    fade_up(".create-post-heading-container");
  }, []);
  return (
    <section className="flex flex-col items-center gap-4">
      <div className="create-post-heading-container">
        {/* <AddPhotoAlternateOutlinedIcon
          sx={{ width: "2.2rem", height: "2.2rem" }}
        /> */}
        <p className="create-post-title">Create Post</p>
      </div>
      <PostForm />
    </section>
  );
};

export default CreatePost;
