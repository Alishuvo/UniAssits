"use client";

import { ProfileDataType } from "@/app/(site)/page";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

type Props = {
  profile: ProfileDataType;
  index: number;
};

// Zig-zag entry animations (alternate per card)
const zigZagAnimations = [
  { x: -120, y: 80, opacity: 0 },  // left → down
  { x: 120, y: 80, opacity: 0 },   // right → down
  { x: -120, y: -80, opacity: 0 }, // left → up
  { x: 120, y: -80, opacity: 0 },  // right → up
];

const ProfileCard = ({
  profile: { img, name, title, description, socialLinks },
  index,
}: Props) => {
  const anim = zigZagAnimations[index % zigZagAnimations.length];

  return (
    <motion.div
      initial={anim}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        delay: index * 0.25,  
        type: "keyframes",
        duration: 1.6,        
        ease: "easeOut",
      }}
      className="flex flex-col gap-5 items-center shadow-xl w-[320px] bg-[#F8E0C9] rounded-lg p-2"
    >
      <Image
        src={img}
        alt="profile"
        height={280}
        width={300}
        className="w-[300px] h-[280px] object-cover object-center rounded-lg"
      />

      <div className="flex flex-col gap-2 p-2 justify-center items-center text-center">
        <h1 className="text-[#2B1A12]">{name}</h1>
        <h1 className="text-[#DC6D18]">{title}</h1>
        <p className="text-[#2B1A12]">{description}</p>

        <div className="flex gap-3 items-center">
          <Link target="_blank" href={socialLinks?.facebook}>
            <FaFacebook className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.linkedin}>
            <FaLinkedin className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.instagram}>
            <FaInstagram className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.twitter}>
            <FaTwitter className="text-xl" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
