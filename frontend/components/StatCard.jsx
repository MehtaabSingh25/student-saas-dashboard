export default function StatCard({ title, value }) {
  return (
    <div
      className="rounded-xl shadow-sm border p-6"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h3
        className="font-semibold text-sm uppercase tracking-wide"
        style={{
          color: "var(--muted)",
        }}
      >
        {title}
      </h3>

      <p
        className="text-4xl font-bold mt-3"
        style={{
          color: "var(--foreground)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
