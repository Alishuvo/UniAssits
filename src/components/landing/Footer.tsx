"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#2B1A12] to-[#1F120C] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            type: "keyframes",
            duration: 1.4,
            ease: "easeOut",
          }}
        >
          <h3 className="text-2xl font-bold text-orange-400">UniAssist</h3>
          <p className="text-sm mt-3 text-gray-400 max-w-sm">
            An AI assistant for universities. Built with love and a lot of coffee.
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              delay: 0.2,
              type: "keyframes",
              duration: 1.2,
              ease: "easeOut",
            }}
            className="flex gap-4 mt-5"
          >
            <Link target="_blank" href={"www.facebook.com"}>
              <FaFacebook className="text-xl text-white hover:text-orange-400 transition-colors" />
            </Link>
            <Link target="_blank" href={"www.linkedin.com"}>
              <FaLinkedin className="text-xl text-white hover:text-orange-400 transition-colors" />
            </Link>
            <Link target="_blank" href={"www.instagram.com"}>
              <FaInstagram className="text-xl text-white hover:text-orange-400 transition-colors" />
            </Link>
            <Link target="_blank" href={"www.twitter.com"}>
              <FaTwitter className="text-xl text-white hover:text-orange-400 transition-colors" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Product */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            delay: 0.15,
            type: "keyframes",
            duration: 1.4,
            ease: "easeOut",
          }}
        >
          <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">
              Features
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              How it works
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Admin
            </li>
          </ul>
        </motion.div>

        {/* Company */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            delay: 0.3,
            type: "keyframes",
            duration: 1.4,
            ease: "easeOut",
          }}
        >
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">
              Team
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              FAQ
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Sign in
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{
          delay: 0.2,
          type: "keyframes",
          duration: 1.2,
          ease: "easeOut",
        }}
        className="border-t border-white/10 py-4 text-center text-xs text-gray-400"
      >
        © 2025 UniAssist. All rights reserved.
      </motion.div>
    </footer>
  );
}
