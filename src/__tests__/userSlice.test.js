import userReducer, {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  updateActiveFilter,
  resetAllBudget,
} from "../redux/userSlice";

describe("user slice reducers", () => {
  const initialState = {
    userName: "",
    monthlyBudget: "",
    categoricalBudget: {
      food: "",
      travel: "",
      entertainment: "",
      others: "",
    },
    activeFilter: "all",
  };

  it("should handle updateUserName", () => {
    const action = updateUserName("John Doe");
    const newState = userReducer(initialState, action);
    expect(newState.userName).toEqual("John Doe");
  });

  it("should handle updateMonthlyBudget", () => {
    const action = updateMonthlyBudget(2000);
    const newState = userReducer(initialState, action);
    expect(newState.monthlyBudget).toEqual(2000);
  });

  it("should handle updateCategoricalBudget", () => {
    const action = updateCategoricalBudget({ food: 500, travel: 300 });
    const newState = userReducer(initialState, action);
    expect(newState.categoricalBudget.food).toEqual(500);
    expect(newState.categoricalBudget.travel).toEqual(300);
  });

  it("should handle updateActiveFilter", () => {
    const action = updateActiveFilter("food");
    const newState = userReducer(initialState, action);
    expect(newState.activeFilter).toEqual("food");
  });

  it("should handle resetAllBudget", () => {
    const action = resetAllBudget();
    const newState = userReducer(initialState, action);
    expect(newState.userName).toEqual("");
    expect(newState.monthlyBudget).toEqual("");
    expect(newState.categoricalBudget).toEqual({
      food: "",
      travel: "",
      entertainment: ""
    });
    expect(newState.activeFilter).toEqual("all");
  });
});
