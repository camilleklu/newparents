import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useWorkshops } from "../context/WorkshopContext";

const Ateliers = () => {
  const { workshops } = useWorkshops();

  // --- LOGIQUE CARROUSEL ---
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);

  // On filtre les ateliers disponibles
  const availableWorkshops = workshops.filter((w) => w.spots > 0);

  // Fonction pour détecter quel atelier est au milieu
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      // 280px (largeur carte) + 24px (gap-6) = 304px par item
      setCenterIndex(Math.round(scrollPosition / 304));
    }
  };

  return (
    // h-screen pour prendre tout l'écran + flex-col pour empiler Header / Carrousel
    <div className="bg-[#F6F3E7] h-screen pb-24 relative flex flex-col overflow-hidden">
      {/* --- 1. HEADER FIXE EN HAUT --- */}
      <div>
        <div className="w-full h-6 bg-[#FFB041] mb-4" />
        <div className="flex justify-between items-center mb-2 px-6">
          <h1 className="text-3xl font-bold text-gray-800">Nos Ateliers</h1>
        </div>
      </div>

      {/* --- 2. CARROUSEL CENTRÉ VERTICALEMENT (Prend tout l'espace restant) --- */}
      <div className="flex-1 flex flex-col justify-center">
        {availableWorkshops.length > 0 ? (
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto px-0 py-8 snap-x snap-mandatory no-scrollbar items-center"
            // Le padding correspond à : 50% de l'écran - Moitié de la largeur carte (140px)
            style={{
              paddingLeft: "calc(50% - 140px)",
              paddingRight: "calc(50% - 140px)",
            }}
          >
            {availableWorkshops.map((workshop, index) => {
              const isCenter = index === centerIndex;

              return (
                <div
                  key={workshop.id}
                  className={`
                    snap-center shrink-0 w-[280px] bg-white rounded-[30px] shadow-lg flex flex-col
                    transition-all duration-300 ease-out overflow-hidden 
                    ${
                      isCenter
                        ? "scale-110 z-10 opacity-100 shadow-2xl"
                        : "scale-90 opacity-60 blur-[1px]"
                    }
                  `}
                  // J'ai enlevé 'p-4' ci-dessus et ajouté 'overflow-hidden'
                >
                  {/* --- IMAGE (Colle aux bords) --- */}
                  {/* J'ai enlevé 'rounded-2xl' et 'mb-4' car c'est le conteneur qui gère l'arrondi et le padding */}
                  <div
                    className={`w-full h-40 ${workshop.imageColor} shrink-0`}
                  />

                  {/* --- CONTENU TEXTE (Le padding p-4 est déplacé ici) --- */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {workshop.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                      {workshop.description}
                    </p>

                    {/* Infos */}
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#75BDBC]" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#75BDBC]" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#75BDBC]" />
                        <span>{workshop.location}</span>
                      </div>
                    </div>

                    {/* Bouton */}
                    <Link
                      to={`/ateliers/${workshop.id}`}
                      className="w-full bg-[#FFB041] text-gray-900 font-bold py-3 rounded-full text-center hover:bg-[#ffaa30] transition-colors shadow-md"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            Aucun atelier disponible pour le moment.
          </div>
        )}

        {/* Indicateurs (petits points) */}
        <div className="flex justify-center gap-3 mt-4 h-6">
          {availableWorkshops.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                idx === centerIndex ? "bg-[#75BDBC] scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ateliers;
