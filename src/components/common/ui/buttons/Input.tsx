"use client";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

type InputProps = {
  label?: string;
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  labelStyle = "text-black",
  inputStyle = "text-black",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 ">
        {label && <label className={`uppercase ${labelStyle}`}>{label}</label>}
        <label
          htmlFor=""
          className="flex justify-between items-center p-5 rounded-lg border border-white bg-[linear-gradient(92deg,#FFF4E4_1.63%,rgba(232,175,127,0.31)_97.99%)]  "
        >
          <input
            type={  type === "password" ? (showPassword ? "text" : "password") : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={` outline-none w-full  ${inputStyle}`}
          />
          {type === "password" && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-white cursor-pointer"
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default Input;
