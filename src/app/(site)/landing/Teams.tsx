import { Description } from "@/components/landing/Description";
import { Headline } from "@/components/landing/Headline";
import { Title } from "@/components/landing/Title";
import React from "react";

export const Teams = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-10">
        <Title text="Team" />
        <Headline text="Meet the people building your campus assistant" />
        <Description text="Swap in your real profiles later; these are placeholders to fit the layout and vibe." />
      </div>
    </div>
  );
};
