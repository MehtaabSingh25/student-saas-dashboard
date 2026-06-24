"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, closeSidebar }) {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Tasks",
      href: "/tasks",
    },
    {
      name: "Analytics",
      href: "/analytics",
    },
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-full
          w-64
          z-50
          transform
          transition-transform
          duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div
          className="p-6"
          style={{
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h1
            className="text-2xl font-bold"
            style={{
              color: "var(--foreground)",
            }}
          >
            StudentSaaS
          </h1>

          <p
            className="text-sm mt-1"
            style={{
              color: "var(--muted)",
            }}
          >
            Productivity Dashboard
          </p>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className={`p-3 rounded-lg transition ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "hover:opacity-80"
              }`}
              style={
                pathname === link.href
                  ? {}
                  : {
                      color: "var(--foreground)",
                    }
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
