import React from "react";
import "./cell.styles.css";

const Cell = ({ row, col, onClick, isOn }) => {
  const classes = isOn ? "cell lit" : "cell";
  return <div className={classes} onClick={() => onClick(row, col)} />;
};

export default Cell;
