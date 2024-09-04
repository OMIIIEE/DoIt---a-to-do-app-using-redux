import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import authReducer from './features/auth/authSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});
