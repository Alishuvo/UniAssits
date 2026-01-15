"use client";
import { BtnGradient } from "@/components/common/ui/buttons/BtnGradient";
import { BtnOutline } from "@/components/common/ui/buttons/BtnOutline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push("/login")
    console.log("login");
  };

  const handleSignup = () => {
    router.push("/signup")
    console.log("signup");
  };


  // scrolling into different section
  const scrollToSection =(id: string)=>{
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  return (
    <div className="bg-[#FFF8EF] shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <Link href={"/"} className="">
          <Image src={"/logo/logo.png"} alt="logo" width={127} height={33} />
        </Link>
        <div className="flex items-center gap-5 py-7">
          <p onClick={() => scrollToSection("feature")} className="cursor-pointer">Features</p>
          <p onClick={() => scrollToSection("works")} className="cursor-pointer">How it works</p>
          <p onClick={() => scrollToSection("Admin")} className="cursor-pointer">Admin</p>
          <p onClick={() => scrollToSection("teams")} className="cursor-pointer">Team</p>
        </div>
        <div className="flex gap-3">
          <BtnOutline onClick={handleLogin} label="log in" />
          <BtnGradient onClick={handleSignup} label="Try Chat" />
        </div>
      </div>
    </div>
  );
};

