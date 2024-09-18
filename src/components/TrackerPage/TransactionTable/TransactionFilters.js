import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveFilter } from "../../../redux/userSlice";

const TransactionFilters = () => {
  // Accessing activeFilter from Redux store
  const { activeFilter } = useSelector((store) => store.user);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Render transaction filters
  return (
    <div className="transaction-filter">
      <h3>Filters: </h3>
      <div
        className="filter-pills"
        id="filter"
        onClick={(event) => {
          // Update active filter only if the clicked element is not the parent container
          if (event.target.id !== "filter")
            dispatch(updateActiveFilter(event.target.id));
        }}
      >
        {/* Filter options */}
        <div
          id="all"
          className={
            "single-pill " +
            (activeFilter === "all" ? "single-pill-active" : "")
          }
        >
          All
        </div>
        <div
          id="food"
          className={
            "single-pill " +
            (activeFilter === "food" ? "single-pill-active" : "")
          }
        >
          Food
        </div>
        <div
          id="travel"
          className={
            "single-pill " +
            (activeFilter === "travel" ? "single-pill-active" : "")
          }
        >
          Travel
        </div>
        <div
          id="entertainment"
          className={
            "single-pill " +
            (activeFilter === "entertainment" ? "single-pill-active" : "")
          }
        >
          Entertainment
        </div>
        <div
          id="others"
          className={
            "single-pill " +
            (activeFilter === "others" ? "single-pill-active" : "")
          }
        >
          Others
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
