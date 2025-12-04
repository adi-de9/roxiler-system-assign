import React, { useEffect } from "react";
import { useState } from "react";
import { AlertCircle, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { login } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      console.log("Already Logged in");

      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    if (!form.email || !form.password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await login({ email: form.email, password: form.password });

      if (data.success) {
        setError("");
        setForm({ email: "", password: "" });
        setUser(data.user);
      }
      // navigate('/');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-8 rounded-2xl shadow-lg w-full max-w-lg bg-blue-50 ">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star size={24} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            label="Email"
            type="email"
            placeholder="adi@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full btn bg-indigo-600 text-white hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
      <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
        <p className="font-semibold mb-2">Test Credentials:</p>
        <div className="grid grid-cols-2 gap-2">
          <span>Admin: admin@admin.com</span>
          <span>Pass: Password!1</span>
          <span>Owner: owner@store.com</span>
          <span>Pass: Password!1</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
