import React, { useContext, useState } from "react";
import SearchBar from "../../componentes/SearchBar/SearchBar";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../componentes/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import UseDetailedContext from "../../context/UseDetailedContext";
import usePropertiesSold from "../../hooks/usePropertiesSold";
import PropertyCardSale from "../../componentes/PropertyCard/PropertyCardSale";

const sales = () => {
  const { data, isError, isLoading } = usePropertiesSold();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { sales },
  } = useContext(UseDetailedContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error al obtener datos</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const filteredProperties = data
    .filter(
      (property) =>
        property.title.toLowerCase().includes(filter.toLowerCase()) ||
        property.city.toLowerCase().includes(filter.toLowerCase()) ||
        property.country.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            filteredProperties.length > 0
              ? filteredProperties.map((card, i) => (
                  <PropertyCardSale card={card} key={i} />
                ))
              : <p>No tienes ninguna propiedad vendida.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default sales;