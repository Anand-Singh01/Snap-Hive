import React from "react";
import { IComment } from "../../utils/constants/interfaces";
import CommentShape from "./CommentShape";

interface CommentListProps {
  comments: IComment[];
}

const CommentsList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentShape comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
