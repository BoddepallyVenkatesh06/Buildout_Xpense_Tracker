import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing transaction state
const transactionSlice = createSlice({
  // Slice name
  name: "transactions",

  // Initial state for transaction list
  initialState: {
    transactionList: [],
  },

  reducers: {
    // Reducer function to add a transaction entry
    addTransactionEntry: (state, action) => {
      const userObj = {
        ...action.payload,
      };
      state.transactionList.push(userObj);
    },

    // Reducer function to remove a transaction entry
    removeTransactionEntry: (state, action) => {
      // Filter out the transaction with the given id
      state.transactionList = state.transactionList.filter(
        (transaction) => transaction.id !== action.payload
      );

      return state;
    },

    // Reducer function to remove all transactions
    removeAllTransactions: (state) => {
      state.transactionList.length = 0; 
    },
  },
});

// Export action creators
export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

// Export the reducer function
export default transactionSlice.reducer;
