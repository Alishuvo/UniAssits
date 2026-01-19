"use client";

import Link from "next/link";
import { PiNotePencilLight } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const SideNav = () => {
  const session = useSession();

  // ✅ missing state (fix)
  const [showLogout, setShowLogout] = useState(false);

  // ✅ missing handler (fix)
  const handleLogout = async () => {
    setShowLogout(false);
    await signOut({ callbackUrl: "/login" });
  };

  const userImage =
    session.data?.user?.image || "/profile/profile_image.png";

  return (
    <aside className="w-64 h-screen bg-[#FFF4E4] rounded-xl border-r border-gray-200 flex flex-col justify-between fixed">
      {/* Top section */}
      <div className="flex flex-col gap-10 items-center p-5">
        <Link href="/">
          <Image src={"/logo/logo.png"} width={127} height={33} alt="logo" />
        </Link>

        <nav className="flex flex-col gap-2">
          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-orange-100 transition"
          >
            <PiNotePencilLight /> <span>New Chat</span>
          </Link>

          <Link
            href="/chat"
            className="flex gap-3 items-center px-4 py-2 rounded-lg hover:bg-orange-100 transition"
          >
            <RiSearchLine /> <span>Search</span>
          </Link>

          <h1 className="text-2xl font-bold bg-gray-200 text-orange-400 px-6 py-2 rounded-sm">
            Chats
          </h1>

          <div>
            <div className="rounded-sm px-4 py-2 mb-1 hover:bg-gray-300 cursor-pointer">
              <Link href={"/history"}> What are you doing</Link>
            </div>
            <div className="rounded-sm px-4 py-2 mb-1 hover:bg-gray-300 cursor-pointer">
              <Link href={"/"}> I have a car</Link>
            </div>
            <div className="rounded-sm px-4 py-2 mb-1 hover:bg-gray-300 cursor-pointer">
              <Link href={"/"}>Hi, I am fine</Link>
            </div>
            <div className="rounded-sm px-4 py-2 mb-1 hover:bg-gray-300 cursor-pointer">
              <Link href={"/"}> I am a develoer</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200 bg-[#F8E0C9]">
        <button
          onClick={() => setShowLogout((prev) => !prev)}
          className="w-full flex gap-4 items-center p-5 hover:bg-black/5 transition"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#DC6D18]">
            <Image
              src={userImage}
              fill
              alt="profile_image"
              className="object-cover"
            />
          </div>

          <div className="text-left">
            <h3 className="text-black font-bold text-lg leading-tight">
              {session.data?.user?.name || "Unknown User"}
            </h3>
            <p className="text-gray-700 text-sm">
              {session.data?.user?.email || "example@gmail.com"}
            </p>
          </div>
        </button>

        <div
          className={`transition-all duration-200 ease-out overflow-hidden
          ${
            showLogout
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-[#DC6D18] hover:bg-[#c85f14]
              text-white py-2 rounded-lg transition font-semibold"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
