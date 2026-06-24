"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/students/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("student", JSON.stringify(res.data.student));
      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "var(--background)",
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-xl border p-8"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "var(--foreground)",
            }}
          >
            Welcome Back
          </h1>

          <p
            className="mt-3"
            style={{
              color: "var(--muted)",
            }}
          >
            Login to your Student SaaS Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border outline-none"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg border outline-none pr-16"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm"
                style={{
                  color: "var(--muted)",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p
            style={{
              color: "var(--muted)",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="mt-8 border-t pt-5 text-center">
          <p
            className="text-sm"
            style={{
              color: "var(--muted)",
            }}
          >
            Student SaaS Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
