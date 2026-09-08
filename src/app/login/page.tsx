"use client";
import type { LoginResponse, LoginError } from "@/types/login";
import { Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "@/api/axios";
import axios from "axios";

import { toast } from "react-toastify";

import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "../actions";

export default  function LoginPage() {
  return (
    <Suspense fallback={<div>loading..</div>}>
      <LoginContent />
    </Suspense>
  )
}
function LoginContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  async function handleLogin(username: string, password: string) {
    try {
      toast.loading("Logging in...", { autoClose: 2000,toastId: "login-loading" });
      
      const response = await api.post<LoginResponse>("/auth/login", {
        username: username,
        password: password,
      });

      if (response.status != 200 || !response.data.token) {
        toast.update("login-loading", {
          render: response.statusText,
          type: "error",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });
      }
      toast.update("login-loading", {
        render: "Login successful",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        closeButton: true,
      });

      await setCookie("token", response.data.token);

      router.push(redirect);
    } catch (error: unknown) {
      if (axios.isAxiosError<LoginError>(error)) {
        toast.update("login-loading", {
          render: error.response?.data.message || "Login failed",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });

      } else {
        toast.update("login-loading", {
          render: "An unexpected error occurred",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });
      }
    }
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-2xl md:p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-mono text-2xl font-bold text-white">
              <span className="text-cyan-500"># </span>
              Login
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(username, password);
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="text"
                className="text-s mb-2 block font-mono text-zinc-300"
              >
                username
              </label>

              <input
                id="username"
                name="username"
                onChange={(t) => setUsername(t.target.value)}
                type="text"
                autoComplete="username"
                placeholder="Username"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 font-mono text-sm text-white transition-all outline-none placeholder:text-zinc-400 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-s font-mono text-zinc-300"
                >
                  password
                </label>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                onChange={(t) => setPassword(t.target.value)}
                autoComplete="current-password"
                placeholder="Password"
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 font-mono text-sm text-white transition-all outline-none placeholder:text-zinc-400 focus:border-cyan-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-lg font-black text-cyan-400 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/15 hover:text-cyan-300 active:scale-[0.99]"
            >
              <span className="relative z-10">login</span>
            </button>
          </form>
        </motion.div>

        {/* Back */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 block text-center font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          ← back to home
        </motion.a>
      </div>
    </main>
  );
}
