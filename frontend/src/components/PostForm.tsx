import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fade_up } from "../utils/animate";
import { ICreatePostData } from "../utils/constants/interfaces";
import { validationRules } from "../utils/constants/validation";
import Button from "./Button";
import InputField from "./InputField";
import Loader from "./Loader";
import PostImage from "./PostImage";
import TextAreaField from "./TextAreaField";

interface postInterface {
  func: (
    data: ICreatePostData,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}
const PostForm: React.FC<postInterface> = ({ func }) => {
  const methods = useForm<ICreatePostData>();
  const [isLoading, setIsLoading] = useState(false);
  useGSAP(() => {
    fade_up(".post-form");
  }, []);

  const onSubmit = async (data: ICreatePostData) => {
    setIsLoading(true);
    func(data, setIsLoading);
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
          />
          <PostImage />
          <InputField
            label="Add Location"
            type="text"
            name="location"
            placeholder="Share a place"
            validation={validationRules.caption}
            labelClass="post-form-label"
            inputClass="post-form-input"
          />
          <InputField
            label="Add Tags (separated by comma ',')"
            type="text"
            name="tags"
            placeholder="life's good, relaxing, funny"
            validation={validationRules.tags}
            labelClass="post-form-label"
            inputClass="post-form-input"
          />
          <div className="flex gap-4 justify-end">
            {/* <Button
              type="button"
              className="bg-gray-800 btn-postForm"
              children={"Cancel"}
            /> */}
            <Button type="submit" className="bg-purple-500 btn-postForm">
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PostForm;
