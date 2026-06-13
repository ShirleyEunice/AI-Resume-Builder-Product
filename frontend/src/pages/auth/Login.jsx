import API from "@/api/axios";
import AuthLayout from "@/layouts/AuthLayout";
import { loginSuccess } from "@/redux/slices/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    Password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      //redux update
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
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Login to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={formData.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-violet-700 text-white rounded-xl p-3 font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="pt-4">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await API.post("/auth/google", {
                  credential: credentialResponse.credential,
                });

                // store token
                localStorage.setItem("token", res.data.token);

                // store user
                localStorage.setItem(
                  "user",

                  JSON.stringify(res.data.user),
                );

                dispatch(loginSuccess(res.data));

                navigate("/dashboard");
              } catch (error) {
                console.error(error);
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        <p className="text-xs text-center text-gray-500">
          Don't have an account?
          <Link to="/register" className="text-brand-primary ml-1 font-medium">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
