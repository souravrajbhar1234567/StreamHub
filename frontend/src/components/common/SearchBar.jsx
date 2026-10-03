import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search videos, courses, topics...",
}) {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleInput = (e) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleClear = () => {
    setInternalValue("");
    if (onChange) onChange("");
    if (onSearch) onSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(internalValue);
  };

  return (
    <form className="search-bar-wrap" onSubmit={handleSubmit}>
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleInput}
      />
      {internalValue && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}
