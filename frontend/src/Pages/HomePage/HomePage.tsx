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
  const posts = useAppSelector((state) => state.post.posts);
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
    if (posts.length === 0 && userId) {
      fetchPosts();
    }
  }, [dispatch, posts.length, userId]);

  return (
    <section className="">
      <h1 className="create-post-title home-heading">Home Feed</h1>
      <div className="posts-container posts-container-md">
        {status === "loading"
          ? [1, 2, 3, 4].map((_, index) => <PostSkeleton key={index} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  );
};

export default HomePage;
