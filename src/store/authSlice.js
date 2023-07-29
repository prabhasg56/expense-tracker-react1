import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthentication: !!localStorage.getItem('token'),
    idToken: null,
    userId: localStorage.getItem('loginEmail')
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
        state.idToken = action.payload.idToken;
        state.userId = action.payload.userId
        state.isAuthentication = !!state.idToken;
    },
    logout(state) {
        localStorage.clear('token');
        state.isAuthentication = false
    },
  },
});


export const authAction = authSlice.actions;

export default authSlice.reducer;