import React from 'react';

type ButtonProps = { 
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
}


export const Button: React.FC<ButtonProps> = ({
    label = "button",
    onClick,
    type = "button",
    className = "",
    disabled= false,
}) => {
  return (
    <button onClick={onClick} type={type} className={`border border-white rounded-lg active:scale-95 text-2xl cursor-pointer text-white px-10 py-5 w-full ${className}`} disabled={disabled}>
        {label}
    </button>
  );
};