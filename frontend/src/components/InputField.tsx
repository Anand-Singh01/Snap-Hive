import { FC, useEffect, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  validation: RegisterOptions;
  type: string;
  inputClass?: string;
  labelClass?: string;
  value?: string;
}

const InputField: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  validation,
  inputClass,
  labelClass,
  value,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
