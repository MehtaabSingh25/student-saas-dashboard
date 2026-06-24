"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/students/register", form);

      toast.success(res.data.message);

      router.push("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
            Create Account
          </h1>

          <p
            className="mt-3"
            style={{
              color: "var(--muted)",
            }}
          >
            Join your Student SaaS Dashboard
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
              Full Name
            </label>

            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Enter your name"
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
                placeholder="Create password"
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

          <div>
            <label
              className="block mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full p-3 rounded-lg border outline-none pr-16"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-sm"
                style={{
                  color: "var(--muted)",
                }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p
            style={{
              color: "var(--muted)",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
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
