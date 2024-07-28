import { useGSAP } from "@gsap/react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { fade_up } from "../utils/animate";
import { ICreatePostData, ITag } from "../utils/constants/interfaces";
import { validationRules } from "../utils/constants/validation";
import Button from "./Button";
import InputField from "./InputField";
import Loader from "./Loader";
import PostImage from "./PostImage";
import TagField from "./TagField";
import TextAreaField from "./TextAreaField";

interface postInterface {
  formType: "create-post" | "edit-post";
  func: (
    data: ICreatePostData,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  caption?: string;
  location?: string;
  tags?: ITag[];
  imageUrl?: string;
}
const PostForm: React.FC<postInterface> = ({
  formType,
  func,
  caption,
  location,
  tags,
  imageUrl,
}) => {
  const methods = useForm<ICreatePostData>();
  const [isLoading, setIsLoading] = useState(false);
  const [tagContainer, setTagContainer] = useState<ITag[]>(tags || []);
  useGSAP(() => {
    fade_up(".post-form");
  }, []);

  const onSubmit = async (data: ICreatePostData) => {
    data.tags = tagContainer;
    setIsLoading(true);
    func(data, setIsLoading);
  };

  const removeTag = (index: number) => {
    const updatedTags = tagContainer.filter((_, i) => i !== index);
    setTagContainer(updatedTags);
  };

  const getFilledVal = (text: string) => {
    setTagContainer([...tagContainer, { tagName: `#${text}` }]);
  };
  return (
    <FormProvider {...methods}>
      <div className="w-full post-form opacity-0 flex justify-center">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full md:w-[30rem] flex flex-col gap-4"
        >
          <TextAreaField
            label="Caption"
            labelClass="post-form-label"
            textAreaClass="post-form-input"
            name="caption"
            placeholder="Share your thoughts..."
            validation={validationRules.caption}
            value={caption}
          />
          <PostImage prevImage={imageUrl} />
          <InputField
            label="Add Location"
            type="text"
            name="location"
            placeholder="Share a place"
            validation={validationRules.location}
            labelClass="post-form-label"
            inputClass="post-form-input"
            value={location}
          />

          <TagField
            getFilledVal={getFilledVal}
            label="Add Tags (separated by comma ',')"
            type="text"
            name="tags"
            placeholder="life's good, relaxing, funny"
            validation={validationRules.tags}
            labelClass="post-form-label"
            inputClass="post-form-input"
          />

          {/* TagContainer */}
          {tagContainer.length > 0 && (
            <div className="flex gap-3 max-h-[100px] w-fit p-3 bg-slate-900 rounded-xl overflow-scroll flex-wrap">
              {tagContainer.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-fit gap-2 px-2 py-2 rounded-xl bg-gray-800 items-center justify-center"
                  >
                    <div
                      onClick={() => removeTag(index)}
                      className="cursor-pointer"
                    >
                      <HighlightOffIcon
                        sx={{ width: "20px", height: "20px", color: "#f56219" }}
                      />
                    </div>
                    <p className="">{item.tagName}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-4 justify-end">
            {formType === "edit-post" && (
              <Link
                to={"/"}
                type="button"
                className="bg-gray-800 btn-postForm"
                children={"Cancel"}
              />
            )}

            <Button type="submit" className="bg-purple-500 btn-postForm">
              {isLoading ? (
                <Loader />
              ) : formType === "create-post" ? (
                "Submit"
              ) : formType === "edit-post" ? (
                "Update"
              ) : (
                ""
              )}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PostForm;
