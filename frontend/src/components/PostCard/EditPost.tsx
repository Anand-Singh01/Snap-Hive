import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React from "react";
interface PostId {
  postId: string;
}
const EditPost: React.FC<PostId> = ({ postId }) => {
  return (
    <>
      <div className="cursor-pointer">
        <EditOutlinedIcon
          sx={{ color: "#c3a0ff", width: "22px", height: "22px" }}
        />
      </div>
    </>
  );
};

export default EditPost;
