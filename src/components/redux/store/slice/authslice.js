// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     loginStatus: 'idle', 
//   },
//   reducers: {
//     login(state, action) {
//       const { username, password } = action.payload;
//       if (username === 'admin' && password === '1234') {
//         state.isAuthenticated = true;
//         state.loginStatus = 'success';
//       } else {
//         state.isAuthenticated = false;
//         state.loginStatus = 'failed';
//       }
//     },
//     resetLoginStatus(state) {
//       state.loginStatus = 'idle';
//     },
//   },
// });

// export const { login, resetLoginStatus } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
reducers: {
  login(state, action) {
    const { username, password } = action.payload;
    if (username === 'admin' && password === '1234') {
      state.isAuthenticated = true;
      state.loginStatus = 'success';
    } else {
      state.isAuthenticated = false;
      state.loginStatus = 'failed';
    }
  },
  resetLoginStatus(state) {
    state.loginStatus = 'idle';
  },
},

});

export const { login, resetLoginStatus} = authSlice.actions;
export default authSlice.reducer;

