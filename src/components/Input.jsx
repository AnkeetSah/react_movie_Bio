import React from "react";
import Styles from "./Input.module.css";

export default function Input({
  inputValue,
  handleInputChange,
  handleKeyDown,
}) {
  const containerStyle = {
    backgroundColor: "rgb(15, 15, 14)",
  };

  return (
    <>
      <div className={`${Styles.container} `} style={containerStyle}>
        <form action="#">
          <label htmlFor="">Search Movie:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for movies..."
          />
        </form>
      </div>
    </>
  );
}
