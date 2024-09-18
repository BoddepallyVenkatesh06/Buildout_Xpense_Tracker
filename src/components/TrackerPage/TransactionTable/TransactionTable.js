import React from "react";
import TransactionDetailsTable from "./TransactionDetailsTable";
import TransactionFilters from "./TransactionFilters";
import "./TransactionTable.css";

const TransactionTable = () => {
  // Render the transaction table component
  return (
    <div className="transactions">
      {/* Transaction filters component */}
      <TransactionFilters />
      <hr />
      {/* Transaction details table component */}
      <TransactionDetailsTable />
    </div>
  );
};

export default TransactionTable;
