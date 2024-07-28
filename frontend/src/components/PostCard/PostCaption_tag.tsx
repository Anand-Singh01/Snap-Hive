import React from "react";
import { ITag } from "../../utils/constants/interfaces";

interface OtherInfo {
  caption: string | null;
  tags: ITag[];
}
const PostCaption_tag: React.FC<OtherInfo> = (post) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{post.caption}</div>
      <div className="flex gap-[0.5rem] italic items-center text-gray-300">
        {post.tags.map(({ tagName }) => {
          return <p>{tagName}</p>;
        })}
      </div>
    </div>
  );
};

export default PostCaption_tag;
