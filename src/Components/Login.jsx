import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function Login() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                    bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] pt-20 ">

            {/* Animated Glow Background */}
            <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem]
                      bg-blue-500/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem]
                      bg-violet-500/30 rounded-full blur-[120px] animate-pulse"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl
                      bg-white/10 backdrop-blur-2xl
                      border border-indigo-400/30
                      shadow-[0_25px_70px_-15px_rgba(99,102,241,0.6)]
                      p-8 text-white">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-white/70">
                        Sign in to your premium dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-white/80">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="@example.com"
                            className="mt-2 w-full rounded-xl px-4 py-3
                         bg-white/10 border border-white/20
                         text-white placeholder-white/50
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-white/80">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="mt-2 w-full rounded-xl px-4 py-3
                         bg-white/10 border border-white/20
                         text-white placeholder-white/50
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
                        />
                    </div>

                    {/* Remember / Forgot */}
                    <div className="flex items-center justify-between text-sm text-white/70">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-indigo-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 transition">
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        className="w-full rounded-xl py-3 font-semibold
                       bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-500
                       shadow-lg shadow-indigo-500/40
                       hover:scale-[1.03] hover:shadow-indigo-500/60
                       active:scale-[0.97]
                       transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-white/20"></div>
                    <span className="px-3 text-xs uppercase tracking-wide text-white/50">
                        Or continue with
                    </span>
                    <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className="flex items-center justify-center gap-2 rounded-xl
                       bg-white/10 border border-white/20 py-2.5
                       hover:bg-white/20 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-semibold">Google</span>
                    </button>

                    <button
                        className="flex items-center justify-center gap-2 rounded-xl
                       bg-white/10 border border-white/20 py-2.5
                       hover:bg-white/20 transition"
                    >
                        <FaGithub className="text-white" />
                        <span className="text-sm font-medium">GitHub</span>
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-white/70">
                    Don’t have an account?
                    <span className="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer transition">
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}
