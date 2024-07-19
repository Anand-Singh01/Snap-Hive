import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState } from "react";
import { useAppDispatch } from "../../state/hooks";
import { updateLike } from "../../state/slices/postSlice";
import { likeAPost } from "../../utils/api-communicators/post";
interface Likes {
  totalLikes: number;
  postId: string;
  isLiked: boolean;
}
const LikePost: React.FC<Likes> = (post) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(post.isLiked);

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
  return (
    <div className="flex items-center gap-1">
      <div className="cursor-pointer" onClick={like_Click}>
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
