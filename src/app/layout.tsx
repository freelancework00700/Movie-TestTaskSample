"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContext } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en">
        <body className={inter.className} style={{ position: "relative" }}>{children}</body>
      </html>
    </AuthContext>
  );
}
