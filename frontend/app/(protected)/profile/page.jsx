"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/students/profile");

      setProfile(res.data);

      setName(res.data.name);
      setEmail(res.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const res = await api.put("/students/profile", {
        name,
        email,
      });

      localStorage.setItem("student", JSON.stringify(res.data.student));

      setProfile({
        ...profile,
        name,
        email,
      });

      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--foreground)",
          }}
        >
          Profile
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--muted)",
          }}
        >
          Manage your account information.
        </p>
      </div>

      <div
        className="rounded-xl border p-8"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2
              className="text-2xl font-bold"
              style={{
                color: "var(--foreground)",
              }}
            >
              {name}
            </h2>

            <p
              style={{
                color: "var(--muted)",
              }}
            >
              {email}
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <div>
            <label
              className="block mb-2 font-medium"
              style={{
                color: "var(--foreground)",
              }}
            >
              Name
            </label>

            <input
              disabled={!editing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border"
              style={{
                background: editing ? "var(--background)" : "var(--card)",
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
              Email
            </label>

            <input
              disabled={!editing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border"
              style={{
                background: editing ? "var(--background)" : "var(--card)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-fit"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={saveProfile}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setName(profile.name);
                  setEmail(profile.email);
                }}
                className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
