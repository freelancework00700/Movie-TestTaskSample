"use client";

import { useAuthContext } from "@/context/useAuthContext";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthContext();
    useLayoutEffect(() => {
        if (!isAuthenticated) {
            redirect('/signIn');
        }
    }, [isAuthenticated]);
    return (
        <>
            {children}
        </>
    )
}