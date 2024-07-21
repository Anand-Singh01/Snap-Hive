import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../state/hooks";
import { updateLike } from "../../state/slices/postSlice";
import { bounce2 } from "../../utils/animate";
import { likeAPost } from "../../utils/api-communicators/post";
interface Likes {
  totalLikes: number;
  postId: string;
  isLiked: boolean;
}
const LikePost: React.FC<Likes> = (post) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const divRef = useRef<HTMLDivElement>(null);
  const like_Click = async () => {
    bounce2(divRef.current);
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
      <div ref={divRef} className="cursor-pointer like" onClick={like_Click}>
        {isLiked ? (
          <div className="hover:opacity-65">
            <FavoriteIcon sx={{ color: "red" }} />
          </div>
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ color: "#c3a0ff" }} />
        )}
      </div>
      <p className="font-semibold">{post.totalLikes}</p>
    </div>
  );
};

export default LikePost;
