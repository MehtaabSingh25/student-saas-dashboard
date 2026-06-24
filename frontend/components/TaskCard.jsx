export default function TaskCard({ task, toggleTask, deleteTask, editTask }) {
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div
      className="rounded-xl p-5 mb-4 shadow-sm border"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-1">
          <h2
            className="text-2xl font-bold"
            style={{
              color: "var(--foreground)",
            }}
          >
            {task.title}
          </h2>

          <p
            className="mt-2"
            style={{
              color: "var(--muted)",
            }}
          >
            {task.description}
          </p>

          <div className="mt-3 mb-3">
            {task.priority === "High" && (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                🔴 High
              </span>
            )}

            {task.priority === "Medium" && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                🟡 Medium
              </span>
            )}

            {task.priority === "Low" && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                🟢 Low
              </span>
            )}
          </div>

          {task.dueDate && (
            <div className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isOverdue
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isOverdue
                  ? `⚠️ Overdue (${new Date(
                      task.dueDate,
                    ).toLocaleDateString()})`
                  : `📅 Due ${new Date(task.dueDate).toLocaleDateString()}`}
              </span>
            </div>
          )}

          <div className="mt-3">
            {task.completed ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Completed
              </span>
            ) : (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⏳ Pending
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => toggleTask(task)}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Toggle
          </button>

          <button
            onClick={() => editTask(task)}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
