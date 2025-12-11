"use client";

import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Button } from "@/components/common/ui/buttons/Button";
import Input from "@/components/common/ui/buttons/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/sign-up/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        router.push("/login");
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
      <div className="flex bg-[linear-gradient(92deg,#FFF4E4_1.63%,rgba(232,175,127,0.31)_97.99%)] bg-clip-text text-transparent shadow-lg mx-20">
        <div className="w-1/2 text-[#FFF4E4] p-20 bg-linear-to-r from-[#624E40] to-[#937964] flex flex-col gap-5 rounded-l-md">
          <Headline
            text="Welcome 👋Your university, one question away."
            className="text-left text-[#FFF4E4]"
          />
          <Description
            text="Ask about fees, departments, locations, bus schedules, or
            any notice. Bangla & English supported."
            className=""
          />
          <ul className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Glass‑smooth experience with real‑time answers</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Admin uploads PDFs → AI learns automatically</span>
            </div>
            <div className="flex gap-5 items-center">
              <p className="h-2.5 w-2.5 bg-[#DC6D18] rounded-full"></p>
              <span>Always cited answers and inline images</span>
            </div>
          </ul>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 rounded-r-md bg-[#eec49b] p-20 flex flex-col gap-5"
        >
          <div className="flex justify-between items-center">
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
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name[0]}</p>
          )}
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name[0]}</p>
          )}
          <Input
            label="university email"
            name="email"
            type="email"
            placeholder="you@university.edu"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
          <div className="flex justify-between items-center">
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
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password[0]}</p>
          )}
          {errors.non_field_errors && (
            <p className="text-red-500 text-sm">{errors.non_field_errors[0]}</p>
          )}
          <Button
            type="submit"
            label="Create Account"
            className="bg-[#DC6D18]"
          />
          <p className="text-black">
            Already have an account? Switch to {" "}
            <Link href={"/login"} className="font-bold">
              Log in
            </Link>{" "}
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
