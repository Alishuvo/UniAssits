"use client";

import React from "react";
import { Headline } from "../common/Headline";
import { Description } from "../common/Description";
import { motion } from "framer-motion";

export const Admin = () => {
  // Subtle alternating entry motions
  const cardAnims = [
    { y: 40, opacity: 0 },
    { y: 40, opacity: 0 },
    { x: -40, opacity: 0 },
    { x: 40, opacity: 0 },
  ];

  return (
    <div id="Admin">
      {/* 🔹 Animated Headline */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{
          type: "keyframes",
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <Headline text="Admin" />
      </motion.div>

      {/* 🔹 Animated Description */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{
          delay: 0.15,
          type: "keyframes",
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        <Description text="Powerful admin panel" />
      </motion.div>

      <div className="mx-auto flex gap-5 items-center max-w-4xl my-5">
        {/* Left column */}
        <div className="flex gap-5">
          <motion.div
            initial={cardAnims[0]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.1,
              type: "keyframes",
              duration: 1.4,
              ease: "easeOut",
            }}
            className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <p className="h-[9px] w-[43px] bg-black"></p>
              <p className="h-[22px] w-[53px] bg-[#ff7f5c]"></p>
            </div>
            <div>
              <h1>Documents & versions</h1>
              <p className="text-sm">
                Track processing, re-index on change, and deprecate outdated
                pages. Bulk imports supported.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={cardAnims[1]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.25,
              type: "keyframes",
              duration: 1.4,
              ease: "easeOut",
            }}
            className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <p className="h-[9px] w-[43px] bg-black"></p>
              <p className="h-[22px] w-[53px] bg-[#3734A9]"></p>
            </div>
            <div>
              <h1>Media library</h1>
              <p className="text-sm">
                Auto-extracted images from PDFs plus manual uploads. Tag people,
                departments, or locations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-center items-center gap-5">
          <motion.div
            initial={cardAnims[2]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.4,
              type: "keyframes",
              duration: 1.4,
              ease: "easeOut",
            }}
            className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5"
          >
            <p className="text-sm">
              Top queries, deflection rate, no-answer topics
            </p>
          </motion.div>

          <motion.div
            initial={cardAnims[3]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.55,
              type: "keyframes",
              duration: 1.4,
              ease: "easeOut",
            }}
            className="w-[280px] shadow-xl p-5 rounded-lg flex flex-col gap-5"
          >
            <p className="text-sm">
              Latency, satisfaction — use feedback to improve content.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
