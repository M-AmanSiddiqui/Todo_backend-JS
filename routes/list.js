import { Router } from "express";
import mongoose from "mongoose";
import User from "../model/user.js";
import List from "../model/list.js";

const router = Router();

// 🔹 Create Task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    if (!title || !body || !id) {
      return res.status(400).json({ message: "title, body and id are required" });
    }
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    existingUser.List.push(list._id);
    await existingUser.save();

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// 🔹 Update Task
router.put("/updateTask/:taskId", async (req, res) => {
  try {
    const { title, body } = req.body;
    const { taskId } = req.params;
    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }
    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    const list = await List.findByIdAndUpdate(
      taskId,
      { title, body },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Updated", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Delete Task
router.delete("/deleteTask/:taskId/:userId", async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid task or user id" });
    }

    const existingUser = await User.findByIdAndUpdate(userId, {
      $pull: { List: taskId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await List.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 Get All Tasks
router.get("/getTasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const list = await List.find({ user: id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
