import React from "react";

type DescriptionProps = {
  text: string;
  className?: string;
};

export const Description: React.FC<DescriptionProps> = ({
  text = "please pass description",
  className = "text-center",
}) => {
  return (
    <p className={` sm:text-base md:text-md  lg:text-lg xl:text-2xl 2xl:text-3xl ${className}`}>
      {text}
    </p>
  );
};
