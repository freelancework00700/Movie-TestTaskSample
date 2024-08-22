"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContext } from "@/context/AuthContext";
import NoSSRProvider from "@/components/NoSSRProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en">
        <body className={inter.className} style={{ position: "relative" }}>
          <NoSSRProvider>
            {children}
          </NoSSRProvider>
        </body>
      </html>
    </AuthContext>
  );
}
