"use client";

import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Button } from "@/components/common/ui/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH)
      .replace(/\D/g, "")
      .split("");

    if (pasted.length === 0) return;

    const newOtp = [...otp];
    pasted.forEach((digit, i) => {
      if (i < OTP_LENGTH) newOtp[i] = digit;
    });

    setOtp(newOtp);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-otp/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpValue }),
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: "OTP Verified!",
          text: "Your identity has been verified. You can now reset your password.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#DC6D18",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        router.push("/reset-password");
      } else {
        const errorData = await response.json();
        setError(
          errorData.detail || "Invalid or expired OTP. Please try again."
        );
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="flex shadow-lg mx-20"
      >
        {/* Left panel */}
        <div className="w-1/2 p-32 bg-linear-to-r from-[#624E40] to-[#937964] rounded-l-2xl text-[#FFF4E4]">
          <div>
            <h1 className="text-7xl mb-6">🔐</h1>
            <h3 className="text-3xl mb-2">Verify OTP</h3>
            <h4 className="text-lg">Enter the 6-digit code sent to your email</h4>
          </div>
          
        </div>

        {/* Right panel */}
        <motion.form
          onSubmit={handleVerifyOtp}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="w-1/2 rounded-r-2xl bg-[#eec49b] p-20 flex flex-col gap-6"
        >
          {/* OTP BOX INPUT */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-semibold rounded-lg border border-gray-400 focus:outline-none focus:border-[#DC6D18] focus:ring-2 focus:ring-[#DC6D18]"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            label="Verify OTP"
            className="bg-[#DC6D18] mt-4"
          />

          <p className="text-black text-center">
            Didn’t get the code?{" "}
            <Link href="/forgot-password" className="font-bold">
              Resend OTP
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
