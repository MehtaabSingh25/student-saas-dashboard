"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import toast from "react-hot-toast";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  useEffect(() => {
    loadTasks();
  }, [search, page, filter]);

  const loadTasks = async () => {
    try {
      const res = await api.get(
        `/tasks?search=${search}&page=${page}&filter=${filter}`,
      );

      setTasks(res.data.tasks);
      setPages(res.data.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Task title is required");
    }

    try {
      await api.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });

      toast.success("Task Created Successfully");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");

      loadTasks();
    } catch (error) {
      toast.error("Failed to Create Task");
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      toast.success("Task Status Updated");

      loadTasks();
    } catch (error) {
      toast.error("Failed to Update Task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      toast.success("Task Deleted");

      loadTasks();
    } catch (error) {
      toast.error("Failed to Delete Task");
    }
  };

  const editTask = (task) => {
    setEditingTask(task);

    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority || "Medium");
    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tasks/${editingTask._id}`, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        dueDate: editDueDate,
      });

      toast.success("Task Updated Successfully");

      setEditingTask(null);
      setEditTitle("");
      setEditDescription("");

      loadTasks();
    } catch (error) {
      toast.error("Failed to Update Task");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Tasks
        </h1>

        <p className="mt-2 font-medium" style={{ color: "var(--muted)" }}>
          Manage all your tasks.
        </p>
      </div>

      <form
        onSubmit={createTask}
        className="p-6 rounded-xl border mb-8"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Create New Task
        </h2>

        <input
          className="border rounded-lg p-3 w-full mb-3"
          style={{
            color: "var(--foreground)",
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded-lg p-3 w-full mb-3"
          style={{
            color: "var(--foreground)",
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg p-3 w-full mb-3"
          style={{
            color: "var(--foreground)",
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg p-3 w-full mb-3"
          style={{
            color: "var(--foreground)",
            background: "var(--background)",
            borderColor: "var(--border)",
          }}
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
          Create Task
        </button>
      </form>

      {editingTask && (
        <form
          onSubmit={updateTask}
          className="p-6 rounded-xl mb-8 border"
          style={{
            background: "var(--card)",
            borderColor: "#facc15",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Edit Task
          </h2>

          <input
            className="border rounded-lg p-3 w-full mb-3"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            className="border rounded-lg p-3 w-full mb-3"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="border rounded-lg p-3 w-full mb-3"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="border rounded-lg p-3 w-full mb-3"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-3 rounded-lg"
            >
              Update Task
            </button>

            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="bg-slate-500 text-white px-5 py-3 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        className="p-6 rounded-xl border mb-6"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            className="border rounded-lg p-3 w-full"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm md:text-base w-full md:w-40"
            style={{
              color: "var(--foreground)",
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-4 py-2 rounded"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          Previous
        </button>

        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          Page {page} of {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="border px-4 py-2 rounded"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
