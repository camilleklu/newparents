import React, { createContext, useState, useContext, useEffect } from "react";
import { ateliersList } from "../data/ateliers";

const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
  // --- MODIFICATION ICI ---

  // Au lieu de charger directement la liste, on vérifie d'abord si on a une sauvegarde
  const [workshops, setWorkshops] = useState(() => {
    // 1. On regarde dans le "localStorage"
    const savedWorkshops = localStorage.getItem("my_workshops_data");

    // 2. Si on a trouvé des données sauvegardées, on les utilise (JSON.parse)
    if (savedWorkshops) {
      return JSON.parse(savedWorkshops);
    }

    // 3. Sinon, on utilise la liste par défaut
    return ateliersList;
  });

  // --- NOUVEAU : SAUVEGARDE AUTOMATIQUE ---
  // À chaque fois que la variable 'workshops' change, on met à jour le localStorage
  useEffect(() => {
    localStorage.setItem("my_workshops_data", JSON.stringify(workshops));
  }, [workshops]);

  // Fonction pour diminuer le nombre de places (Inchangée)
  const registerForWorkshop = (id) => {
    setWorkshops((prev) =>
      prev.map((workshop) => {
        if (workshop.id === parseInt(id)) {
          return { ...workshop, spots: Math.max(0, workshop.spots - 1) };
        }
        return workshop;
      })
    );
  };

  const getWorkshop = (id) => workshops.find((w) => w.id === parseInt(id));

  // Petit bonus : Une fonction pour tout remettre à zéro si besoin (pour tes tests)
  const resetData = () => {
    setWorkshops(ateliersList);
    localStorage.removeItem("my_workshops_data");
  };

  return (
    <WorkshopContext.Provider
      value={{ workshops, registerForWorkshop, getWorkshop, resetData }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshops = () => useContext(WorkshopContext);
