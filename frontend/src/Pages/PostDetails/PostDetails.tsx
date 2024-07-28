import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CardInfo from "../../components/PostCard/CardInfo";
import LikePost from "../../components/PostCard/LikePost";
import PostCaption_tag from "../../components/PostCard/PostCaption_tag";
import SavePost from "../../components/PostCard/SavePost";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
const PostDetails = () => {
  const { id } = useParams();

  const [postId, setPostId] = useState<string | null>(id || null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user.userId);
  const status = useAppSelector((state) => state.post.fetchPostStatus);
  const post = useAppSelector((state) =>
    postId ? state.post.postsById[postId] : null
  );

  if (!post) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="items-center w-fit mx-auto">
      <div>
        <div className="h-[300px] overflow-hidden relative">
          <img
            className="w-full h-full object-cover object-center"
            src={post.postImage}
            alt=""
          />
        </div>
        <div className="p-[0.5rem] space-y-[1rem] rounded-lg">
          <div className="flex items-center justify-between">
            <CardInfo
              profilePic={post.postedBy.profile.profilePic}
              postLocation={post.location}
              createdAt={post.createdAt}
              postedBy={post.postedBy.name}
            />
            {userId === post.postedBy.id && (
              <div className="flex items-center gap-3">
                <Link to={`/update-post/${post.id}`} className="cursor-pointer">
                  <EditOutlinedIcon sx={{ color: "#DBDBDB" }} />
                </Link>
                <Link to={`/update-post/${post.id}`} className="cursor-pointer">
                  <DeleteForeverIcon sx={{ color: "#FD6991" }} />
                </Link>
              </div>
            )}
          </div>
          <div>
            <PostCaption_tag caption={post.caption} tags={post.tags} />
          </div>
          <div>
            <div className="flex justify-between">
              <LikePost
                totalLikes={post.totalLikes}
                isLiked={post.isLiked}
                postId={post.id}
              />
              <SavePost isSaved={post.isSaved} postId={post.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
