"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ toggleSidebar }) {
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();

  const student =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("student") || "null")
      : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");

    router.push("/login");
  };

  return (
    <header
      className="h-16 px-6 flex items-center justify-between border-b"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl"
          style={{
            color: "var(--foreground)",
          }}
        >
          ☰
        </button>

        <h1
          className="text-xl md:text-2xl font-bold"
          style={{
            color: "var(--foreground)",
          }}
        >
          Student SaaS
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {student?.name?.charAt(0)?.toUpperCase()}
          </div>

          <span
            style={{
              color: "var(--foreground)",
            }}
          >
            {student?.name}
          </span>
        </div>

        <button onClick={toggleTheme} className="text-xl">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
