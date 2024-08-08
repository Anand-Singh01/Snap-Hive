import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import React, { useState } from "react";
import { useAppDispatch } from "../../state/hooks";
import { updateUtilityReplyState } from "../../state/slices/utilitySlice";
import { IComment } from "../../utils/constants/interfaces";
import { timeAgo } from "../../utils/constants/shared";
interface comment {
  comment: IComment;
}
const CommentShape: React.FC<comment> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const disspatch = useAppDispatch();
  
  return (
    <>
      <div className="flex items-center gap-3 mb-[1.2rem] max-w-[330px]">
        <div className="rounded-full w-[40px] h-[40px] overflow-hidden shrink-0">
          <img
            className="post-image"
            src={comment.commentBy.profile.profilePic}
            alt="profileImage"
          />
        </div>
        <div className="flex gap-3">
          <p>
            <span className="font-semibold hover:underline text-[1rem] mr-2">
              {comment.commentBy.name}
            </span>
            {comment.comment}
            <div className="text-gray-500 text-[0.8rem] flex gap-3 font-semibold">
              <p>{timeAgo(comment.createdAt)}</p>
              <p
                onClick={() => {
                  dispatch(
                    updateUtilityReplyState({
                      mainCommentId: comment.id,
                      replyToName: "@" + comment.commentBy.username + " ",
                    })
                  );
                }}
                className="cursor-pointer"
              >
                Reply
              </p>
            </div>
          </p>
        </div>
      </div>
      <div>
        {
          <div className="w-fit mx-[5.2rem]">
            {comment.replyCount >= 0 && (
              <>
                <div className="flex items-center gap-3">
                  <p>
                    <HorizontalRuleIcon sx={{ color: "#6b7280" }} />
                  </p>
                  <p
                    onClick={() => {
                      setShowReplies(!showReplies);
                    }}
                    className="text-gray-500 text-[0.8rem] cursor-pointer flex gap-3 font-semibold"
                  >
                    {!showReplies
                      ? `View replies (${comment.replyCount})`
                      : "Hide replies"}
                  </p>
                </div>
              </>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default CommentShape;
