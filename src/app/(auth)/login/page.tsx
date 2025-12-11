"use client";

import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Button } from "@/components/common/ui/buttons/Button";
import Input from "@/components/common/ui/buttons/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = `accessToken=${data.access}; path=/;`;
        document.cookie = `refreshToken=${data.refresh}; path=/;`;
        router.push("/chat");
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
          onSubmit={handleLogin}
          className="w-1/2 rounded-r-md bg-[#eec49b] p-20 flex flex-col gap-5"
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between items-center">
            <Link
              href={"/forgot-password"}
              className="text-[#6F6565] underline"
            >
              Forget Password?
            </Link>
            <Button type="submit" label="Log in" className="bg-[#DC6D18]" />
          </div>
          <p className="text-black">
            New here?{" "}
            <Link href={"/signup"} className="font-bold">
              Click Sign up
            </Link>{" "}
            above.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
