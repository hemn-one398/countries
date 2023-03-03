import React from "react";
import Select from "react-select";

import "../App.css";

import searchImage from "../assets/search.svg";

const Navbar = ({
  handleSearchInputKeyDown,
  handleSearchInputChange,
  regionOptions,
  handleRegionChange,
  selectedRegion,
}) => {
  return (
    <div className="container">
      <header>
        <Search
          handleSearchInputChange={handleSearchInputChange}
          handleSearchInputKeyDown={handleSearchInputKeyDown}
        />
        <Select
          className="region-select"
          onChange={handleRegionChange}
          options={regionOptions}
          value={selectedRegion}
        />
      </header>
    </div>
  );
};

export const Search = ({
  handleSearchInputKeyDown,
  handleSearchInputChange,
}) => {
  return (
    <div className="search-field">
      <input
        type="text"
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchInputKeyDown}
      />
      <div>
        <img src={searchImage} alt="" />
      </div>
    </div>
  );
};

// searchField.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     pageNumber = 1;
//     searchedName = searchField.value;
//     setData(fetchData());
//   }
// });

// searchField.addEventListener("input", onChange);

// function onChange(e) {
//   if (searchField.value.length == 0 && searchedName.length > 0) {
//     searchedName = searchField.value;
//     setData(fetchData());
//   }
// }

export default Navbar;
