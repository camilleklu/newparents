import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";

const AtelierCard = ({ workshop, className = "" }) => {
  if (!workshop) return null;

  return (
    <div
      className={`bg-white rounded-[30px] shadow-lg flex flex-col overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* --- IMAGE --- */}
      <div className="w-full h-40 relative shrink-0">
        {workshop.img ? (
          <img
            src={workshop.img}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${workshop.imageColor || 'bg-[#75BDBC]'} opacity-80`} />
        )}
      </div>

      {/* --- CONTENU TEXTE --- */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
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
};

export default AtelierCard;