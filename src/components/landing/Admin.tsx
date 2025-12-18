import React from "react";
import { Headline } from "../common/Headline";
import { Description } from "../common/Description";

export const Admin = () => {
  return (
    <div>
      <Headline text="Admin" />
      <Description text="Powerful admin panel" />
      <div className="mx-auto flex gap-5 items-center max-w-4xl my-5">
        <div className="flex gap-5">
          <div className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="h-[9px] w-[43px] bg-black"></p>
              <p className="h-[22px] w-[53px] bg-[#ff7f5c]"></p>
            </div>
            <div>
              <h1>Documents & versions</h1>
              <p className="text-sm">
                Track processing, re-index on change, and deprecate outdated
                pages. Bulk imports supported.
              </p>
            </div>
          </div>
          <div className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="h-[9px] w-[43px] bg-black"></p>
              <p className="h-[22px] w-[53px] bg-[#3734A9]"></p>
            </div>
            <div>
              <h1>Media library</h1>
              <p className="text-sm">
                Auto-extracted images from PDFs plus manual uploads. Tag people,
                departments, or locations.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5">
            <p className="text-sm">
              Top queries, deflection rate, no-answer topics
            </p>
          </div>
          <div className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5">
            <p className="text-sm">
              Latency, satisfaction — use feedback to improve content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
