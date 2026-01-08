import React from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { articleList } from "../data/publications";
import { audioList } from "../data/audios";
import { useWorkshops } from "../context/WorkshopContext";

import ArticleCardHome from "../components/ArticleCardHome";
import AudioCardHome from "../components/AudioCardHome";
import AtelierCard from "../components/AtelierCard";

import logoImage from "../assets/logo/Logo_parenthese.png";
import typoImage from "../assets/logo/logo_typo.png";

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
            <div className="flex items-center justify-center bg-[#2CADA4] p-2">
                <img src={logoImage} alt="Logo Parenthese" className="w-18 h-auto pl-2" />
                <h1 className="text-[#F7F5EA] font-schoolbell text-3xl p-4"><span className="text-[#FFD406]">P</span>aren<span className="text-[#F7AB42]">t</span>hèse</h1>
            </div>
            <div className="w-full h-6 bg-[#F7AB42]" />
            <div className="bg-white shadow-sm rounded-b-[40px] p-8 shadow-inner relative overflow-hidden">
                <h2 className="font-schoolbell text-gray-800 text-2xl font-black mb-3">Conseil du jour</h2>
                <p className="font-poppins text-gray-700 font-medium leading-relaxed mb-6">
                    Prenez 5 minutes pour respirer profondément. Vous le méritez.
                </p>
                <Link to="/audios" className="font-poppins bg-[#2CADA4] flex items-center justify-center text-white text-center font-bold px-8 py-3 rounded-2xl shadow-md">
                    Commencer
                </Link>
            </div>

            <div className="mt-10 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-schoolbell text-2xl font-bold text-gray-800">Publications</h2>
                    <Link to="/publications" className="font-poppins text-[#2CADA4] text-sm font-bold flex items-center gap-1">
                        Voir tout <ChevronRight size={16} />
                    </Link>
                </div>
                <div className="space-y-4">
                    {recentArticles.map(art => <ArticleCardHome key={art.id} article={art} />)}
                </div>
            </div>

            <div className="mt-12 px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-schoolbell text-2xl font-bold text-gray-800">Audios relaxants</h2>
                    <Link to="/audios" className="font-poppins text-[#2CADA4] text-sm font-bold flex items-center gap-1">
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
                    <h2 className="font-schoolbell text-2xl font-bold text-gray-800">Nos Ateliers</h2>
                    <Link to="/ateliers" className="font-poppins text-[#2CADA4] text-sm font-bold flex items-center gap-1">
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