import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateLike } from "../../state/slices/postSlice";
import { likeAPost } from "../../utils/api-communicators/post";
interface Likes {
  totalLikes: number;
  postId: string;
}
const LikePost: React.FC<Likes> = (post) => {
  const likedPosts = useAppSelector((state) => state.post.likedPosts);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const like_Click = async () => {
    isLiked
      ? dispatch(updateLike({ type: "remove", postId: post.postId }))
      : dispatch(updateLike({ type: "add", postId: post.postId }));
    setIsLiked(!isLiked);
    try {
      const res = await dispatch(likeAPost({ postId: post.postId }));
      if (likeAPost.rejected.match(res)) {
        alert("server error");
      }
    } catch (error) {
      alert("server error");
    }
  };
  useEffect(() => {
    likedPosts.forEach(({ id }) => {
      if (id === post.postId) {
        setIsLiked(true);
      }
    });
  }, [likedPosts, post.postId]);
  return (
    <div className="flex items-center gap-1">
      <div onClick={like_Click}>
        {isLiked ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ color: "#c3a0ff" }} />
        )}
      </div>
      <p className="font-semibold">{post.totalLikes}</p>
    </div>
  );
};

export default LikePost;
