import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import expenseSlice from './expenseSlice';
import updateProfileSlice from './updateProfileSlice';


const store = configureStore({
    reducer:{auth: authSlice, expenses: expenseSlice, profileUpdateStatus: updateProfileSlice}
})

export default store;