"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import CustomButton from "@/app/components/client/common/CustomButton";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/4bm-4dm1n";
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/assets/images/logos/header-logo.png"
            alt="Logo"
            width={200}
            height={100}
          />
          <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <CustomButton text="Submit" type="submit" className="self-center" />
        </form>
      </div>
    </div>
  );
}
