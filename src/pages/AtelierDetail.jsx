import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ChevronLeft } from "lucide-react";
import { useWorkshops } from "../context/WorkshopContext";

const AtelierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWorkshop } = useWorkshops();

  const workshop = getWorkshop(id);

  // Sécurité si l'atelier n'existe pas ou est complet entre temps
  if (!workshop || workshop.spots === 0) {
    return (
      <div className="p-10 text-center">Cet atelier n'est plus disponible.</div>
    );
  }

  return (
    <div className="bg-[#F7F5EA] min-h-screen pb-24 relative">
      {/* Header Orange avec retour */}
      <div className="bg-[#FFB041] px-6 py-6 rounded-b-[30px] shadow-sm mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Nos Ateliers</h1>
      </div>

      <div className="px-6">
        {/* Titre */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {workshop.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {workshop.description}
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </p>

        {/* Bloc Informations */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Informations</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-900" />
              <span>{workshop.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gray-900" />
              <span>{workshop.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-900" />
              <span>{workshop.location}</span>
            </div>
          </div>
        </div>

        {/* Frame Google Map (Fake) */}
        <div className="w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center mb-8">
          <span className="font-bold text-gray-600 text-xl">
            frame google map
          </span>
        </div>

        {/* Bouton S'inscrire */}
        <Link
          to={`/ateliers/${id}/inscription`}
          className="block w-full bg-[#FFB041] text-gray-900 font-bold py-4 rounded-full text-center shadow-lg hover:shadow-xl transition-all"
        >
          S'inscrire à l'atelier
        </Link>
        <p className="text-center text-sm text-gray-500 mt-2">
          Plus que {workshop.spots} places disponibles !
        </p>
      </div>
    </div>
  );
};

export default AtelierDetail;
