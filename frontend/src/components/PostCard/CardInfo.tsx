import LocationOnIcon from "@mui/icons-material/LocationOn";
import { timeAgo } from "../../utils/constants/shared";
interface PostCardProps {
  profilePic: string;
  postLocation: string | null;
  createdAt: string;
  postedBy: string;
}
const CardInfo: React.FC<PostCardProps> = (post) => {
  return (
    <div className="flex gap-3">
      <div className="sm:w-[65px] sm:h-[65px] rounded-full w-[50px] h-[50px] overflow-hidden">
        <img className="post-image" src={post.profilePic} alt="profileImage" />
      </div>
      <div>
        <p className="font-semibold hover:underline text-[1rem] sm:text-[1.5rem]">
          {post.postedBy}
        </p>
        <div className="flex items-center gap-3 text-gray-300 text-sm">
          <p>{timeAgo(post.createdAt)}</p>
          {post.postLocation && (
            <p>
              <LocationOnIcon sx={{ fontSize: "20px", color: "#ff5224" }} />
              {post.postLocation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
