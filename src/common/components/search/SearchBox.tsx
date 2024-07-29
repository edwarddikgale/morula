import React from "react";
import { SearchIcon } from "utils/CustomIcon";
import './search-box.css';

interface SearchBoxProps {
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery, placeholder = "Search events" }) => {
  return (
    <div className='d-flex search-section'>
      <div className='position-relative my-2 me-0 me-md-3'>
        {!searchQuery && (
          <span className='position-absolute top-50 translate-middle' style={{ left: "20px" }}>
            <SearchIcon />
          </span>
        )}
        <input
          value={searchQuery || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          type='text'
          className='form-control search-field'
          id='search'
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBox;
