import Task from '../models/Task.js';

// ১. ডাটাবেজ থেকে সব টাস্ক তুলে আনা (GET)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // নতুন টাস্কগুলো উপরে দেখাবে
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// ২. ডাটাবেজে নতুন টাস্ক সেভ করা (POST)
export const createTask = async (req, res) => {
  const { title, priority } = req.body;
  try {
    const newTask = new Task({ title, priority, status: 'Pending' });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create task', error: error.message });
  }
};

// ৩. টাস্কের স্ট্যাটাস পরিবর্তন করা (PUT/PATCH)
export const toggleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Failed to toggle task', error: error.message });
  }
};

// ৪. ডাটাবেজ থেকে টাস্ক মুছে ফেলা (DELETE)
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task wiped from database successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete task', error: error.message });
  }
};