import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ChevronLeft } from "lucide-react";
import { articleList } from "../data/publications";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articleList.find((art) => art.id === parseInt(id));
    const navigate = useNavigate();

  if (!article) return null;

  return (
    <div className="pb-32 min-h-screen bg-[#F7F5EA]">
      {/* --- 1. BARRE ORANGE DU HAUT --- */}
      <div className="w-full h-6 bg-[#FFB041] mb-4" />

      <div className="px-4 py-4 mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/20 p-2 rounded-full"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Publications</h1>
      </div>

      <div className="w-full h-72">
        <img 
          src={article.img} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-20" />
      </div>

      {/* Contenu de l'article */}
      <div className="px-6 mt-6 z-10">
        <span className="bg-[#FFEF63] text-gray-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
          {article.category}
        </span>
        
        <h1 className="text-3xl font-black mt-4 text-center">
          {article.title}
        </h1>

        <div className="flex justify-around mt-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <User size={16} className="text-[#75BDBC]" />
            {article.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-[#75BDBC]" />
            {article.date}
          </div>
        </div>

        {/* Corps de l'article */}
        <div className="mt-8 px-2 text-gray-700 leading-relaxed text-lg pb-20">
          {/* On affiche le contenu complet ici */}
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
    );
};

export default ArticleDetail;