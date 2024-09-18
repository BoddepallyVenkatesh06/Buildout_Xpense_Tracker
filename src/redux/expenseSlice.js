import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing expense state
const expenseSlice = createSlice({
  // Slice name
  name: "expense",

  // Initial state for expenses
  initialState: {
    totalExpense: 0,
    categoricalExpense: {
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    },
  },

  reducers: {
    // Reducer function to update total expense
    updateTotalExpense: (state, action) => {
      const { amount, operation } = action.payload;

      // Update total expense based on operation
      if (operation === "add") {
        state.totalExpense = state.totalExpense + amount; // Add amount
      } else {
        state.totalExpense = state.totalExpense - amount; // Subtract amount
      }
    },

    // Reducer function to update categorical expense
    updateCategoricalExpense: (state, action) => {
      const { amount, category, operation } = action.payload;
      let currentCategoryAmount = state.categoricalExpense[category];

      // Update categorical expense based on operation
      if (operation === "add") {
        currentCategoryAmount += amount; // Add amount
      } else {
        currentCategoryAmount -= amount; // Subtract amount
      }

      // Update the categorical expense object with the new amount
      state.categoricalExpense = {
        ...state.categoricalExpense,
        [category]: currentCategoryAmount,
      };

      return state;
    },

    // Reducer function to reset all expenses
    resetAllExpense: (state) => {
      // Reset total expense and categorical expenses to zero
      state.totalExpense = 0;
      state.categoricalExpense = {
        food: 0,
        travel: 0,
        entertainment: 0,
        others: 0,
      };
      return state;
    },
  },
});

// Export action creators
export const { updateTotalExpense, updateCategoricalExpense, resetAllExpense } =
  expenseSlice.actions;

// Export the reducer function
export default expenseSlice.reducer;
