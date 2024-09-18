import React from "react";
import "./LandingPageForm";

// BudgetTable component takes in categoricalBudget state and setCategoricalBudget function as props
const BudgetTable = ({ categoricalBudget, setCategoricalBudget }) => {
  // Function to update the categoricalBudget state based on the input text and category name
  function updateCategoricalBudget(text, categoryName) {
    // If input text is empty, set the category value to an empty string
    if (text === "") {
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: "",
      }));
    } else {
      // If input text is not empty, parse it to an integer and update the category value
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: parseInt(text),
      }));
    }
  }

  // Render the table with inputs for each budget category
  return (
    <table id="budgetTable">
      <thead>
        <tr>
          <th>Food</th>
          <th>Travel</th>
          <th>Entertainment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {/* Input for Food category with value from categoricalBudget.food and onChange event */}
            <input
              id="food"
              type="number"
              value={categoricalBudget.food}
              onChange={(e) => updateCategoricalBudget(e.target.value, "food")}
            />
          </td>
          <td>
            {/* Input for Travel category with value from categoricalBudget.travel and onChange event */}
            <input
              id="travel"
              type="number"
              value={categoricalBudget.travel}
              onChange={(e) =>
                updateCategoricalBudget(e.target.value, "travel")
              }
            />
          </td>
          <td>
            {/* Input for Entertainment category with value from categoricalBudget.entertainment and onChange event */}
            <input
              id="entertainment"
              type="number"
              value={categoricalBudget.entertainment}
              onChange={(e) =>
                updateCategoricalBudget(e.target.value, "entertainment")
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BudgetTable;
