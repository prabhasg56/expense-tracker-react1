import { createSlice } from "@reduxjs/toolkit";

const initialExpenses = {
    expenses: [],
    totalExpensesAmount: 0,
    isPremium: false
}

const expensesSlice = createSlice({
    name: 'expense',
    initialState: initialExpenses,
    reducers: {
        expenses(state, action) {
            state.expenses = [...action.payload.expense];
            state.totalExpensesAmount = action.payload.totalExpensesAmount;
        },
        activatePremium(state, action){
            state.isPremium = action.payload.dark;
        }
    }
});

export const expenseAction = expensesSlice.actions;
export default expensesSlice.reducer;