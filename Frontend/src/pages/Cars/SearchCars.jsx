// SearchCars Component
import { useState } from "react";
// import { searchCars } from "../services/carService";
import axios from "axios";
const SearchCars = ({ onResults }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "http://localhost:8800/api/cars/Getcars/search",
      keyword
    );
    // const { data } = await searchCars(keyword);
    onResults(data.cars);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search cars..."
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "5px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchCars;
