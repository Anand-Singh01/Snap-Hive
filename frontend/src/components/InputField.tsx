import { FC } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  validation: RegisterOptions;
  type: string;
  inputClass?: string;
  labelClass?: string;
}

const InputField: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  validation,
  inputClass,
  labelClass,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="inputDiv">
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, validation)}
        placeholder={placeholder}
        type={type}
        className={inputClass}
        name={name}
      />
      {errors[name] && errors[name].message && (
        <span className="error-span absolute w-full bottom-[-25px]">
          {errors[name].message.toString()}
        </span>
      )}
    </div>
  );
};

export default InputField;
