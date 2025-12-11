import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  iconStyle?: string;
  containerStyle?: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  number="please pass number",
  title="please pass title",
  description="please pass description",
  iconStyle="bg-[#e8563f] p-3",
  containerStyle="w-md p-10 gap-15",
}) => {
  return (
    <div className={`flex flex-col  rounded-xl backdrop-blur-[6px] shadow-[7px_14px_35px_0px_#DC6D186B] ${containerStyle}`}>
      <div className="flex items-center justify-between">
        <div className={` text-white rounded ${iconStyle}`}>{icon}</div>
        <span>{number}</span>
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-[#6C6C6C]">{description}</p>
      </div>
    </div>
  );
};
