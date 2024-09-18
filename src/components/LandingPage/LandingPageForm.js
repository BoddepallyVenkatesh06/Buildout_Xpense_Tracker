import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAllExpense } from "../../redux/expenseSlice";
import { removeAllTransactions } from "../../redux/transactionSlice";
import {
  resetAllBudget,
  updateCategoricalBudget,
  updateMonthlyBudget,
  updateUserName,
} from "../../redux/userSlice";
import validateLandingPageForm from "../../utilityFunctions/LandingPageFormMethods";
import BudgetTable from "./BudgetTable";
import "./LandingPageForm.css";

const LandingPageForm = () => {
  // Retrieve user data from Redux store
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize local state variables
  const [userName, setUserName] = useState(user.userName);
  const [monthlyBudget, setMonthlyBudget] = useState(user.monthlyBudget);
  const [categoricalBudget, setCategoricalBudget] = useState({
    food: user.categoricalBudget.food,
    travel: user.categoricalBudget.travel,
    entertainment: user.categoricalBudget.entertainment,
  });

  // Handle form submission
  const formSubmitHandler = (event) => {
    event.preventDefault();

    // Validate form data
    if (validateLandingPageForm(userName, monthlyBudget, categoricalBudget)) {
      //calculating others budget explicitly and forming a new categorical budget
      const othersBudget =
        monthlyBudget -
        (categoricalBudget.food +
          categoricalBudget.travel +
          categoricalBudget.entertainment);

      const newCategoricalBudget = {
        ...categoricalBudget,
        others: othersBudget,
      };

      // Dispatch actions to update user slice
      dispatch(updateUserName(userName));
      dispatch(updateMonthlyBudget(monthlyBudget));
      dispatch(updateCategoricalBudget(newCategoricalBudget));

      // Show success message and navigate to tracker page
      let message = user.userName ? "Updated " : "Submitted ";
      message += "your budget details";

      // alert(message);
      toast.success(message);
      navigate("/tracker");
    }
  };

  // Handle deletion of transactions and resetting form data
  const resetTransactions = () => {
    const confirmDelete = window.confirm(
      "This will delete all previous transactions"
    );
    if (confirmDelete === true) {
      // Reset user details
      dispatch(resetAllBudget());

      // Reset all transaction entries
      dispatch(removeAllTransactions());

      // Reset all expenses
      dispatch(resetAllExpense());

      // Reset local state variables
      setUserName("");
      setMonthlyBudget("");
      setCategoricalBudget({
        food: "",
        travel: "",
        entertainment: "",
      });

      //displaying toast
      toast.success("Deleted all previous transactions");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-form">
        <div className="heading1">Welcome to your own Expense Tracker</div>
        <div className="heading2">
          Please fill in the below form to start tracking
        </div>
        <form
          name="landing-page-form"
          className="form-container"
          onSubmit={formSubmitHandler}
        >
          <div>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="budget">Enter your monthly budget: </label>
            <input
              id="budget"
              type="number"
              value={monthlyBudget}
              onChange={(e) =>
                e.target.value === ""
                  ? setMonthlyBudget("")
                  : setMonthlyBudget(parseInt(e.target.value))
              }
            />
          </div>
          <div>
            <div>Fill your monthly categorical budget: </div>
            <BudgetTable
              categoricalBudget={categoricalBudget}
              setCategoricalBudget={setCategoricalBudget}
            />
          </div>
          <div className="form-btn">
            <button type="submit" className="submit-btn">
              {user.userName ? "Update budget" : "Submit"}
            </button>
            {user.userName && (
              <>
                <button
                  type="button"
                  id="clear"
                  className="clear-btn"
                  onClick={resetTransactions}
                >
                  Start new tracker
                </button>

                <Link to={"/tracker"}>
                  <button className="navigate-tracker-btn">Go Back →</button>
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPageForm;
