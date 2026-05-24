import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Sparkles, CheckCircle2, TrendingUp, Plus, Trash2, Check, Clock } from 'lucide-react';



// Backend Target Gateway

const API_URL = 'http://localhost:5000/api/tasks';



export default function Dashboard({ darkMode }) {

  // 1. Core States

  const [tasks, setTasks] = useState([]);

  const [newCardTitle, setNewCardTitle] = useState('');

  const [priority, setPriority] = useState('Medium');

  const [focusScore, setFocusScore] = useState(75);

  const [loading, setLoading] = useState(true);



  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  const remainingTasks = totalTasks - completedTasks;



  // 2. Lifecycle: Mount হওয়ার সাথে সাথে ডাটাবেজ থেকে ডেটা নিয়ে আসা

  useEffect(() => {

    fetchTasksFromMongoDB();

  }, []);



  const fetchTasksFromMongoDB = async () => {

    try {

      const response = await axios.get(API_URL);

      setTasks(response.data);

      setLoading(false);

     

      // Dynamic Score Calibration

      if (response.data.length > 0) {

        const done = response.data.filter(t => t.status === 'Completed').length;

        const rate = Math.round((done / response.data.length) * 100);

        setFocusScore(Math.max(50, rate));

      }

    } catch (error) {

      console.error('Database fetch operation collapsed:', error);

      setLoading(false);

    }

  };



  // Dynamic AI Suggestion Module

  const getAISuggestion = () => {

    if (remainingTasks > 0) {

      return `AI Suggestion: You have ${remainingTasks} pending goals. Ready for a 25-min calibrated deep sprint?`;

    }

    return "AI Suggestion: Outstanding! All goals resolved. Take a 15-min cognitive break.";

  };



  // 3. Database Sync: টাস্ক ক্রিয়েট করা

  const handleAddTask = async (e) => {

    e.preventDefault();

    if (!newCardTitle.trim()) return;

   

    try {

      const response = await axios.post(API_URL, {

        title: newCardTitle,

        priority: priority

      });

      // MongoDB এর দেওয়া রিয়েল ডক্যুমেন্ট (_id সহ) স্টেটে পুশ করা

      setTasks([response.data, ...tasks]);

      setNewCardTitle('');

      setFocusScore(prev => Math.max(0, prev - 2));

    } catch (error) {

      console.error('Failed to commit task to MongoDB:', error);

    }

  };



  // 4. Database Sync: স্ট্যাটাস টগল করা (Pending <-> Completed)

  const toggleTaskStatus = async (id, currentStatus) => {

    try {

      const response = await axios.patch(`${API_URL}/${id}`);

     

      // MongoDB এর রিয়াক্টিভ স্টেট সিঙ্ক

      setTasks(tasks.map(task => task._id === id ? response.data : task));

     

      let scoreWeight = priority === 'High' ? 10 : (priority === 'Low' ? 3 : 5);

      setFocusScore(prev =>

        currentStatus === 'Pending'

          ? Math.min(100, prev + scoreWeight)

          : Math.max(0, prev - scoreWeight)

      );

    } catch (error) {

      console.error('Failed to patch task status in MongoDB:', error);

    }

  };



  // 5. Database Sync: টাস্ক ডিলিট করা

  const deleteTask = async (id) => {

    try {

      await axios.delete(`${API_URL}/${id}`);

      setTasks(tasks.filter(task => task._id !== id));

    } catch (error) {

      console.error('Failed to purge task from MongoDB:', error);

    }

  };



return (

  <div className={`min-h-screen flex-1 ml-64 p-8 transition-colors duration-300 ${darkMode ? 'bg-[#0f111a] text-white' : 'bg-background-warm'}`}>

     

      {/* Top Header Section */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-darkText">Welcome back! 👋</h2>

          <p className="text-mutedGray text-sm">Here's what's happening with your studies today.</p>

        </div>

       

        {/* Glassmorphism AI Box */}

        <div className="bg-white/60 backdrop-blur-md border border-lavender/50 px-4 py-2 rounded-2xl shadow-sm flex items-center gap-2">

          <Sparkles size={16} className="text-lavender-dark animate-pulse" />

          <span className="text-xs font-medium text-darkText">{getAISuggestion()}</span>

        </div>

      </div>



      {/* Dashboard Analytics Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

       

        {/* Card 1: Advanced Productivity Score Index */}

        <div className="bg-white border border-lavender/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">

          <div className="flex justify-between items-start mb-4">

            <span className="text-sm font-medium text-mutedGray">Productivity Score</span>

            <span className="p-2 bg-lavender-light rounded-xl text-lavender-dark"><TrendingUp size={18} /></span>

          </div>

          <h3 className="text-3xl font-bold text-darkText">{focusScore}%</h3>

          <p className="text-xs text-green-600 mt-2">↑ High priority tasks reward more points</p>

        </div>



        {/* Card 2: Remaining Goals */}

        <div className="bg-white border border-lavender/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">

          <div className="flex justify-between items-start mb-4">

            <span className="text-sm font-medium text-mutedGray">Remaining Goals</span>

            <span className="p-2 bg-lavender-light rounded-xl text-lavender-dark"><CheckCircle2 size={18} /></span>

          </div>

          <h3 className="text-3xl font-bold text-darkText">{remainingTasks} <span className="text-lg font-normal text-mutedGray">tasks left</span></h3>

          <p className="text-xs text-mutedGray mt-2">Total active workload: {totalTasks}</p>

        </div>



        {/* Card 3: Status */}

        <div className="bg-lavender/20 backdrop-blur-sm border border-lavender/40 rounded-2xl p-6 shadow-sm flex flex-col justify-between">

          <div>

            <h4 className="font-semibold text-darkText mb-1">Current Mood Status</h4>

            <p className="text-xs text-mutedGray">Based on your recent focus quality</p>

          </div>

          <div className="mt-4 flex items-center gap-2">

            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-darkText shadow-sm border border-lavender/30">

              ✨ Motivated

            </span>

          </div>

        </div>



      </div>



      {/* Ecosystem Engine Core */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

       

        {/* Live Task List */}

        <div className="lg:col-span-2 bg-white/50 backdrop-blur-md border border-lavender/40 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-lg font-bold text-darkText">Focus Goals Ecosystem</h3>

            <span className="text-xs px-3 py-1 bg-lavender/40 text-darkText font-medium rounded-full">

              {completedTasks}/{totalTasks} Completed

            </span>

          </div>



          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">

            {loading ? (

              <p className="text-center text-mutedGray text-sm py-10 animate-pulse">Connecting to MongoDB ecosystem...</p>

            ) : tasks.length === 0 ? (

              <p className="text-center text-mutedGray text-sm py-10">No goals listed for today. Relax or add some!</p>

            ) : (

              tasks.map(task => (

                <div

                  key={task._id}

                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 bg-white ${

                    task.status === 'Completed' ? 'border-lavender/30 opacity-70' : 'border-lavender/40 shadow-sm'

                  }`}

                >

                  <div className="flex items-center gap-4 flex-1">

                    <button

                      onClick={() => toggleTaskStatus(task._id, task.status)}

                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${

                        task.status === 'Completed'

                          ? 'bg-lavender-dark border-lavender-dark text-white'

                          : 'border-lavender hover:bg-lavender/20'

                      }`}

                    >

                      {task.status === 'Completed' && <Check size={14} />}

                    </button>

                    <span className={`text-sm font-medium text-darkText ${task.status === 'Completed' ? 'line-through text-mutedGray' : ''}`}>

                      {task.title}

                    </span>

                  </div>



                  <div className="flex items-center gap-3">

                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${

                      task.priority === 'High' ? 'bg-red-50 text-red-600' :

                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'

                    }`}>

                      {task.priority}

                    </span>

                    <button

                      onClick={() => deleteTask(task._id)}

                      className="text-mutedGray hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"

                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>



        {/* Task Form */}

        <div className="bg-white/80 border border-lavender/40 rounded-3xl p-6 shadow-sm flex flex-col justify-between">

          <form onSubmit={handleAddTask} className="space-y-4">

            <div>

              <h3 className="text-lg font-bold text-darkText mb-1">Create New Goal</h3>

              <p className="text-xs text-mutedGray mb-4">Break down your study plan into milestones.</p>

            </div>



            <div className="space-y-1">

              <label className="text-xs font-semibold text-darkText pl-1">Goal Description</label>

              <input

                type="text"

                value={newCardTitle}

                onChange={(e) => setNewCardTitle(e.target.value)}

                placeholder="e.g., Study Operating Systems chapter 4"

                className="w-full px-4 py-3 text-sm bg-background-warm border border-lavender/60 rounded-xl focus:outline-none focus:border-lavender-dark font-medium transition-colors"

              />

            </div>



            <div className="space-y-1">

              <label className="text-xs font-semibold text-darkText pl-1">Set Priority</label>

              <div className="grid grid-cols-3 gap-2">

                {['Low', 'Medium', 'High'].map((p) => (

                  <button

                    key={p}

                    type="button"

                    onClick={() => setPriority(p)}

                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${

                      priority === p

                        ? 'bg-lavender-dark text-white border-lavender-dark shadow-sm'

                        : 'bg-white text-mutedGray border-lavender/40 hover:bg-lavender/10'

                    }`}

                  >

                    {p}

                  </button>

                ))}

              </div>

            </div>



            <button

              type="submit"

              className="w-full bg-darkText text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-darkText/90 shadow-md transition-colors mt-2"

            >

              <Plus size={18} /> Add to Ecosystem

            </button>

          </form>



          <div className="mt-6 p-3 bg-lavender/10 rounded-xl border border-lavender/30 flex items-center gap-2 text-xs text-mutedGray">

            <Clock size={14} className="text-lavender-dark" />

            <span>Updates progress analytics instantly.</span>

          </div>

        </div>



      </div>

    </div>

  );

} 

