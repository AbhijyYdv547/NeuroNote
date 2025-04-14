"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function AuthPage({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Toaster position="top-center" />
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
        <div className="space-y-4">{children}</div>
        {footer}
      </div>
    </div>
  );
}
