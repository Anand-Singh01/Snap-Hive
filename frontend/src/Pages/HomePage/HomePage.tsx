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
  const status = useAppSelector((state) => state.post.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(fetchRecentPosts());
      } catch (error) {
        alert("server Error");
      }
    };
    fetchPosts();
  }, [dispatch]);

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
