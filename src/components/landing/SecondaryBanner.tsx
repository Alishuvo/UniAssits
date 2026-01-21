"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export const SecondaryBanner = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        type: "keyframes",
        duration: 1.4,
        ease: "easeOut",
      }}
      className="bg-[#FFF4E4] my-5 w-8/12 mx-auto p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      {/* Text */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          delay: 0.15,
          type: "keyframes",
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          Ready to try it?
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Jump into the chat and ask about your campus — fees, departments,
          transport, and more.
        </p>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          delay: 0.3,
          type: "keyframes",
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
        >
          Open the Chat
        </Link>
      </motion.div>
    </motion.div>
  );
};
