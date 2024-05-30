import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchPrice = ({ filterTitle, setFilterTitle, minPrice, setMinPrice, maxPrice, setMaxPrice, onSearch }) => {
  
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;

    setMaxPrice(value);
  };

  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Buscar por ubicación..."
        type="text"
        value={filterTitle}
        onChange={(e) => setFilterTitle(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        placeholder="Precio mínimo..."
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
        style={{ marginRight: '10px' }}
      />
      <input
        placeholder="Precio máximo..."
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        style={{ marginRight: '10px' }}
      />
      <button className="button" onClick={onSearch}>Buscar</button>
    </div>
  );
};

export default SearchPrice;