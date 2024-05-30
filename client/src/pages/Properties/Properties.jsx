import React, { useState } from 'react';
import './Properties.css';
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../componentes/PropertyCard/PropertyCard";
import SearchPrice from '../../componentes/SearchBar/SearchBar';

const Properties = () => {
  const { data, isError, isLoading } = useProperties(); 
  const [filterTitle, setFilterTitle] = useState(""); // Variable de estado para el filtro por título, ciudad o país
  const [minPrice, setMinPrice] = useState(""); // Variable de estado para el precio mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Variable de estado para el precio máximo

  const handleSearch = () => {
    // Puedes agregar lógica adicional para manejar la búsqueda aquí si es necesario
    console.log(`Buscando propiedades con título/ciudad/país que contenga "${filterTitle}" y precios entre "$${minPrice} y $${maxPrice}"`);
  };

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

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchPrice 
          filterTitle={filterTitle}
          setFilterTitle={setFilterTitle}
          minPrice={minPrice} 
          setMinPrice={setMinPrice} 
          maxPrice={maxPrice} 
          setMaxPrice={setMaxPrice} 
          onSearch={handleSearch}
        />

        <div className="paddings flexCenter properties">
          {
            data
              .filter((property) => {
                const titleIncludesFilter = property.title.toLowerCase().includes(filterTitle.toLowerCase());
                const cityIncludesFilter = property.city.toLowerCase().includes(filterTitle.toLowerCase());
                const countryIncludesFilter = property.country.toLowerCase().includes(filterTitle.toLowerCase());

                const price = parseFloat(property.price);
                const min = parseFloat(minPrice);
                const max = parseFloat(maxPrice);

                const priceInRange = (!min || price >= min) && (!max || price <= max);

                return (titleIncludesFilter || cityIncludesFilter || countryIncludesFilter) && priceInRange;
              })
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default Properties;