// Fichier : src/context/WorkshopContext.jsx

import React, { createContext, useState, useContext } from "react";

// ON IMPORTE LA DATA ICI
import { ateliersList } from "../data/ateliers";

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  // On utilise la liste importée comme valeur initiale
  const [workshops, setWorkshops] = useState(ateliersList);

  // Fonction pour diminuer le nombre de places
  const registerForWorkshop = (id) => {
    setWorkshops((prev) =>
      prev.map((workshop) => {
        if (workshop.id === parseInt(id)) {
          // On évite de descendre en dessous de 0 avec Math.max
          return { ...workshop, spots: Math.max(0, workshop.spots - 1) };
        }
        return workshop;
      })
    );
  };

  const getWorkshop = (id) => workshops.find((w) => w.id === parseInt(id));

  return (
    <WorkshopContext.Provider
      value={{ workshops, registerForWorkshop, getWorkshop }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshops = () => useContext(WorkshopContext);
