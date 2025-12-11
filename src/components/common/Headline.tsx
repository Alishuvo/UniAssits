import React from 'react';

type HeadlineProps = {
    text: string;
    className?: string;
}


export const Headline:React.FC<HeadlineProps> = ({
    text="please pass headline",
    className="text-center"
}) => {
  return (
      <h1 className={`sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl ${className}`}>{text}</h1>
  );
};