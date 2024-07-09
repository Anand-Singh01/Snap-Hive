import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className: string;
  children: string | JSX.Element;
}

const Button: FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
