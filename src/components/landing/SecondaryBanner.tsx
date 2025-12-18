import Link from "next/link";
import React from "react";

export const SecondaryBanner = () => {
  return (
    <div className="bg-[#FFF4E4] my-5 w-8/12 mx-auto p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Text */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          Ready to try it?
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Jump into the chat and ask about your campus — fees, departments,
          transport, and more.
        </p>
      </div>

      {/* Button */}
      <Link href="/chat" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
        Open the Chat
      </Link>
    </div>
  );
};
