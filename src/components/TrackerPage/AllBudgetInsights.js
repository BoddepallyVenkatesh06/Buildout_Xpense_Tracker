import React from "react";
import { useSelector } from "react-redux";
import "./AllBudgetInsights.css";

// Component to display limit status button
const LimitStatusPill = ({ balance }) => {
  // Determine if the limit is exceeded based on balance
  let isLimitExceeded = balance < 0;
  // Determine the text for the limit status
  let LimitStatusText = balance < 0 ? "exceed" : "within";

  // Render the button with appropriate class and text
  return (
    <div className={isLimitExceeded ? "limit-exceed-btn" : "limit-within-btn"}>
      {LimitStatusText}
    </div>
  );
};

// AllBudgetInsights component to display budget insights
const AllBudgetInsights = () => {
  // Accessing monthlyBudget and categoricalBudget from Redux store
  const { monthlyBudget, categoricalBudget } = useSelector(
    (store) => store.user
  );

  // Accessing totalExpense and categoricalExpense from Redux store
  const { totalExpense, categoricalExpense } = useSelector(
    (store) => store.expense
  );

  // Calculate total monthly balance
  const totalMonthlyBalance = monthlyBudget - totalExpense;
  // Calculate categorical balance for each category
  const categoricalBalance = {
    food: categoricalBudget.food - categoricalExpense.food,
    travel: categoricalBudget.travel - categoricalExpense.travel,
    entertainment:
      categoricalBudget.entertainment - categoricalExpense.entertainment,
    others: categoricalBudget.others - categoricalExpense.others,
  };

  // Render the budget insights table
  return (
    <div className="insights">
      <table className="insight-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Limit Status</th>
            <th>Budget</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* Row for total */}
          <tr>
            <td>All</td>
            <td>
              {/* Render limit status button */}
              <LimitStatusPill balance={totalMonthlyBalance} />
            </td>
            <td>{monthlyBudget}</td>
            <td>{totalExpense}</td>
            <td>{totalMonthlyBalance}</td>
          </tr>
          {/* Row for food category */}
          <tr>
            <td>Food</td>
            <td>
              {/* Render limit status button */}
              <LimitStatusPill balance={categoricalBalance.food} />
            </td>
            <td>{categoricalBudget.food}</td>
            <td>{categoricalExpense.food}</td>
            <td>{categoricalBalance.food}</td>
          </tr>
          {/* Row for travel category */}
          <tr>
            <td>Travel</td>
            <td>
              {/* Render limit status button */}
              <LimitStatusPill balance={categoricalBalance.travel} />
            </td>
            <td>{categoricalBudget.travel}</td>
            <td>{categoricalExpense.travel}</td>
            <td>{categoricalBalance.travel}</td>
          </tr>
          {/* Row for entertainment category */}
          <tr>
            <td>Entertainment</td>
            <td>
              {/* Render limit status button */}
              <LimitStatusPill balance={categoricalBalance.entertainment} />
            </td>
            <td>{categoricalBudget.entertainment}</td>
            <td>{categoricalExpense.entertainment}</td>
            <td>{categoricalBalance.entertainment}</td>
          </tr>
          {/* Row for others category */}
          <tr>
            <td>Others</td>
            <td>
              {/* Render limit status button */}
              <LimitStatusPill balance={categoricalBalance.others} />
            </td>
            <td>{categoricalBudget.others}</td>
            <td>{categoricalExpense.others}</td>
            <td>{categoricalBalance.others}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllBudgetInsights;
