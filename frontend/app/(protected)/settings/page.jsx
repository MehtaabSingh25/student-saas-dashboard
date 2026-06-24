"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  let student = null;

  if (typeof window !== "undefined") {
    try {
      student = JSON.parse(localStorage.getItem("student") || "null");
    } catch {
      student = null;
    }
  }

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.put("/students/change-password", {
        currentPassword,
        newPassword,
      });

      toast.success(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--foreground)",
          }}
        >
          Settings
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--muted)",
          }}
        >
          Manage your preferences and account settings.
        </p>
      </div>

      <div
        className="rounded-xl border p-6 mb-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
          }}
        >
          Account Information
        </h2>

        <div className="space-y-3">
          <p style={{ color: "var(--muted)" }}>
            <strong
              style={{
                color: "var(--foreground)",
              }}
            >
              Name:
            </strong>{" "}
            {student?.name}
          </p>

          <p style={{ color: "var(--muted)" }}>
            <strong
              style={{
                color: "var(--foreground)",
              }}
            >
              Email:
            </strong>{" "}
            {student?.email}
          </p>
        </div>
      </div>

      <div
        className="rounded-xl border p-6 mb-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
          }}
        >
          Appearance
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p
              className="font-semibold"
              style={{
                color: "var(--foreground)",
              }}
            >
              Theme
            </p>

            <p
              style={{
                color: "var(--muted)",
              }}
            >
              Current Theme: {theme}
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Switch Theme
          </button>
        </div>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-6"
          style={{
            color: "var(--foreground)",
          }}
        >
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 rounded-lg border"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-lg border"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg border"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
