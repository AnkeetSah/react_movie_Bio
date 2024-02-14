import React from "react";
import Styles from './Suggestions.module.css';

const Suggestions = ({ handleSuggestionClick, suggestions }) => (
  <div style={{ backgroundColor: "black" }}>
    <ul className={`${Styles.suggestions} list-group`}>
      {suggestions.map((suggestion, index) => (
        <li
          style={{ backgroundColor: "rgb(15, 15, 14)" }}
          className={` list-group-item`}
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <label
            className={`${Styles.suggestItem} form-check-label`}
            htmlFor={`checkbox_${index}`}
          >
            {suggestion}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default Suggestions;
