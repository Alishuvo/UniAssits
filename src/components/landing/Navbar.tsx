"use client";
import { BtnGradient } from "@/components/common/ui/buttons/BtnGradient";
import { BtnOutline } from "@/components/common/ui/buttons/BtnOutline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router=useRouter()
  const handleLogin = () => {
    router.push("/login")
    console.log("login");
  };

  const handleSignup = () => {
    router.push("/signup")
    console.log("signup");
  };

  return (
    <div className="bg-[#FFF8EF] shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <div className="">
          <Image src={"/logo/logo.png"} alt="logo" width={127} height={33} />
        </div>
        <div className="flex items-center gap-5 py-7">
          <p className="cursor-pointer">Features</p>
          <p className="cursor-pointer">How it works</p>
          <p className="cursor-pointer">Admin</p>
          <p className="cursor-pointer">Team</p>
          <p className="cursor-pointer">FAQ</p>
        </div>
        <div className="flex gap-3">
          <BtnOutline onClick={handleLogin} label="log in" />
          <BtnGradient onClick={handleSignup} label="Try Chat" />
        </div>
      </div>
    </div>
  );
};
