import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar'; 
import './Home.css'; 

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    navigate('/login');
  }

  return (
    <div className="home-container">
      <Navbar /> 
      <div className="content">
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
