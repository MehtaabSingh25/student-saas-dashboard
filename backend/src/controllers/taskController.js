import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      studentId: req.student._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const page = Number(req.query.page) || 1;
    const limit = 5; // 5 tasks per page

    const skip = (page - 1) * limit;

    const query = {
      studentId: req.student._id,

      title: {
        $regex: search,
        $options: "i",
      },
    };

    const filter = req.query.filter;
    const priority = req.query.priority;

    if (filter === "completed") {
      query.completed = true;
    }

    if (filter === "pending") {
      query.completed = false;
    }

    if (priority && priority !== "all") {
      query.priority = priority;
    }

    const tasks = await Task.find(query).skip(skip).limit(limit);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      studentId: req.student._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title ?? task.title;

    task.description = req.body.description ?? task.description;

    task.completed = req.body.completed ?? task.completed;

    task.priority = req.body.priority ?? task.priority;

    task.dueDate = req.body.dueDate ?? task.dueDate;

    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      studentId: req.student._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      studentId: req.student._id,
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((task) => task.completed).length;

    const pendingTasks = totalTasks - completedTasks;

    const productivity =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      productivity,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      studentId: req.student._id,
    });

    const completed = tasks.filter((task) => task.completed).length;

    const pending = tasks.filter((task) => !task.completed).length;

    const overdue = tasks.filter(
      (task) =>
        !task.completed && task.dueDate && new Date(task.dueDate) < new Date(),
    ).length;

    const total = tasks.length;

    const productivity =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      pending,
      overdue,
      productivity,
    });
  } catch (error) {
    next(error);
  }
};

export const getWeeklyStats = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      studentId: req.student._id,
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const data = [0, 0, 0, 0, 0, 0, 0];

    tasks.forEach((task) => {
      const day = new Date(task.createdAt).getDay();

      data[day]++;
    });

    res.json({
      labels: weekDays,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      studentId: req.student._id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
