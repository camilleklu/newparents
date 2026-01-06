import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useWorkshops } from "../context/WorkshopContext";

const Inscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWorkshop, registerForWorkshop } = useWorkshops();

  const workshop = getWorkshop(id);

  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. On décrémente les places dans le "Cerveau"
    registerForWorkshop(id);

    // 2. On affiche une alerte (ou on redirige vers une page de succès)
    alert(`Merci ${formData.prenom}, votre inscription est confirmée !`);

    // 3. On redirige vers la liste des ateliers
    // Comme les places ont diminué, si c'était la dernière, l'atelier disparaîtra !
    navigate("/ateliers");
  };

  if (!workshop) return null;

  return (
    <div className="bg-[#F6F3E7] min-h-screen pb-10 relative">
      <div className="w-full h-6 bg-[#FFB041] mb-4" />

      {/* Header Orange */}
      <div className="px-4 py-4 mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Inscription</h1>
      </div>

      <div className="px-6">
        <div className="bg-[#FFFCF2] p-6 rounded-[30px] shadow-lg border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Inscription</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                Nom
              </label>
              <input
                type="text"
                name="nom"
                required
                className="w-full bg-[#F0EFE6] rounded-xl p-3 border-none shadow-inner focus:ring-2 focus:ring-[#FFB041]"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                Prénom
              </label>
              <input
                type="text"
                name="prenom"
                required
                className="w-full bg-[#F0EFE6] rounded-xl p-3 border-none shadow-inner focus:ring-2 focus:ring-[#FFB041]"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#F0EFE6] rounded-xl p-3 border-none shadow-inner focus:ring-2 focus:ring-[#FFB041]"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                Telephone
              </label>
              <input
                type="tel"
                name="telephone"
                required
                className="w-full bg-[#F0EFE6] rounded-xl p-3 border-none shadow-inner focus:ring-2 focus:ring-[#FFB041]"
                onChange={handleChange}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#FFB041] text-gray-900 font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-transform active:scale-95"
              >
                Confirmation de l'inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
