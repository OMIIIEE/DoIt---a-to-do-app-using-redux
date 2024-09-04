import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        isOutdoor: action.payload.isOutdoor,
        location: action.payload.location,
        isCompleted: false, 
      };
      state.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const updatedTasks = state.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex(task => task.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
    
    toggleTaskCompletion: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state[index].isCompleted = !state[index].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(state));
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
