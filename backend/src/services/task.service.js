const Task = require("../models/task.model");
const { encrypt, decrypt } = require("../utils/encryption");

// Create Task

const createTask = async (data, userId) => {
  // Encrypt description before storing
  const encryptedDescription = encrypt(data.description);

  const task = await Task.create({
    title: data.title,
    description: encryptedDescription,
    status: data.status,
    user: userId,
  });

  return task;
};

// Get Tasks (Pagination + Filter + Search)

const getTasks = async (query, userId) => {
  const { page = 1, limit = 10, status, search } = query;

  const filter = { user: userId };

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  // Decrypt descriptions before returning
  const decryptedTasks = tasks.map((task) => ({
    ...task.toObject(),
    description: decrypt(task.description),
  }));

  const total = await Task.countDocuments(filter);

  return {
    tasks: decryptedTasks,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

// Update Task

const updateTask = async (taskId, data, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (data.description) {
    data.description = encrypt(data.description);
  }

  Object.assign(task, data);
  await task.save();

  task.description = decrypt(task.description);

  return task;
};

// Delete Task

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return;
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
