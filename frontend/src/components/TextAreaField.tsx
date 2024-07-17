import { FC } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  validation: RegisterOptions;
  labelClass?: string
  textAreaClass?: string
}

const TextAreaField: FC<InputProps> = ({
  name,
  label,
  placeholder,
  validation,
  labelClass,
  textAreaClass
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="textAreaDiv">
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <textarea
        {...register(name, validation)}
        placeholder={placeholder}
        name={name}
        className={textAreaClass}
      />
      {errors[name] && errors[name].message && (
        <span className="error-span absolute w-full bottom-[-25px]">
          {errors[name].message.toString()}
        </span>
      )}
    </div>
  );
};
export default TextAreaField;
