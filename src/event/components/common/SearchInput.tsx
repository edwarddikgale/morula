import React, { useState, useMemo } from "react";
import debounce from "lodash.debounce";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  // Create a debounced version of the onSearch function to limit API calls
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500), // Adjust delay (500ms)
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Update the local state
    debouncedSearch(value); // Call the debounced search function
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      type="text"
      className="form-control search-field"
      id="search"
      placeholder={placeholder || "Search ..."}
    />
  );
};

export default SearchInput;
