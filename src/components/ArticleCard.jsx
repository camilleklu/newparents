import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    return (
        <Link
            to={`/publications/${article.id}`}
            className="bg-white rounded-[30px] overflow-hidden shadow-sm flex flex-col shadow-[0_-5px_20px_rgba(0,0,0,0.06)] cursor-pointer"
        >
            <div
                className="bg-white rounded-[30px] overflow-hidden shadow-sm flex flex-col shadow-[0_-5px_20px_rgba(0,0,0,0.06)]"
            >
                {/* Image de l'article */}
                <div className="h-48 w-full relative">
                    <img
                        src={article.img}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-[#FFEF63] text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Contenu de la card */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                        {article.title}
                    </h3>
                    <div className="flex items-center justify-between gap-4 text-xs text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                            <User size={14} />
                            {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {article.date}
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {article.excerpt}
                    </p>

                    <button
                        className="flex gap-1 text-[#63B6B4] font-bold text-sm items-center"
                        onClick={() => alert(`Ouvrir l'article : ${article.title}`)}
                    >
                        Lire la suite
                        <ArrowRight size={10} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;