"use client";

import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Button } from "@/components/common/ui/buttons/Button";
import Input from "@/components/common/ui/buttons/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        /* ================= TOKEN STORAGE (IMPORTANT PART) ================= */

        // 🔹 Store access token in localStorage (USED LATER BY CHATBOT)
        localStorage.setItem("token", data.access);

        // 🔹 Optional: store refresh token if you need later
        localStorage.setItem("refreshToken", data.refresh);

        // 🔹 Keep your existing cookie logic (if backend uses cookies too)
        document.cookie = `refreshToken=${data.refresh}; path=/;`;
        document.cookie = `accessToken=${data.access}; path=/;`;

        /* ================================================================= */

        Swal.fire({
          title: "Logged in successfully!",
          text: "Click OK to continue to chat.",
          confirmButtonText: "OK",
          confirmButtonColor: "#DC6D18",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/chat");
          }
        });

      } else {
        const errorData = await response.json();
        setError(
          errorData.detail || "Failed to login. Please check your credentials."
        );
      }

    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Whole card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "keyframes",
          duration: 1.4,
          ease: "easeOut",
        }}
        className="flex bg-[linear-gradient(92deg,#FFF4E4_1.63%,rgba(232,175,127,0.31)_97.99%)] bg-clip-text text-transparent shadow-lg mx-20"
      >
        {/* Left panel */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.15,
            type: "keyframes",
            duration: 1.3,
            ease: "easeOut",
          }}
          className="w-1/2 text-[#FFF4E4] p-32 bg-linear-to-r from-[#624E40] to-[#937964] flex flex-col gap-5 rounded-l-2xl"
        >
          <Headline
            text="Welcome 👋Your university, one question away."
            className="text-left text-[#FFF4E4]"
          />

          <Description
            text="Ask about fees, departments, locations, bus schedules, or any notice. Bangla & English supported."
          />
        </motion.div>

        {/* Right panel / form */}
        <motion.form
          onSubmit={handleLogin}
          className="w-1/2 rounded-r-2xl bg-[#eec49b] p-20 flex flex-col gap-5"
        >
          <Input
            label="email"
            name="email"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="password"
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button type="submit" label="Log in" className="bg-[#DC6D18]" />

          <p className="text-black">
            New here?{" "}
            <Link href={"/signup"} className="font-bold">
              Click Sign up
            </Link>{" "}
            above.
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
