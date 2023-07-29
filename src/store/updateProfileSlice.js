import { createSlice } from "@reduxjs/toolkit";

const initialProfile  = {
    status : !!localStorage.getItem('updatedProfile')
}

const profileUpdateSlice = createSlice({
    name: 'profileUpdate',
    initialState: initialProfile,
    reducers:{
        profileUpdateStatus(state){
            state.status = true;
        }
    }
});

export const updateProfileAction = profileUpdateSlice.actions;

export default profileUpdateSlice.reducer;