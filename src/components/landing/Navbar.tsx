"use client";

import { BtnGradient } from "@/components/common/ui/buttons/BtnGradient";
import { BtnOutline } from "@/components/common/ui/buttons/BtnOutline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const session = useSession();

  console.log(session.data?.user)

 

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };



  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-[#FFF8EF] shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        {/* logo */}
        <Link href={"/"}>
          <Image src={"/logo/logo.png"} alt="logo" width={127} height={33} />
        </Link>

        {/* nav links */}
        <div className="flex items-center gap-5 py-7">
          <p onClick={() => scrollToSection("feature")} className="cursor-pointer hover:text-[#DC6D18] transition">
            Features
          </p>
          <p onClick={() => scrollToSection("works")} className="cursor-pointer hover:text-[#DC6D18] transition">
            How it works
          </p>
          <p onClick={() => scrollToSection("Admin")} className="cursor-pointer hover:text-[#DC6D18] transition">
            Admin
          </p>
          <p onClick={() => scrollToSection("teams")} className="cursor-pointer hover:text-[#DC6D18] transition">
            Team
          </p>
        </div>

        {/* right section */}
        <div className="relative" ref={dropdownRef}>
          {!session.data?.user? (
            <div className="flex gap-3">
              <BtnOutline onClick={handleLogin} label="log in" />
              <BtnGradient onClick={handleSignup} label="Try Chat" />
            </div>
          ) : (
            <>
              {/* profile trigger */}
              <button
                
                className="flex items-center gap-3 px-3 py-2 "
              >
                <button onClick={() => setOpen((prev) => !prev)} className="relative w-10 h-10 rounded-full overflow-hidden border border-[#DC6D18] cursor-pointer">
                  <Image src={session.data?.user?.image || "/avatar/user.png"} alt="user" fill className="object-cover" />
                </button>
                <span className="font-bold text-lg text-gray-800">
                  {session.data?.user?.name}
                </span>
              </button>

              {/* dropdown — centered under profile */}
              <div
                className={`absolute left-13 -translate-x-1/2 mt-3 w-24
                rounded-2xl border border-[#DC6D18]/30 bg-[#FFF8EF] shadow-xl overflow-hidden
                transition-all duration-200 ease-out
                ${
                  open
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <button
                  onClick={()=>signOut()}
                  className="w-full h-12 flex items-center justify-center
                  text-black font-semibold text-sm
                  hover:bg-[#DC6D18]/10 transition rounded-xl cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
