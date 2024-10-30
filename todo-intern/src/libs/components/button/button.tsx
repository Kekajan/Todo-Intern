import React from "react";

interface buttonProps {
  text: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<buttonProps> = ({
  text,
  onClick,
  variant,
  className,
}) => {
  const buttonClass =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-800 text-white"
      : "bg-red-600 hover:bg-red-700 text-white";
  return (
    <button
      onClick={onClick}
      className={`${buttonClass} font-bold py-2 px-4 rounded ${className}`}
    >
      {text}
    </button>
  );
};