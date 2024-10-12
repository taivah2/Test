import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, active: true }]);
      setNewTask('');
    }
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, active: !task.active } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteAllCompletedTasks = () => {
    setTasks(tasks.filter((task) => task.active));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return task.active;
    if (filter === 'Completed') return !task.active;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>#todo</h1>

      <div className="tabs">
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setFilter('Active')} className={filter === 'Active' ? 'active' : ''}>
          Active
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={filter === 'Completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="add details"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.active ? '' : 'completed'}>
            <input
              type="checkbox"
              checked={!task.active}
              onChange={() => toggleTaskStatus(index)}
            />
            {task.text}
            {!task.active && (
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                🗑️
              </button>
            )}
          </li>
        ))}
      </ul>

      {filter === 'Completed' && (
        <button className="delete-all-btn" onClick={deleteAllCompletedTasks}>
          Delete all
        </button>
      )}
    </div>
  );
}

export default TodoApp;
