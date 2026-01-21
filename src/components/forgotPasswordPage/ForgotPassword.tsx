"use client";

import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Button } from "@/components/common/ui/buttons/Button";
import Input from "@/components/common/ui/buttons/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/forgot-password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "Reset link sent!",
          text: "Check your email for the password reset link.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#DC6D18",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(
          errorData.detail ||
          "Failed to send reset link. Please check your email."
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
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.35,
              type: "keyframes",
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <div>
              <h1 className="text-7xl mb-6">🔐</h1>
              <h3 className="text-3xl mb-2">Forgot your password?</h3>
              <h4 className="text-lg">Enter your registered email and we’ll send you a secure reset link.</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "keyframes",
              duration: 1.2,
              ease: "easeOut",
            }}
          >
          </motion.div>

          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.65,
              type: "keyframes",
              duration: 1.2,
              ease: "easeOut",
            }}
            className="flex flex-col gap-5"
          >
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Secure password reset process</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Reset link expires automatically</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Quick access back to your account</span>
            </div>
          </motion.ul>
        </motion.div>

        {/* Right panel / form */}
        <motion.form
          onSubmit={handleForgotPassword}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.25,
            type: "keyframes",
            duration: 1.3,
            ease: "easeOut",
          }}
          className="w-1/2 rounded-r-2xl bg-[#eec49b] p-20 flex flex-col gap-5"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 1.1, ease: "easeOut" }}
          >
            <Input
              label="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 1.1, ease: "easeOut" }}
            className="flex justify-between items-center"
          >
            <Button
              type="submit"
              label="Send OTP Code"
              className="bg-[#DC6D18]"
            />
          </motion.div>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.05, duration: 1.1, ease: "easeOut" }}
            className="text-black"
          >
            Remembered your password?{" "}
            <Link href={"/login"} className="font-bold">
              Back to login
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
