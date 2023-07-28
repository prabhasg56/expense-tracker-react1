import { createSlice } from "@reduxjs/toolkit";

const initialExpenses = {
    expenses: [],
}

const expensesSlice = createSlice({
    name: 'expense',
    initialState: initialExpenses,
    reducers: {
        expenses(state, action) {
            state.expenses = [...action.payload.expense];
        }
    }
});

export const expenseAction = expensesSlice.actions;
export default expensesSlice.reducer;