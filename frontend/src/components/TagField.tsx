import { FC, useEffect, useRef, useState } from "react";
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
  getFilledVal?: (text: string) => void;
}

const TagField: FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  validation,
  inputClass,
  labelClass,
  value,
  getFilledVal,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [inputValue, setInputValue] = useState(value || "");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const keyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "," && getFilledVal) {
      event.preventDefault();
      getFilledVal((event.target as HTMLInputElement).value);
      if (inputRef.current !== null) {
        inputRef.current.value = "";
        setInputValue("");
      }
    }
  };

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
        onKeyDown={keyPressed}
        ref={inputRef}
      />
      {errors[name] && errors[name].message && (
        <span className="error-span absolute w-full bottom-[-25px]">
          {errors[name].message.toString()}
        </span>
      )}
    </div>
  );
};

export default TagField;
