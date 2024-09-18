import expenseReducer, {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} from "../redux/expenseSlice";

describe("expense slice reducers", () => {
  const initialState = {
    totalExpense: 0,
    categoricalExpense: {
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    },
  };

  it("should handle updateTotalExpense", () => {
    const action = updateTotalExpense({ amount: 100, operation: "add" });
    const newState = expenseReducer(initialState, action);
    expect(newState.totalExpense).toEqual(100);
  });

  it("should handle updateCategoricalExpense", () => {
    const action = updateCategoricalExpense({
      amount: 50,
      category: "food",
      operation: "add",
    });
    const newState = expenseReducer(initialState, action);
    expect(newState.categoricalExpense.food).toEqual(50);
  });

  it("should handle resetAllExpense", () => {
    const action = resetAllExpense();
    const newState = expenseReducer(initialState, action);
    expect(newState.totalExpense).toEqual(0);
    expect(newState.categoricalExpense).toEqual({
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    });
  });
});
