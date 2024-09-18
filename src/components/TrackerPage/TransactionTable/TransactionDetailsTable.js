import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoricalExpense,
  updateTotalExpense,
} from "../../../redux/expenseSlice";
import { removeTransactionEntry } from "../../../redux/transactionSlice";
import "./TransactionDetailsTable.css";
import { SUBTRACT } from "../../../utilityFunctions/constants";

const TransactionDetailsTable = () => {
  // Accessing transactionList and activeFilter from Redux store
  const { transactionList } = useSelector((store) => store.transactions);
  const { activeFilter } = useSelector((store) => store.user);

  // State to hold the filtered list of transactions
  const [filteredList, setFilteredList] = useState(transactionList);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Effect to update filtered list based on activeFilter
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredList(transactionList);
    } else {
      setFilteredList(
        transactionList.filter((list) => list.category === activeFilter)
      );
    }
  }, [transactionList, activeFilter]);

  // Function to delete a transaction entry
  const deleteTransactionEntry = (event, name, amount, category) => {
    const confirmDeleteEntry = window.confirm(
      "Are you sure you want to delete the entry?"
    );

    if (confirmDeleteEntry) {
      // Deleting transaction from Redux list
      dispatch(removeTransactionEntry(event.target.id));

      // Updating total and categorical expense
      dispatch(updateTotalExpense({ amount: amount, operation: SUBTRACT }));
      dispatch(
        updateCategoricalExpense({
          amount: amount,
          category: category,
          operation: SUBTRACT,
        })
      );

      // Displaying toast notification
      toast.success(`Deleted ${name} expense successfully`);
    }
  };

  // Render the transaction details table
  return (
    <div className="transaction-details-table">
      <table className="transaction-page-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length ? (
            filteredList.map(({ id, name, amount, category }, index) => (
              <tr key={id}>
                <td>{index + 1}. </td>
                <td className="text-capatilize">{name} </td>
                <td className="text-capatilize">{category}</td>
                <td>Rs {amount}</td>
                <td>
                  <button
                    id={id}
                    onClick={(event) =>
                      deleteTransactionEntry(event, name, amount, category)
                    }
                    className="transaction-delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Transactions Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetailsTable;
