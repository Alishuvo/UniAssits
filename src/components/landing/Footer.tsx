import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#2B1A12] to-[#1F120C] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-orange-400">UniAssist</h3>
          <p className="text-sm mt-3 text-gray-400 max-w-sm">
            An AI assistant for universities. Built with love and a lot of coffee.
          </p>
          <div className="flex gap-4 mt-5">
            <Link target="_blank" href={"www.facebook.com"}><FaFacebook className="text-xl text-white" /></Link>
            <Link target="_blank" href={"www.linkedin.com"}><FaLinkedin className="text-xl text-white" /></Link>
            <Link target="_blank" href={"www.instagram.com"}><FaInstagram className="text-xl text-white" /></Link>
            <Link target="_blank" href={"www.twitter.com"}><FaTwitter className="text-xl text-white" /></Link>
          </div>
        </div>
        {/* Product */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">How it works</li>
            <li className="hover:text-white cursor-pointer">Admin</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Team</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Sign in</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © 2025 UniAssist. All rights reserved.
      </div>
    </footer>
  );
}
