import SkeletonLoader from "../SkeletonLoader";

const PostSkeleton = ({key}:{key:number}) => {
  return (
    <div key={key} className="flex flex-col gap-3 opacity-40">
      <div className="flex gap-1 items-center">
        <SkeletonLoader
          type="circular"
          color="#e7e7e8"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-1">
          <SkeletonLoader
            type="rounded"
            color="#e7e7e8"
            width={150}
            height={20}
          />
          <SkeletonLoader
            type="rounded"
            color="#e7e7e8"
            width={50}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <SkeletonLoader
          type="rounded"
          color="#e7e7e8"
          width={300}
          height={20}
        />
        <SkeletonLoader
          type="rounded"
          color="#e7e7e8"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default PostSkeleton;
