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
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // const id = useAppSelector((state) => state.user.user.userId);
  return (
    <div className="bg-gray-900 rounded-lg w-[90%] sm:w-[50%] max-w-[350px]">
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
          {/* {id === post.postedBy.id ? <EditPost postId={id} /> : <></>} */}
        </div>
        <div>
          <PostCaption_tag caption={post.caption} tags={post.tags} />
        </div>
      </div>
      <div className="post-image-container">
        <img className="post-image" src={post.postImage} alt="postImage" />
      </div>
      <div className="p-3 flex justify-between items-center">
        <LikePost
          totalLikes={post.totalLikes}
          isLiked={post.isLiked}
          postId={post.id}
        />
        <SavePost isSaved={post.isSaved} postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
