import React, { useState } from "react";
import { articleList } from "../data/publications";
import ArticleCard from "../components/ArticleCard"; // Import de la carte


const Publications = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const categories = ["Tout", "Conseils", "Nutrition", "Éveil", "Témoignages"];

  const filteredArticles =
    activeCategory === "Tout"
      ? articleList
      : articleList.filter((art) => art.category === activeCategory);

  return (
    <div className="pb-32 min-h-screen bg-[#F7F5EA]">
      {/* --- 1. BARRE ORANGE DU HAUT --- */}
      <div className="w-full h-6 bg-[#FFB041] mb-4" />

      {/* --- 2. HEADER --- */}
      <div className="flex justify-between items-center px-6 my-8">
        <h1 className="text-3xl font-bold text-gray-800">Publications</h1>
      </div>

      {/* --- 3. FILTRES --- */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6 px-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap
              ${
                activeCategory === cat
                  ? "bg-[#FFEF63] shadow-md transform scale-105 text-gray-800"
                  : "bg-[rgba(252,251,248,1)]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- 4. LISTE DES ARTICLES --- */}
      <div className="px-6 space-y-6 ">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Publications;