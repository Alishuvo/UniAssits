import React from 'react';

type TitleProps = {
    text: string;
    className?: string;
}

export const Title:React.FC<TitleProps> = ({
    text = "Title",
    className = "text-black",
}) => {
  return (
      <h3 className={`uppercase text-2xl text-center tracking-[1rem] ${className}`}>{text}</h3>
  );
};