import { AlertCircle, Star } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SignUp } from "../utils/auth";
import { Validators } from "../utils/Validatore";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!Validators.name(form.fullName)) {
      return setError("Name must be between 20 and 60 characters.");
    }
    if (!Validators.email(form.email)) {
      return setError("Invalid email address.");
    }
    if (!Validators.address(form.address)) {
      return setError("Address cannot exceed 400 characters.");
    }
    if (!Validators.password(form.password)) {
      return setError(
        "Password must be 8-16 chars, with 1 uppercase & 1 special char."
      );
    }

    setLoading(true);

    try {
      const data = await SignUp({
        name: form.fullName,
        email: form.email,
        address: form.address,
        password: form.password,
      });

      if (data) {
        // Assuming successful signup returns user data or success message
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-2xl shadow-lg w-full max-w-lg bg-blue-50">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star size={24} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-sm mt-1">Join us today!</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            label="Full Name"
            type="text"
            placeholder="full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <span className="text-xs text-gray-800 px-3">20 - 60 Characters</span>
        </div>
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
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            label="Address"
            type="text"
            placeholder="123 Main St"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-indigo-600 font-semibold cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
