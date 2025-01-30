const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;
    const task = await Task.create({ title, description, assignedTo, status });
    res.status(201).json({ message: "Task Created Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email role");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });

    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.status(200).json({ message: "Task Deleted Successfully", data: task });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.markAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { status: "Completed" }, { new: true });

    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.status(200).json({ message: "Task Marked as Completed", task });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
