import { FC } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  validation: RegisterOptions;
  type: string;
}

const InputField: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="inputDiv">
      <label className="text-[12px] my-3" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, validation)}
        placeholder={placeholder}
        type={type}
        name={name}
      />
      {errors[name] && errors[name].message && (
        <span className="error-span">{errors[name].message.toString()}</span>
      )}
    </div>
  );
};

export default InputField;
