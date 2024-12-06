const express = require("express");
const Task = require("../../models/Task");
const authenticateToken = require("../../middleware/auth");
const roleAdmin = require("../../middleware/roleAdmin");
const router = express.Router();
const {body, validationResult}=require("express-validator");

//create task
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId=req.user._id;
    const taskObj={
      title:req.body.title,
      description:req.body.description ?? "",
      userId:userId
    }
    const task = new Task(taskObj);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

//gets all tasks admin only
router.get("/", authenticateToken, roleAdmin("admin"), async (req, res) => {
  try {
    const getAllTasks = await Task.find();
    res.json(getAllTasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//gets specific task user only
router.get("/user-task/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId, userId: userId });
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
//user get their all task
router.get("/user-task", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ userId: userId });
    if (task && task.length > 0) {
      return res.status(200).json(task);
    } else {
      return res.status(400).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//update task user only
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    const updateTask = await Task.findByIdAndUpdate(id, userBody, {
      new: true,
    });
    if (updateTask) {
      return res.json(updateTask);
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//delete task users only
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete(id);
    if (deleteTask) {
      return res.status(200).json({ message: "Task is deleted" });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
