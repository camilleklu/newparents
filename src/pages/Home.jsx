import React from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { articleList } from "../data/publications";
import { audioList } from "../data/audios";
import { useWorkshops } from "../context/WorkshopContext";

import ArticleCardHome from "../components/ArticleCardHome";
import AudioCardHome from "../components/AudioCardHome";
import AtelierCard from "../components/AtelierCard";

const Home = () => {
  const { workshops } = useWorkshops();
  const navigate = useNavigate();
  
  const recentArticles = articleList.slice(0, 2);
  const recentAudios = audioList.slice(0, 2);
  const featuredWorkshops = workshops.slice(0, 2);

  // Redirige vers /audios en passant l'objet audio dans l'état de navigation
  const handleAudioClick = (audio) => {
    navigate("/audios", { state: { autoPlayTrack: audio } });
  };

  return (
    <div className="bg-[#F7F5EA] min-h-screen pb-32">
      <div className="bg-[#FFB041] rounded-b-[50px] px-6 pt-8 pb-10 shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <p className="text-white/80 text-xl font-medium">Bonjour,</p>
            <h1 className="text-gray-800 text-3xl font-bold">Comment allez-vous ?</h1>
          </div>
        </div>

        <div className="bg-[#FFD466] rounded-[40px] p-8 shadow-inner relative overflow-hidden">
          <h2 className="text-gray-800 text-xl font-black mb-3">Conseil du jour</h2>
          <p className="text-gray-700 font-medium leading-relaxed mb-6">
            Prenez 5 minutes pour respirer profondément. Vous le méritez.
          </p>
          <Link to="/audios" className="bg-[#75BDBC] flex items-center justify-center text-white text-center font-bold px-8 py-3 rounded-2xl shadow-md">
            Commencer
          </Link>
        </div>
      </div>

      <div className="mt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Publications</h2>
          <Link to="/publications" className="text-[#75BDBC] text-sm font-bold flex items-center gap-1">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-4">
          {recentArticles.map(art => <ArticleCardHome key={art.id} article={art} />)}
        </div>
      </div>

      <div className="mt-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Audios relaxants</h2>
          <Link to="/audios" className="text-[#75BDBC] text-sm font-bold flex items-center gap-1">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentAudios.map(audio => (
            <AudioCardHome 
              key={audio.id} 
              audio={audio} 
              onClick={() => handleAudioClick(audio)} 
            />
          ))}
        </div>
      </div>

      <div className="mt-12 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Nos Ateliers</h2>
          <Link to="/ateliers" className="text-[#75BDBC] text-sm font-bold flex items-center gap-1">
            Voir tout <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-6">
          {featuredWorkshops.map(workshop => (
            <AtelierCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;