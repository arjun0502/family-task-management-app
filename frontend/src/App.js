import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', status: 'Pending' });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchSuggestedTasks();
  }, []);

  const fetchTasks = async () => {
    const familyId = 1; // Hardcoded family ID
    const response = await axios.get(`${API_URL}/tasks/${familyId}`);
    setTasks(response.data);
  };

  const fetchSuggestedTasks = async () => {
    const response = await axios.get(`${API_URL}/suggested-tasks`);
    setSuggestedTasks(response.data);
  };

  const addTask = async () => {
    const familyId = 1;
    await axios.post(`${API_URL}/tasks`, { ...newTask, family_id: familyId });
    fetchTasks();
    setNewTask({ name: '', description: '', status: 'Pending' });
  };

  const addSuggestedTask = async (task) => {
    const familyId = 1;
    try {
      await axios.post(`${API_URL}/tasks`, {
        family_id: familyId,
        name: task.name,
        description: task.description,
        status: 'Pending',
      });
      fetchTasks();
    } catch (error) {
      console.error("Error adding suggested task:", error.response || error.message);
    }
  };

  const updateTaskStatus = async (id, status) => {
    await axios.put(`${API_URL}/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-title">Manage Your Family's Tasks</h1>
        {selectedTask ? (
          <div className="task-details">
            <h2>Task Details</h2>
            <p><strong>Name:</strong> {selectedTask.name}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <button onClick={() => setSelectedTask(null)}>Back to Task List</button>
          </div>
        ) : (
          <>
            {/* Add New Task Section */}
            <div className="section-container">
              <h2>Add New Task</h2>
              <div className="task-inputs">
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  placeholder="Task Name"
                />
                <input
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task Description"
                />
                <button onClick={addTask}>Add Task</button>
              </div>
            </div>

            {/* Task List Section */}
            <div className="section-container">
              <h2>Task List</h2>
              <ul>
                {tasks.map(task => (
                  <li key={task.id} className="task-item">
                    <div className="task-info">
                      <strong onClick={() => setSelectedTask(task)} style={{ cursor: 'pointer' }}>
                        {task.name}
                      </strong>
                    </div>
                    <div className="task-status">
                      <span className={`status-badge ${task.status.toLowerCase()}`}>{task.status}</span>
                    </div>
                    <div className="task-button">
                      <button onClick={() => updateTaskStatus(task.id, 'Completed')}>
                        Mark Completed
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Tasks Section */}
            <div className="section-container">
              <h2>Suggested Tasks</h2>
              <ul>
                {suggestedTasks.map(task => (
                  <li key={task.id} className="suggested-task-item">
                    <div className="task-info">
                      <span><strong>{task.name}</strong></span>
                    </div>
                    <div className="task-cost">
                      <span>${task.estimated_cost.toLocaleString()}</span>
                    </div>
                    <div className="task-button">
                      <button onClick={() => addSuggestedTask(task)}>Add to My Tasks</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

