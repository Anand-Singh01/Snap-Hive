// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { scaleDownPost, scaleUpPost } from "../../utils/animate";
import { IPostedBy, ISinglePost, ITag } from "../../utils/constants/interfaces";
import CardInfo from "./CardInfo";
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
  const cardHover = (command: string) => {
    if (command === "scaleUp") {
      scaleUpPost(cardRef.current!);
    } else if (command === "scaleDown") {
      scaleDownPost(cardRef.current!);
    }
  };
  // const imageHover = (command: string) => {
  //   if (command == "scaleUp") {
  //     scaleUp(imgRef.current!);
  //   } else {
  //     scaleDown(imgRef.current!);
  //   }
  // };

  return (
    <>
      <Link
        to={`/post-details/${post.id}`}
        ref={cardRef}
        onMouseEnter={() => cardHover("scaleUp")}
        onMouseLeave={() => cardHover("scaleDown")}
        className="bg-gray-900 cursor-pointer rounded-lg w-[90%] sm:w-[50%] max-w-[350px]"
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
            <PostCaption_tag caption={post.caption} tags={post.tags} />
          </div>
        </div>
        <div className="post-image-container ">
          <img
            ref={imgRef}
            className="post-image"
            src={post.postImage}
            alt="postImage"
          />
        </div>
        <div>
          <div className="px-3 pt-1">
            {post.totalComments > 0 && <p>{post.totalComments} comments</p>}
            <p className="hover:underline">
              <Link to={""}>Add a comment</Link>
            </p>
          </div>
        </div>
        <div className="p-3 flex justify-between items-center">
          <div className="flex gap-[2rem] items-center">
            <LikePost
              totalLikes={post.totalLikes}
              isLiked={post.isLiked}
              postId={post.id}
            />
          </div>
          <SavePost isSaved={post.isSaved} postId={post.id} />
        </div>
      </Link>
    </>
  );
};

export default PostCard;
