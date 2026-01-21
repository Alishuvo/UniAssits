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

const SignUp = () => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/sign-up/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "User Created Successfully",
          text: "Your account has been created. Click OK to go to login.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#DC6D18",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      } else {
        const errorData = await response.json();
        setErrors(errorData);
      }

    } catch (err) {
      setErrors({
        non_field_errors: ["An error occurred. Please try again."],
      });
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
            <Headline
              text="Welcome 👋Your university, one question away."
              className="text-left text-[#FFF4E4]"
            />
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
            <Description
              text="Ask about fees, departments, locations, bus schedules, or
              any notice. Bangla & English supported."
              className=""
            />
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
              <span>Glass-smooth experience with real-time answers</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Admin uploads PDFs → AI learns automatically</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Always cited answers and inline images</span>
            </div>
          </motion.ul>
        </motion.div>

        {/* Right panel / form */}
        <motion.form
          onSubmit={handleSubmit}
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
          {/* First + Last name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 1.1, ease: "easeOut" }}
            className="flex gap-5 items-center"
          >
            <Input
              label="First name"
              name="first_name"
              type="text"
              placeholder="first name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Input
              label="last name"
              name="last_name"
              type="text"
              placeholder="last name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </motion.div>

          {errors.first_name && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {errors.first_name[0]}
            </motion.p>
          )}

          {errors.last_name && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {errors.last_name[0]}
            </motion.p>
          )}

          {/* Email */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.1, ease: "easeOut" }}
          >
            <Input
              label="university email"
              name="email"
              type="email"
              placeholder="you@university.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </motion.div>

          {errors.email && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {errors.email[0]}
            </motion.p>
          )}

          {/* Passwords */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 1.1, ease: "easeOut" }}
            className="flex w-full gap-5 items-center"
          >
            <Input
              label="password"
              name="password"
              placeholder="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="confirm password"
              name="confirm_password"
              placeholder="confirm"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </motion.div>

          {errors.password && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {errors.password[0]}
            </motion.p>
          )}

          {errors.non_field_errors && (
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm"
            >
              {errors.non_field_errors[0]}
            </motion.p>
          )}

          {/* Submit */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
          >
            <Button
              type="submit"
              label="Create Account"
              className="bg-[#DC6D18]"
            />
          </motion.div>

          {/* Switch to login */}
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.95, duration: 1.1, ease: "easeOut" }}
            className="text-black"
          >
            Already have an account? Switch to{" "}
            <Link href={"/login"} className="font-bold">
              Log in
            </Link>{" "}
            .
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SignUp;
