import React, { useState, useContext } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useContext(ShopContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });

    const handleAuth = async (provider) => {
        setIsLoading(true);
        setError(null);

        try {
            // We only support 'email' path fully with backend for now (mocked in api.js)
            // If provider is google/github, we just mock it for UI demo
            let userData, token;

            if (provider === 'email') {
                // Pass email as username, and fullName from form
                const response = await loginUser(formData.email, formData.password, formData.fullName);
                userData = response.user;
                token = response.token;
            } else {
                // Mock Social
                userData = {
                    name: provider === 'google' ? "Google User" : "GitHub Dev",
                    email: provider === 'google' ? "user@gmail.com" : "dev@github.com",
                    avatar: provider === 'google'
                        ? "https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff"
                        : "https://ui-avatars.com/api/?name=GitHub+Dev&background=000&color=fff"
                };
                token = "mock-social-token";
            }

            login(userData, token);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Authentication failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                    bg-gradient-to-br from-gray-100 via-white to-gray-200
                    dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] pt-20">

            {/* Animated Glow Background */}
            <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem]
                      bg-indigo-300/30 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem]
                      bg-purple-100 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md rounded-2xl
                      bg-white/70 dark:bg-white/5 backdrop-blur-2xl
                      border border-gray-200 dark:border-white/10
                      shadow-2xl
                      p-8 text-gray-900 dark:text-white">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {isLogin ? 'Sign in to access your account' : 'Join the ObitoStore community'}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                {/* Actual Form */}
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleAuth('email'); }}>
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                placeholder="Obito Uchiha"
                                required={!isLogin}
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="mt-2 w-full rounded-xl px-4 py-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-2 w-full rounded-xl px-4 py-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="mt-2 w-full rounded-xl px-4 py-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <button disabled={isLoading} className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-gray-900 to-black dark:from-indigo-600 dark:to-violet-600 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
                    <span className="px-3 text-xs uppercase tracking-wide text-gray-400">Or continue with</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleAuth('google')} disabled={isLoading} className="flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 transition">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-sm font-semibold">Google</span>
                    </button>

                    <button onClick={() => handleAuth('github')} disabled={isLoading} className="flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 transition">
                        <FaGithub className="text-gray-900 dark:text-white" />
                        <span className="text-sm font-medium">GitHub</span>
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    {isLogin ? "Don’t have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="ml-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
