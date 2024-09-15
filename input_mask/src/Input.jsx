import React from "react";
const Input = ({
  handleChange,
  hint,
  placeholderSuggestion,
  inputValue,
  handleKeyDown,
}) => {
  return (
    <div className="input-container">
      <label htmlFor="input">{hint}</label>
      <input
        type="text"
        id="input"
        onChange={handleChange}
        value={inputValue}
        placeholder={placeholderSuggestion}
        className="input-box"
        autoComplete="off"
        onKeyDown={handleKeyDown}
        style={{
          position: "relative",
          background: placeholderSuggestion ? "#f0f0f0" : "white",
        }}
      />
      <div className="suggestion">{placeholderSuggestion}</div>
    </div>
  );
};

export default Input;
