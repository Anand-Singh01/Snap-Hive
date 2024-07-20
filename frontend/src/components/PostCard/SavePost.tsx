import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../state/hooks";
import { updateSave } from "../../state/slices/postSlice";
import { bounce2 } from "../../utils/animate";
import { saveAPost } from "../../utils/api-communicators/post";

interface save {
  postId: string;
  isSaved: boolean;
}

const SavePost = (post: save) => {
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved || false);
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);

  const save_Click = async () => {
    bounce2(divRef.current);
    isSaved
      ? dispatch(updateSave({ type: "remove", postId: post.postId }))
      : dispatch(updateSave({ type: "add", postId: post.postId }));
    setIsSaved(!isSaved);
    try {
      const res = await dispatch(saveAPost({ postId: post.postId }));
      if (saveAPost.rejected.match(res)) {
        alert("server error");
      }
    } catch (error) {
      alert("server error");
    }
  };
  return (
    <div className="flex items-center gap-1">
      <div ref={divRef} className="cursor-pointer like" onClick={save_Click}>
        {isSaved ? (
          <BookmarkIcon sx={{ color: "#c0c0e8 " }} />
        ) : (
          <BookmarkBorderOutlinedIcon sx={{ color: "#c3a0ff" }} />
        )}
      </div>
    </div>
  );
};

export default SavePost;
