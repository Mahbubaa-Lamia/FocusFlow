import mongoose from 'mongoose';

// রিয়েল-ওয়ার্ল্ড ডাটাবেজ স্কিমা ডিজাইন
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is absolutely required'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
}, {
  timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt টাইমস্ট্যাম্প যোগ করবে (SaaS Standard)
});

export default mongoose.model('Task', taskSchema);