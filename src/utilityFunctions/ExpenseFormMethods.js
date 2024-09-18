import toast from "react-hot-toast";

// Function to generate alert message based on expense balances
function generateExpenseFormAlertMessage(
  monthlyBudgetBalance,
  categoricalBudgetBalance,
  expenseCategory
) {
  // Default alert message
  let alertMessage = "Do you want to add new Expense?";

  // Flag to indicate if toaster message should be an error
  let toasterErrorFlag = false;
  
  // Default toaster message
  let toasterMessage = "Expense added successfully";

  // Check if both monthly and categorical budget balances are negative
  if (monthlyBudgetBalance < 0 && categoricalBudgetBalance < 0) {
    alertMessage = `Hey your Monthly and ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense and ${expenseCategory} expense exceeded`;
  }

  // Check if only categorical budget balance is negative
  else if (categoricalBudgetBalance < 0) {
    alertMessage = `Hey your ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage =
      expenseCategory.charAt(0).toUpperCase() +
      expenseCategory.slice(1) +
      ` expense exceeded`;
  }

  // Check if only monthly budget balance is negative
  else if (monthlyBudgetBalance < 0) {
    alertMessage = `Hey your monthly expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense exceeded`;
  }

  // Return alert message details
  return { alertMessage, toasterErrorFlag, toasterMessage };
}

// Function to validate expense form fields
function validateExpenseForm(expenseName, expenseAmount, expenseCategory) {
  if (!expenseName.trim() || expenseAmount === "" || expenseCategory === "") {
    toast.error("All Fields are required!");
    return false;
  }

  // Check if expense amount is negative
  if (expenseAmount <= 0) {
    toast.error("Expense cannot be negative or zero");
    return false;
  }

  // Return true if all validations pass
  return true;
}

export { generateExpenseFormAlertMessage, validateExpenseForm };
