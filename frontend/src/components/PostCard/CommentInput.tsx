import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  resetAddCommentStatus,
  updateReplyCount,
} from "../../state/slices/commentSlice";
import { updateCommentCount } from "../../state/slices/postSlice";
import { resetAddReplyStatus } from "../../state/slices/replySlice";
import { addComment, addReply } from "../../utils/api-communicators/post";

interface IComment {
  name: string;
  postId: string;
  displayCommentOnTop: boolean;
}
const CommentInput: React.FC<IComment> = (post) => {
  const utilityReplyState = useAppSelector(
    (state) => state.utilitySlice.utilityReply
  );
  const [isReply, setIsReply] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string>("");
  const [yourComments, setYourComments] = useState<string[]>([]);
  const addReplyStatus = useAppSelector(
    (state) => state.replySlice.addReplyStatus
  );
  const dispatch = useAppDispatch();
  const addCommentStatus = useAppSelector(
    (state) => state.comment.addCommentStatus
  );

  const addComment_click = async () => {
    if (comment.trim() !== "") {
      setYourComments([comment, ...yourComments]);
      setComment("");
      await dispatch(addComment({ comment, postId: post.postId }));
    }
  };

  const addReply_click = async () => {
    if (comment.trim() !== "" && utilityReplyState) {
      setComment("");
      await dispatch(
        addReply({ commentId: utilityReplyState.mainCommentId, reply: comment })
      );
    }
  };

  useEffect(() => {
    if (addReplyStatus === "succeeded" && utilityReplyState) {
      dispatch(
        updateReplyCount({
          commentId: utilityReplyState.mainCommentId,
          postId: post.postId,
          command: "add",
        })
      );
      dispatch(resetAddReplyStatus());
    } else if (addReplyStatus === "failed") {
      dispatch(resetAddReplyStatus());
    }
    if (addCommentStatus === "succeeded") {
      dispatch(updateCommentCount({ postId: post.postId, command: "add" }));
      dispatch(resetAddCommentStatus());
    } else if (addCommentStatus === "failed") {
      dispatch(resetAddCommentStatus());
    }
  }, [
    addCommentStatus,
    post.postId,
    addReplyStatus,
    utilityReplyState,
    dispatch,
  ]);

  useEffect(() => {
    if (utilityReplyState) {
      setComment(utilityReplyState.replyToName);
      setIsReply(true);
      textAreaRef.current?.focus();
    }
  }, [utilityReplyState]);
  return (
    <div>
      {post.displayCommentOnTop &&
        yourComments.length > 0 &&
        yourComments.map((item) => {
          return (
            <div className="flex gap-2">
              <p className="font-bold">{post.name}</p>
              <p>{item}</p>
            </div>
          );
        })}
      <div className="flex gap-3">
        <textarea
          ref={textAreaRef}
          className="flex-grow bg-transparent focus:outline-none min-w-0 resize-none overflow-scroll max-h-20"
          rows={1}
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
        {comment.trim() != "" && (
          <button
            disabled={comment.trim() === ""}
            onClick={isReply ? addReply_click : addComment_click}
            className={`self-start text-blue-400`}
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
