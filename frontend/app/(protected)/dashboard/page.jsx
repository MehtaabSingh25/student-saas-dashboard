"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import StatCard from "@/components/StatCard";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get("/tasks/stats"),
        api.get("/tasks/dashboard"),
      ]);

      setStats(statsRes.data);

      const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];

      setRecentTasks(tasks.slice(0, 5));

      setUpcomingTasks(
        tasks
          .filter((task) => task.dueDate && !task.completed)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 5),
      );

      setHighPriorityTasks(
        tasks
          .filter((task) => task.priority === "High" && !task.completed)
          .slice(0, 5),
      );

      setOverdueTasks(
        tasks.filter(
          (task) =>
            task.dueDate &&
            !task.completed &&
            new Date(task.dueDate) < new Date(),
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Dashboard
        </h1>

        <p className="mt-2" style={{ color: "var(--muted)" }}>
          Track your productivity and manage your tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Tasks" value={stats.totalTasks} />
        <StatCard title="Completed" value={stats.completedTasks} />
        <StatCard title="Pending" value={stats.pendingTasks} />
        <StatCard title="Productivity" value={`${stats.productivity}%`} />
      </div>

      {overdueTasks.length > 0 && (
        <div className="mt-8 bg-red-100 border border-red-300 rounded-xl p-4">
          <h2 className="font-bold text-red-700">⚠ Overdue Tasks</h2>

          <p className="text-red-600 mt-2">
            You have {overdueTasks.length} overdue task(s) requiring attention.
          </p>
        </div>
      )}

      <div
        className="mt-8 rounded-xl p-6 border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
          }}
        >
          Upcoming Deadlines
        </h2>

        {upcomingTasks.length === 0 ? (
          <p
            style={{
              color: "var(--muted)",
            }}
          >
            No upcoming deadlines.
          </p>
        ) : (
          upcomingTasks.map((task) => (
            <div
              key={task._id}
              className="py-3 border-b"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <p
                className="font-semibold"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {task.title}
              </p>

              <p
                style={{
                  color: "var(--muted)",
                }}
              >
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      <div
        className="mt-8 rounded-xl p-6 border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
          }}
        >
          High Priority Tasks
        </h2>

        {highPriorityTasks.length === 0 ? (
          <p
            style={{
              color: "var(--muted)",
            }}
          >
            No high priority tasks.
          </p>
        ) : (
          highPriorityTasks.map((task) => (
            <div
              key={task._id}
              className="py-3 border-b"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <p
                className="font-semibold"
                style={{
                  color: "var(--foreground)",
                }}
              >
                🔴 {task.title}
              </p>
            </div>
          ))
        )}
      </div>

      <div
        className="mt-8 rounded-xl p-6 border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            color: "var(--foreground)",
          }}
        >
          Recent Activity
        </h2>

        {recentTasks.map((task) => (
          <div
            key={task._id}
            className="py-3 border-b"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <p
              style={{
                color: "var(--foreground)",
              }}
            >
              {task.completed ? "✅ Completed" : "📝 Created"} {task.title}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-8 rounded-xl p-6 shadow-sm border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-2xl p-2 font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Quick Actions
        </h2>

        <div className="flex gap-4">
          <Link href="/tasks">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
              Manage Tasks
            </button>
          </Link>

          <Link href="/analytics">
            <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
              View Analytics
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
