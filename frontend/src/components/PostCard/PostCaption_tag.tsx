import React from "react";
import { ITag } from "../../utils/constants/interfaces";

interface OtherInfo {
  caption: string | null;
  tags?: ITag[];
  name?: string;
}
const PostCaption_tag: React.FC<OtherInfo> = (post) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <p className="">
          <span className="font-bold mr-2">{post.name}</span>
          {post.caption}
        </p>
      </div>
      {
        post.tags &&       <div className="flex gap-[0.5rem] italic items-center text-gray-300">
        {post.tags.map(({ tagName }) => {
          return <p>{tagName}</p>;
        })}
      </div>
      }
    </div>
  );
};

export default PostCaption_tag;
