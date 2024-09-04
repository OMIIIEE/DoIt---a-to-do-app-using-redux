import { loginSuccess, loginFailure } from './authSlice';


const mockLoginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        resolve({ username: 'user', name: 'John Doe' });
      } else {
        reject('Invalid credentials');
      }
    }, 1000);
  });
};

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await mockLoginApi(username, password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};


