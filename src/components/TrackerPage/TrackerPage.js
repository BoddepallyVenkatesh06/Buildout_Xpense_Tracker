import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllBudgetInsights from "./AllBudgetInsights";
import ExpenseForm from "./ExpenseForm";
import "./TrackerPage.css";
import TransactionTable from "./TransactionTable/TransactionTable";

// TrackerPage component
const TrackerPage = () => {
  // Accessing userName from Redux store
  const { userName } = useSelector((store) => store.user);

  const navigate = useNavigate();

  //navigating to home page if the tracker page is refreshed
  window.onload = () => {
    navigate("/");
  };

  // Render the TrackerPage
  return (
    <div className="tracker-page">
      <div className="tracker-page-title">
        <h2 className="text-capatilize">{userName}'s monthly expenditure</h2>
        <Link to={"/"}>
          <button id="new-update">New/Update tracker</button>
        </Link>
      </div>
      <hr />
      <AllBudgetInsights />
      <hr />
      <ExpenseForm />
      <hr />
      <TransactionTable />
      <hr />
    </div>
  );
};

export default TrackerPage;
