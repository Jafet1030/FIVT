import React, { useContext, useState } from "react";
import SearchBar from "../../componentes/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../componentes/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import UseDetailedContext from "../../context/UseDetailedContext";

const Bookings = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bookings },
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
  // Antes de tu return statement, filtra tus propiedades
const filteredProperties = data
.filter((property) =>
  bookings?.map((booking) => booking.id).includes(property.id)
)
.filter(
  (property) =>
    property.title.toLowerCase().includes(filter.toLowerCase()) ||
    property.city.toLowerCase().includes(filter.toLowerCase()) ||
    property.country.toLowerCase().includes(filter.toLowerCase())
);

// Luego, en tu return statement, puedes usar filteredProperties
return (
<div className="wrapper">
  <div className="flexColCenter paddings innerWidth properties-container">
    <SearchBar filter={filter} setFilter={setFilter} />

    <div className="paddings flexCenter properties">
      {
        filteredProperties.length > 0
          ? filteredProperties.map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))
          : <p>No tienes ninguna propiedad en favoritos.</p>
      }
    </div>
  </div>
</div>
);
};

export default Bookings;