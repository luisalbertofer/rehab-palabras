// src/components/OptionsGrid.jsx
import React from "react";

const OptionsGrid = ({ options, currentWord, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={selected !== null}
          className={`border px-4 py-2 rounded-lg shadow text-sm transition-all ${
            selected
              ? option === currentWord
                ? "bg-green-200 border-green-600"
                : option === selected
                ? "bg-red-200 border-red-600"
                : "bg-gray-100"
              : "hover:bg-gray-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsGrid;
