"use client";
import Link from "next/link";
import { PiNotePencilLight } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import Image from "next/image";

const SideNav = () => {

  const handleLogout = () => {
    // Add your logout logic here   
    }

  return (
    <aside className="w-64 h-screen bg-[#FFF4E4]  rounded-xl  border-r border-gray-200 flex flex-col justify-between fixed">
      {/* Top section */}
      <div className="flex flex-col gap-10 items-center p-5">
        <Link href="/"><Image src={"/logo/logo.png"} width={127} height={33} alt="logo" /></Link>
        <nav className="flex flex-col  gap-2">
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg  hover:bg-orange-100 transition"
          >
            <PiNotePencilLight /> <span>New Chat</span>
          </Link>
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg  hover:bg-orange-100 transition"
          >
            <RiSearchLine /> <span>Search</span>
          </Link>
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg  hover:bg-orange-100 transition"
          >
            <PiNotePencilLight /> <span>Explore</span>
          </Link>
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg  hover:bg-orange-100 transition"
          >
            <GrHistory /> <span>History</span>
          </Link>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-5 border-t border-gray-200">
        <button onClick={handleLogout} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
