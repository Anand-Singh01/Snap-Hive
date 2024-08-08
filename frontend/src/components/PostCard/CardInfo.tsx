import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
      <div className="rounded-full w-[40px] h-[40px] overflow-hidden">
        <img className="post-image" src={post.profilePic} alt="profileImage" />
      </div>
      <div>
        <div className='flex items-center gap-2'>
          <p className="font-semibold hover:underline text-[1rem] sm:text-[1.5rem]">
            {post.postedBy}
          </p>
          <div>
            <FiberManualRecordIcon sx={{fontSize:"8px", color:'#9ca3af'}}/>
          </div>
          <p className='text-gray-400 tracking-[-0.1em]'>{timeAgo(post.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {/* <p>{timeAgo(post.createdAt)}</p> */}
          {post.postLocation && (
            <p>
              {post.postLocation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
