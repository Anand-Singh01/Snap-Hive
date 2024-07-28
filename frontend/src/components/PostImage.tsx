import { useGSAP } from "@gsap/react";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { fade_up } from "../utils/animate";

interface AlreadyUploadedImage {
  prevImage?: string;
}
const PostImage: React.FC<AlreadyUploadedImage> = ({ prevImage }) => {
  const [image, setImage] = useState<File | null>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [oldImage, setOldImage] = useState<string | undefined>(prevImage);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const openFileManager = () => {
    labelRef.current!.click();
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldImage(undefined);
    const file = e.target.files?.[0] || null;
    setImage(file);
    setValue("postImage", file, { shouldValidate: true });
  };

  const removeImage = () => {
    setOldImage(undefined);
    setImage(null);
  };

  useGSAP(() => {
    fade_up(".info-replace");
    fade_up(".remove-logo");
  }, [image]);

  useEffect(() => {
    if (!oldImage) {
      register("postImage", {
        required: "Post image is required",
        validate: {
          fileFormat: (value) =>
            (value &&
              (value.type === "image/jpeg" || value.type === "image/png")) ||
            "Only JPEG or PNG files are allowed",
        },
      });
    } else {
      setValue("postImage", oldImage, { shouldValidate: false });
    }
  }, [register, oldImage, setValue, image]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="post-form-label">Add a Photo</p>
        {image || oldImage ? (
          <div onClick={removeImage} className="remove-logo">
            <RemoveCircleOutlineOutlinedIcon />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div onClick={openFileManager} className="relative cursor-pointer">
        {!image && !oldImage ? (
          <div className="image-upload-marker">
            <div className="flex flex-col items-center gap-4">
              <PhotoLibraryOutlinedIcon
                sx={{
                  width: "70px",
                  height: "70px",
                  color: "gray",
                }}
              />
              <p className="text-gray-500 font-semibold">SVG, PNG JPG</p>
              <p className="text-center p-4 bg-gray-900 rounded-lg">
                Select from device
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <img
          src={
            image ? URL.createObjectURL(image) : oldImage ? oldImage : undefined
          }
          className="custom-file-upload"
        ></img>

        <div className="hidden">
          <label
            ref={labelRef}
            htmlFor="file-upload"
            className="custom-file-label"
          >
            Choose File
          </label>
          <input onChange={updateImage} id="file-upload" type="file" />
        </div>
      </div>
      {(image || oldImage) && (
        <p className="info-replace">Click photo to replace</p>
      )}
      {errors.postImage && (
        <p className="text-red-500">{errors.postImage.message?.toString()}</p>
      )}
    </div>
  );
};

export default PostImage;
