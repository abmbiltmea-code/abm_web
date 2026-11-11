"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, User, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/4bm-4dm1n";
        return;
      }
      toast.error(data.message);
    } catch {
      toast.error("An error occurred during login");
    }
    setIsSubmitting(false);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/60 py-3 pl-11 pr-4 text-sm text-secondary placeholder:text-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] bg-white">
      {/* Visual panel */}
      <div className="relative hidden lg:block overflow-hidden">
        <Image
          src="/assets/images/home/hero/sl01.jpg"
          alt=""
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/20 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Backend Console
          </span>

          <div className="flex flex-col gap-6">
            <Image
              src="/assets/images/logos/abm-watermark-hero.svg"
              alt=""
              width={1288}
              height={379}
              className="w-full max-w-[600px] h-auto"
            />
            <div>
              <h1 className="font-tasa text-[34px] leading-[1.15] font-semibold max-w-[16ch]">
                The Future of Construction
              </h1>
              <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-white/65">
                Manage pages, projects, news and enquiries for the ABM website
                from one place.
              </p>
            </div>
            <div className="h-px w-16 bg-primary" />
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex items-center justify-center px-6 py-12 bg-[#F4F3F1] bg-[radial-gradient(ellipse_at_top_right,rgba(227,30,38,0.06),transparent_55%)]">
        <div className="w-full max-w-[420px]">
          <div className="rounded-2xl bg-white p-8 sm:p-10 border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col items-center gap-5 text-center">
              <Image
                src="/assets/images/logos/header-logo.png"
                alt="ABM"
                width={180}
                height={90}
                className="h-auto w-[170px]"
              />
              <div>
                <h2 className="font-tasa text-[22px] font-semibold text-secondary">
                  Welcome back
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Sign in to continue to the admin console.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-gray-600">
                  Username
                </span>
                <span className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    autoFocus
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass}
                  />
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-gray-600">
                  Password
                </span>
                <span className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:text-secondary cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-white shadow-[0_8px_20px_-8px_rgba(227,30,38,0.6)] transition-all hover:bg-[#c8161d] hover:shadow-[0_10px_24px_-8px_rgba(227,30,38,0.7)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[12px] text-gray-400">
            © {new Date().getFullYear()} ABM · Authorised access only
          </p>
        </div>
      </div>
    </div>
  );
}
