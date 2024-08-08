import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CommentsList from "../../components/comment/CommentsList";
import Loader from "../../components/Loader";
import CommentInput from "../../components/PostCard/CommentInput";
import LikePost from "../../components/PostCard/LikePost";
import SavePost from "../../components/PostCard/SavePost";
import PostInfo from "../../components/PostInfo";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetFetchCommentStatus } from "../../state/slices/commentSlice";
import { fetchAllComments } from "../../utils/api-communicators/post";
const PostDetails = () => {
  const { id } = useParams();
  const [postId] = useState<string | null>(id || null);
  const userId = useAppSelector((state) => state.user.user.userId);
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    postId ? state.post.postsById[postId] : null
  );

  const status = useAppSelector((state) => state.comment.fetchCommentStatus);
  const comments = useAppSelector((state) => state.comment.commentsById[id!]);

  useEffect(() => {
    if (!comments) {
      dispatch(fetchAllComments({ postId: id! }));
    }
  }, [dispatch, comments, id]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      dispatch(resetFetchCommentStatus());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <p>Error loading comments. Please try again later.</p>;
  }

  if (!post) {
    return <Navigate to={"/"} />;
  }


  return (
    <div className="flex justify-center">
      <div className="w-fit">
        <PostInfo post={post} userId={userId} />
        <div className="p-[0.5rem] space-y-[1rem] bg-[#111827]">
          <div>
            <div className="flex justify-between">
              <LikePost
                // totalLikes={post.totalLikes}
                isLiked={post.isLiked}
                postId={post.id}
              />
              <SavePost isSaved={post.isSaved} postId={post.id} />
            </div>
          </div>
        </div>
        {!comments && (status === "loading" || status === "idle") ? (
          <Loader />
        ) : (
          <div className="px-3 rounded-b-lg space-y-4 bg-gradient-to-b from-[#2b5ecb3f] to-[#07102457]">
            <CommentInput
              displayCommentOnTop={false}
              name={post.postedBy.name}
              postId={postId!}
            />
            <hr className="border-[#33436f]" />
            <div className="overflow-y-scroll h-[150px]">
              <CommentsList comments={comments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
