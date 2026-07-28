import API from "@/api/axios";
import AuthLayout from "@/layouts/AuthLayout";
import { loginSuccess } from "@/redux/slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8 sm:p-9">
        <div className="mb-8">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-primary mb-3">
            Welcome back
          </span>
          <h2 className="font-display text-3xl font-semibold text-brand-ink leading-tight">
            Sign in to CareerForge
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Pick up where you left off and keep building.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="you@example.com"
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <button type="button" className="text-xs text-brand-primary hover:underline font-medium">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/25 focus:border-brand-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-teal-600 text-white rounded-xl py-3 font-semibold text-sm transition-all duration-200 shadow-brand hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400 font-medium">or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await API.post("/auth/google", {
                  credential: credentialResponse.credential,
                });
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch(loginSuccess(res.data));
                navigate("/dashboard");
              } catch (error) {
                console.error(error);
              }
            }}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        <p className="text-sm text-center text-gray-500 mt-7">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-primary font-semibold hover:underline">
            Create one free
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
