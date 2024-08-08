import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { IPost } from "../utils/constants/interfaces";
import CardInfo from "./PostCard/CardInfo";
import PostCaption_tag from "./PostCard/PostCaption_tag";

interface postInfo {
  post: IPost;
  userId: string | null;
}
const PostInfo: React.FC<postInfo> = ({ post, userId }) => {
  return (
    <div className="items-center w-fit mx-auto max-w-[23rem]">
      <div className="">
        <div className="mb-3 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div>
              <CardInfo
                profilePic={post.postedBy.profile.profilePic}
                postLocation={post.location}
                createdAt={post.createdAt}
                postedBy={post.postedBy.name}
              />
            </div>
            <PostCaption_tag caption={post.caption} />
          </div>
          <div className="flex items-center justify-between">
            {userId === post.postedBy.id && (
              <div className="flex items-center gap-3">
                <Link to={`/update-post/${post.id}`} className="cursor-pointer">
                  <EditOutlinedIcon sx={{ color: "#DBDBDB" }} />
                </Link>
                <Link to={`/update-post/${post.id}`} className="cursor-pointer">
                  <DeleteForeverIcon sx={{ color: "#FD6991" }} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="h-[300px] overflow-hidden relative">
          <img
            className="w-full rounded-t-xl h-full object-cover object-center"
            src={post.postImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
