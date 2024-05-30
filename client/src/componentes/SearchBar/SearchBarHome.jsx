import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SearchBarHome = ({ filter, setFilter }) => {
    const navigate = useNavigate()

  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Buscar por pais/ciudad/titulo..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="button" onClick={()=> navigate("./properties", {replace: true})}>Search</button>
    </div>
  );
};

export default SearchBarHome;
