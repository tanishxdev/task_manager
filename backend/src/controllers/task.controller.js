const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../services/task.service");

// Create

const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body, req.user.id);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Get

const getAll = async (req, res, next) => {
  try {
    const result = await getTasks(req.query, req.user.id);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Update

const update = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body, req.user.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete

const remove = async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
