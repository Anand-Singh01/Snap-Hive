import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import PostSkeleton from "../../components/PostCard/PostSkeleton";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { fade_up } from "../../utils/animate";
import { fetchRecentPosts } from "../../utils/api-communicators/post";

const HomePage = () => {
  useGSAP(() => {
    fade_up(".home-heading");
  }, []);

  const posts = useAppSelector((state) => state.post.postsById);
  const status = useAppSelector((state) => state.post.fetchPostStatus);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(fetchRecentPosts());
      } catch (error) {
        alert("server Error");
      }
    };
    if (userId && status === "idle") {
      fetchPosts();
    }
    // return () => {
    //   // Cleanup function: Reset the post status to idle when the component unmounts or dependencies change.
    //   dispatch(resetPostStatus("fetch"));
    // };
  }, [dispatch, userId, status]);

  return (
    <section className="">
      <h1 className="create-post-title home-heading">Home Feed</h1>
      <div className="posts-container posts-container-md relative">
        {status === "loading"
          ? [1, 2, 3, 4].map((_, index) => <PostSkeleton key={index} />)
          : Object.values(posts).map((post, index) => (
              <div
                key={post.id}
                className="w-[90%] sm:w-[50%] max-w-[350px] flex flex-col justify-center items-center"
              >
                <PostCard index={index} post={post} />
                <hr className="w-full opacity-30 my-4" />
              </div>
            ))}
      </div>
    </section>
  );
};
export default HomePage;
