import transactionReducer, {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} from "../redux/transactionSlice";

describe("transaction slice reducers", () => {
  const initialState = {
    transactionList: [],
  };

  it("should handle addTransactionEntry", () => {
    const action = addTransactionEntry({
      id: "1",
      name: "Groceries",
      amount: 50,
      category: "food",
    });
    const newState = transactionReducer(initialState, action);
    expect(newState.transactionList).toHaveLength(1);
    expect(newState.transactionList[0].name).toEqual("Groceries");
  });

  it("should handle removeTransactionEntry", () => {
    const prevState = {
      transactionList: [
        { id: "1", name: "Groceries", amount: 50, category: "food" },
        { id: "2", name: "Fuel", amount: 30, category: "travel" },
      ],
    };
    const action = removeTransactionEntry("1");
    const newState = transactionReducer(prevState, action);
    expect(newState.transactionList).toHaveLength(1);
    expect(newState.transactionList[0].name).toEqual("Fuel");
  });

  it("should handle removeAllTransactions", () => {
    const prevState = {
      transactionList: [
        { id: "1", name: "Groceries", amount: 50, category: "food" },
        { id: "2", name: "Fuel", amount: 30, category: "travel" },
      ],
    };
    const action = removeAllTransactions();
    const newState = transactionReducer(prevState, action);
    expect(newState.transactionList).toHaveLength(0);
  });
});
