// src/app/(dashboard)/layout.tsx
import React from "react";
import "../../../styles/globals.css";
import SideNav from "../SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Dashboard | UniAssist</title>
        <meta name="description" content="UniAssist Dashboard Panel" />
      </head>

      <body className="bg-gray-50 text-gray-800">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <SideNav />
          {/* Main container */}
          <main className="flex-1 ml-64 p-6 overflow-y-auto h-screen bg-[#FFF4E4] ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
