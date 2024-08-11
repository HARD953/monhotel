import React, { createContext, useState, useContext } from "react";

const ChambreFilterContext = createContext();

export const initialStateFilters = {
    prix_min: 0,
    prix_max: 100000,
    ville: "",
    type_id: "",
  }


export const useChambreFilter = () => {
  return useContext(ChambreFilterContext);
};

export const ChambreFilterProvider = ({ children }) => {
  const [filtersChambre, setFiltersChambre] = useState(initialStateFilters);
  const [isResultsFilters,setIsResultsFilters] =  useState(0)

  return (
    <ChambreFilterContext.Provider
      value={{
        filtersChambre,
        setFiltersChambre,
        isResultsFilters,
        setIsResultsFilters,
      }}
    >
      {children}
    </ChambreFilterContext.Provider>
  );
};
