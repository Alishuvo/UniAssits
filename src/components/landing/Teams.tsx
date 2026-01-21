"use client"
import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Title } from "@/components/common/Title";
import { motion } from "framer-motion";

export const Teams = () => {
  return (
    <div className="mt-20" id="teams">
      <motion.div className="flex flex-col gap-10"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: "keyframes",
          stiffness: 60,
          duration: 1,
        }}
      >
        <Title text="Team" />
        <Headline text="Meet the people building your campus assistant" />
        <Description text="Swap in your real profiles later; these are placeholders to fit the layout and vibe." />
      </motion.div>
    </div>
  );
};
