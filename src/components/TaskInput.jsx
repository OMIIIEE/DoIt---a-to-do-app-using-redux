
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import './TaskInput.css';

const TaskInput = () => {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    isOutdoor: false,
    location: '',
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title) {
      dispatch(addTask(task));
      setTask({
        title: '',
        description: '',
        isOutdoor: false,
        location: '',
      });
      setShowForm(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="showform"
      >
        {showForm ? 'Cancel' : 'Add New Task'}
      </button>
      <div className={`modal-overlay ${showForm ? 'open' : ''}`}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button
            onClick={() => setShowForm(false)}
            className=""
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="form-control"
              required
            />
            <textarea
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="form-control"
            />
           
              <input
                type="checkbox"
                name="isOutdoor"
                checked={task.isOutdoor}
                onChange={handleInputChange}
                className="form-check-input"
              />
               <label>
              Outdoor Activity
            </label>
            {task.isOutdoor && (
              <input
                type="text"
                name="location"
                value={task.location}
                onChange={handleInputChange}
                placeholder="Location for weather"
                className="form-control"
              />
            )}
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;

