import React from "react";
import { ITag } from "../../utils/constants/interfaces";

interface OtherInfo {
  caption: string | null;
  tags: ITag[] | null;
}
const PostCaption_tag : React.FC<OtherInfo> = (post) => {
  return (
    <div>
      <div>{post.caption}</div>
      {/* <p>Tags</p> */}
    </div>
  );
};

export default PostCaption_tag;
