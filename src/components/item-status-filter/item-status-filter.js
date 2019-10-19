import React from "react";
import "./item-status-filter.css";

const ItemStatusFilter = props => {
  const buttonsArr = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];
  const { filter, onFilterChange } = props;
  const buttons = buttonsArr.map(({ name, label }) => {
    const isActive = filter === name;
    const classes = isActive ? "btn-primary active" : "btn-outline-primary";
    return (
      <button
        type="button"
        key={name}
        className={`btn ${classes}`}
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    );
  });
  return <div className="btn-group">{buttons}</div>;
};

export default ItemStatusFilter;
