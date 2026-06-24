"use client";

import toast from "react-hot-toast";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "@/lib/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [analyticsRes, weeklyRes] = await Promise.all([
        api.get("/tasks/analytics"),
        api.get("/tasks/weekly-stats"),
      ]);

      setAnalytics(analyticsRes.data);

      setWeeklyStats(weeklyRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics");
    }
  };

  if (!analytics || !weeklyStats) {
    return <p>Loading...</p>;
  }

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [analytics.completed, analytics.pending],
        backgroundColor: ["#10b981", "#6366f1"],
        borderColor: ["#10b981", "#6366f1"],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: weeklyStats?.labels || [],
    datasets: [
      {
        label: "Tasks Created",
        data: weeklyStats?.data || [],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const total = analytics.completed + analytics.pending;

  const productivity =
    total === 0 ? 0 : Math.round((analytics.completed / total) * 100);

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--foreground)",
          }}
        >
          Analytics
        </h1>

        <p
          className="mt-2"
          style={{
            color: "var(--muted)",
          }}
        >
          View your task performance.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-3 mb-8">
        <div
          className="p-6 rounded-xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            style={{
              color: "var(--muted)",
            }}
          >
            Total Tasks
          </h3>

          <p
            className="text-4xl font-bold mt-2"
            style={{
              color: "var(--foreground)",
            }}
          >
            {analytics.total}
          </p>
        </div>

        <div
          className="p-6 rounded-xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            style={{
              color: "var(--muted)",
            }}
          >
            Completed Tasks
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {analytics.completed}
          </p>
        </div>

        <div
          className="p-6 rounded-xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            style={{
              color: "var(--muted)",
            }}
          >
            Pending Tasks
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {analytics.pending}
          </p>
        </div>

        <div
          className="p-6 rounded-xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            style={{
              color: "var(--muted)",
            }}
          >
            Productivity
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {productivity}%
          </p>
        </div>

        <div
          className="p-6 rounded-xl border"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            style={{
              color: "var(--muted)",
            }}
          >
            Overdue Tasks
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {analytics.overdue}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-8">
        <div
          className="p-6 rounded-xl border"
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
            Task Completion Chart
          </h2>

          <div className="max-w-md">
            <Pie data={pieData} />
          </div>
        </div>

        <div
          className="p-6 rounded-xl border"
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
            Weekly Activity
          </h2>

          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
