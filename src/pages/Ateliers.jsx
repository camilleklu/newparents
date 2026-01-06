import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Home } from "lucide-react";
import { useWorkshops } from "../context/WorkshopContext"; // On utilise notre cerveau

const Ateliers = () => {
  const { workshops } = useWorkshops();

  // FILTRE MAGIQUE : On ne garde que ceux qui ont des places
  const availableWorkshops = workshops.filter((w) => w.spots > 0);

  return (
    <div className="bg-[#F7F5EA] min-h-screen pb-24 relative">
      {/* Header Orange */}
      <div className="bg-[#FFB041] px-6 py-6 rounded-b-[30px] shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nos Ateliers</h1>
      </div>

      {/* Carrousel Vertical Cards */}
      <div className="overflow-x-auto flex gap-6 px-6 pb-8 snap-x snap-mandatory no-scrollbar">
        {availableWorkshops.length > 0 ? (
          availableWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="snap-center shrink-0 w-[280px] bg-white rounded-[30px] p-4 shadow-lg flex flex-col"
            >
              {/* Image Placeholder */}
              <div
                className={`w-full h-40 ${workshop.imageColor} rounded-2xl mb-4`}
              />

              <div className="flex-1 flex flex-col">
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

                {/* Bouton Voir les détails */}
                <Link
                  to={`/ateliers/${workshop.id}`}
                  className="w-full bg-[#FFB041] text-gray-900 font-bold py-3 rounded-full text-center hover:bg-[#ffaa30] transition-colors"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            Aucun atelier disponible pour le moment.
          </div>
        )}
      </div>

      {/* Indicateurs (petits points) - Fake pour la démo */}
      <div className="flex justify-center gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-[#75BDBC]" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </div>
  );
};

export default Ateliers;
