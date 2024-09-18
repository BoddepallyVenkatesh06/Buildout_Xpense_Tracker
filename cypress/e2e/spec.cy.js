import store from "../../src/redux/Store";

describe("LandingPageForm Initial State Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display initial state correctly", () => {
    cy.window()
      .then((win) => {
        console.log(store); // Log the store to the console for debugging
        expect(store).to.exist; // Ensure the store exists
        return store.getState();
      })
      .then((state) => {
        expect(state.user.userName).to.equal("");
        expect(state.user.monthlyBudget).to.equal("");
        expect(state.user.categoricalBudget.food).to.equal("");
        expect(state.user.categoricalBudget.travel).to.equal("");
        expect(state.user.categoricalBudget.entertainment).to.equal("");
      });
  });

  it("should update the state and navigate on form submission", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { food: 300, travel: 200, entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.food);
    cy.get("input#travel").type(newCategoricalBudget.travel);
    cy.get("input#entertainment").type(newCategoricalBudget.entertainment);

    cy.get("form").submit();

    cy.window()
      .then((win) => {
        console.log(win.store);
        return win.store.getState();
      })
      .then((state) => {
        expect(state.user.userName).to.equal(newUserName);
        expect(state.user.monthlyBudget).to.equal(newMonthlyBudget);
        expect(state.user.categoricalBudget.food).to.equal(
          newCategoricalBudget.food
        );
        expect(state.user.categoricalBudget.travel).to.equal(
          newCategoricalBudget.travel
        );
        expect(state.user.categoricalBudget.entertainment).to.equal(
          newCategoricalBudget.entertainment
        );
        expect(state.user.categoricalBudget.others).to.equal(
          newMonthlyBudget -
            (newCategoricalBudget.food +
              newCategoricalBudget.travel +
              newCategoricalBudget.entertainment)
        );
      });

    cy.url().should("include", "/tracker");
  });

  it("should reset transactions and form data", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { food: 300, travel: 200, entertainment: 100 };

    // Fill in the form
    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);
    cy.get("input#food").type(newCategoricalBudget.food);
    cy.get("input#travel").type(newCategoricalBudget.travel);
    cy.get("input#entertainment").type(newCategoricalBudget.entertainment);
    cy.get("form").submit();

    // Trigger reset
    cy.get("#new-update").click();
    cy.get("#clear").click();

    cy.on("window:confirm", () => true);

    cy.window()
      .its("store")
      .invoke("getState")
      .should((state) => {
        expect(state.user.userName).to.equal("");
        expect(state.user.monthlyBudget).to.equal("");
        expect(state.user.categoricalBudget.food).to.equal("");
        expect(state.user.categoricalBudget.travel).to.equal("");
        expect(state.user.categoricalBudget.entertainment).to.equal("");
      });

    cy.get("input#name").should("have.value", "");
    cy.get("input#budget").should("have.value", "");
    cy.get("input#food").should("have.value", "");
    cy.get("input#travel").should("have.value", "");
    cy.get("input#entertainment").should("have.value", "");
  });
});

describe("ExpenseForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/"); // Adjust the path to where your component is rendered
  });

  it("should render the form", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { food: 300, travel: 200, entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.food);
    cy.get("input#travel").type(newCategoricalBudget.travel);
    cy.get("input#entertainment").type(newCategoricalBudget.entertainment);

    cy.get("form").submit();

    cy.window()
      .then((win) => {
        console.log(win.store);
        return win.store.getState();
      })
      .then((state) => {
        expect(state.user.userName).to.equal(newUserName);
        expect(state.user.monthlyBudget).to.equal(newMonthlyBudget);
        expect(state.user.categoricalBudget.food).to.equal(
          newCategoricalBudget.food
        );
        expect(state.user.categoricalBudget.travel).to.equal(
          newCategoricalBudget.travel
        );
        expect(state.user.categoricalBudget.entertainment).to.equal(
          newCategoricalBudget.entertainment
        );
        expect(state.user.categoricalBudget.others).to.equal(
          newMonthlyBudget -
            (newCategoricalBudget.food +
              newCategoricalBudget.travel +
              newCategoricalBudget.entertainment)
        );
      });

    cy.url().should("include", "/tracker");

    cy.get(".expense-form1").should("exist");
    cy.get("div.title").contains("New Expense Form");
    cy.get("label[for='expense-name']").contains("Expense Name:");
    cy.get("label[for='category-select']").contains("Select category:");
    cy.get("label[for='expense-amount']").contains("Expense Amount:");
    cy.get("button[type='submit']").contains("Submit");
  });

  it("should handle form submission and update state", () => {
    const newUserName = "Test User";
    const newMonthlyBudget = 1000;
    const newCategoricalBudget = { food: 300, travel: 200, entertainment: 100 };

    cy.get("input#name").type(newUserName);
    cy.get("input#budget").type(newMonthlyBudget);

    cy.get("input#food").type(newCategoricalBudget.food);
    cy.get("input#travel").type(newCategoricalBudget.travel);
    cy.get("input#entertainment").type(newCategoricalBudget.entertainment);

    cy.get("form").submit();

    cy.window()
      .then((win) => {
        console.log(win.store);
        return win.store.getState();
      })
      .then((state) => {
        expect(state.user.userName).to.equal(newUserName);
        expect(state.user.monthlyBudget).to.equal(newMonthlyBudget);
        expect(state.user.categoricalBudget.food).to.equal(
          newCategoricalBudget.food
        );
        expect(state.user.categoricalBudget.travel).to.equal(
          newCategoricalBudget.travel
        );
        expect(state.user.categoricalBudget.entertainment).to.equal(
          newCategoricalBudget.entertainment
        );
        expect(state.user.categoricalBudget.others).to.equal(
          newMonthlyBudget -
            (newCategoricalBudget.food +
              newCategoricalBudget.travel +
              newCategoricalBudget.entertainment)
        );
      });

    cy.url().should("include", "/tracker");

    const newExpenseName = "Groceries";
    const newExpenseAmount = 100;
    const newExpenseCategory = "food";

    cy.get("input#expense-name").type(newExpenseName);
    cy.get("select#category-select").select(newExpenseCategory);
    cy.get("input#expense-amount").type(newExpenseAmount);

    cy.get("form").submit();

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        console.log(state);
        expect(state.expense.totalExpense).to.equal(newExpenseAmount);
        expect(state.expense.categoricalExpense.food).to.equal(
          newExpenseAmount
        );

        expect(state.transactions.transactionList.length).to.equal(1);
        expect(state.transactions.transactionList[0]).to.deep.include({
          name: newExpenseName,
          amount: newExpenseAmount,
          category: newExpenseCategory,
        });
      });

    cy.get("input#expense-name").should("have.value", "");
    cy.get("select#category-select").should("have.value", "");
    cy.get("input#expense-amount").should("have.value", "");
  });
});
