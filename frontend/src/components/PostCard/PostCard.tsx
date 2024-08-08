// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { IPostedBy, ISinglePost, ITag } from "../../utils/constants/interfaces";
import CardInfo from "./CardInfo";
import CommentInput from "./CommentInput";
import LikePost from "./LikePost";
import PostCaption_tag from "./PostCaption_tag";
import SavePost from "./SavePost";
interface PostCardProps {
  post: ISinglePost & {
    postedBy: IPostedBy;
    tags: ITag[];
  };
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // const cardHover = (command: string) => {
  //   if (command === "scaleUp") {
  //     scaleUpPost(cardRef.current!);
  //   } else if (command === "scaleDown") {
  //     scaleDownPost(cardRef.current!);
  //   }
  // };
  // const imageHover = (command: string) => {
  //   if (command == "scaleUp") {
  //     scaleUp(imgRef.current!);
  //   } else {
  //     scaleDown(imgRef.current!);
  //   }
  // };

  return (
    <div
      // ref={cardRef}
      // onMouseEnter={() => cardHover("scaleUp")}
      // onMouseLeave={() => cardHover("scaleDown")}
      className="rounded-lg w-full"
    >
      <div className="flex flex-col gap-3 sm:p-[1rem] p-[0.5rem]">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <CardInfo
              profilePic={post.postedBy.profile.profilePic}
              postLocation={post.location}
              createdAt={post.createdAt}
              postedBy={post.postedBy.name}
            />
          </div>
        </div>
        <div>
          {/* <PostCaption_tag  caption={post.caption} tags={post.tags} /> */}
        </div>
      </div>
      <div className="post-image-container rounded-sm">
        <img
          ref={imgRef}
          className="post-image"
          src={post.postImage}
          alt="postImage"
        />
      </div>
      <div>
        {/* <div className="px-3 pt-1">
            {post.totalComments > 0 && <p>{post.totalComments} comments</p>}
            <p className="hover:underline">
              <Link to={""}>Add a comment</Link>
            </p>
          </div> */}
      </div>
      <div className="">
        <div className="px-[0.1rem] pt-2 flex justify-between items-center">
          <div className="flex gap-3">
            <div>
              <LikePost
                // totalLikes={post.totalLikes}
                isLiked={post.isLiked}
                postId={post.id}
              />
            </div>
            <Link
              to={`/post-details/${post.id}`}
              className="mt-[0.05rem] cursor-pointer"
            >
              <ModeCommentOutlinedIcon
                sx={{ color: "#c3a0ff", fontSize: "22px" }}
              />
            </Link>
          </div>
          <SavePost isSaved={post.isSaved} postId={post.id} />
        </div>
        {post.totalLikes > 0 ? (
          <p className="font-semibold">
            {post.totalLikes} {post.totalLikes == 1 ? "like" : "likes"}
          </p>
        ) : (
          <p>
            Be the first to <span className="font-semibold">Like this</span>
          </p>
        )}
        <PostCaption_tag
          name={post.postedBy.name}
          caption={post.caption}
          tags={post.tags}
        />
        <div>
          {post.totalComments > 0 && (
            <Link className=" cursor-pointer" to={`/post-details/${post.id}`}>
              View {post.totalComments > 1 && "all"} {post.totalComments}{" "}
              {post.totalComments > 1 ? "comments" : "comment"}
            </Link>
          )}
          <div className="mt-3">
            <CommentInput
              displayCommentOnTop={true}
              name={post.postedBy.name}
              postId={post.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
