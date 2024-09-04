import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import { fetchWeather } from '../services/weatherService';
import './TaskList.css';
import { FaTrashAlt } from 'react-icons/fa';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    alert('Task deleted successfully');
  };

  const handleComplete = (task) => {
    dispatch(updateTask({ id: task.id, updates: { isCompleted: true } }));
    alert('Task marked as completed');
  };
  

  const getWeatherData = async (location) => {
    setLoading(true);
    try {
      const data = await fetchWeather(location);
      setWeatherData((prevData) => ({ ...prevData, [location]: data }));
      setError('');
    } catch (error) {
      setError('Failed to fetch weather data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.isOutdoor && task.location) {
        getWeatherData(task.location);
      }
    });
  }, [tasks]);

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="table-container">
      <h2>Todo Tasks</h2>
      {incompleteTasks.length > 0 ? (
        <table className="table table-striped to-do">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Outdoor</th>
              <th>Location</th>
              <th>Weather</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incompleteTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.isOutdoor ? 'Yes' : 'No'}</td>
                <td>{task.isOutdoor && task.location}</td>
                <td>
                  {task.isOutdoor && task.location && weatherData[task.location] ? (
                    <div>
                      <p>Temperature: {weatherData[task.location].main.temp}°C</p>
                      <p>Weather: {weatherData[task.location].weather[0].description}</p>
                    </div>
                  ) : loading ? (
                    <p>Loading weather...</p>
                  ) : (
                    error && <p className="text-danger">{error}</p>
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.isCompleted || false}
                    onChange={() => handleComplete(task)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="btn btn-danger"
                  >
                    <FaTrashAlt /> {/* Delete icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available</p>
      )}

      <h2>Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        <table className="table table-striped completed">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Outdoor</th>
              <th>Location</th>
              <th>Weather</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.isOutdoor ? 'Yes' : 'No'}</td>
                <td>{task.isOutdoor && task.location}</td>
                <td>
                  {task.isOutdoor && task.location && weatherData[task.location] ? (
                    <div>
                      <p>Temperature: {weatherData[task.location].main.temp}°C</p>
                      <p>Weather: {weatherData[task.location].weather[0].description}</p>
                    </div>
                  ) : loading ? (
                    <p>Loading weather...</p>
                  ) : (
                    error && <p className="text-danger">{error}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
