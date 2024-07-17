import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { fade_up } from "../../utils/animate";
import {
  fetchRecentPosts,
  getLikedPosts,
} from "../../utils/api-communicators/post";

const HomePage = () => {
  useGSAP(() => {
    fade_up(".create-post-heading-container");
  }, []);
  const posts = useAppSelector((state) => state.post.posts);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppSelector((state) => state.user.user.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res1 = await dispatch(fetchRecentPosts());
        const res2 = await dispatch(getLikedPosts());
        if (
          fetchRecentPosts.fulfilled.match(res1) &&
          getLikedPosts.fulfilled.match(res2)
        ) {
          setIsLoading(false);
        }
        if (
          fetchRecentPosts.rejected.match(res2) ||
          getLikedPosts.rejected.match(res2)
        ) {
          setIsLoading(false);
          alert("error");
        }
      } catch (error) {
        alert("server Error");
      }
    };
    if (userId) {
      fetchPosts();
    }
  }, [dispatch, userId]);

  return (
    <section className="">
      <div>
        <div className="create-post-heading-container">
          <h1 className="create-post-title">Home Feed</h1>
          <div className="posts-container">
            {posts.map((post) => {
              return <PostCard post={post} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
