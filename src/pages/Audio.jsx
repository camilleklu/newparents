import React, { useState, useRef, useEffect } from "react";
import { Play, Search, BarChart3, Pause } from "lucide-react";
import { audioList, getPopularAudios } from "../data/audios";
import PlayerModal from "../components/PlayerModal";
import TrackWaveform from "../components/TrackWaveform";

const Audio = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");

  // États Audio
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // États UI (Carrousel)
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isLooping, setIsLooping] = useState(false);

  const popularTracks = getPopularAudios();

  const filteredTracks =
    activeCategory === "Tout"
      ? audioList
      : audioList.filter((track) => track.category === activeCategory);

  const categories = ["Tout", "Podcast", "Ambiances", "Autre"];

  // --- LOGIQUE ---

  const handleTrackClick = (track) => {
    if (currentTrack?.id === track.id) {
      setIsModalOpen(true);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsModalOpen(true);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
    } else {
      fadeIn();
      setIsPlaying(true);
    }
  };

  const changeTrack = (direction) => {
    if (!currentTrack) return;
    const currentIndex = audioList.findIndex((t) => t.id === currentTrack.id);
    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex + 1;
      if (newIndex >= audioList.length) newIndex = 0;
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = audioList.length - 1;
    }
    setCurrentTrack(audioList[newIndex]);
    setIsPlaying(true);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      // Ajustement de la sensibilité du scroll pour centrer la sélection
      setCenterIndex(Math.round(scrollPosition / 176));
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // --- FONCTIONS DE FONDU SONORE ---

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    audio.volume = 0;
    audio.play();

    fadeInterval.current = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.4, 1);
      } else {
        clearInterval(fadeInterval.current);
      }
    }, 50);
  };

  const fadeOut = (callback) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    fadeInterval.current = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - 0.4, 0);
      } else {
        clearInterval(fadeInterval.current);
        audio.pause();
        audio.volume = 1;

        if (callback) callback();
      }
    }, 50);
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.src;

      if (isPlaying) {
        fadeIn();
      }
    }
  }, [currentTrack]);

  return (
    // FOND GÉNÉRAL CRÈME (#F6F3E7)
    <div className="pb-32 px-0 min-h-screen relative bg-[#F6F3E7]">
      <audio
        ref={audioRef}
        onEnded={() => {
          if (!isLooping) setIsPlaying(false);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        loop={isLooping}
      />

      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        track={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={() => changeTrack("next")}
        onPrev={() => changeTrack("prev")}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLooping={isLooping}
        toggleLoop={() => setIsLooping(!isLooping)}
      />

      {/* --- 1. BARRE ORANGE DU HAUT (#FFB041) --- */}
      <div className="w-full h-6 bg-[#FFB041] mb-4" />

      {/* --- 2. HEADER PRINCIPAL --- */}
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-3xl font-bold text-gray-800">Audios</h1>
      </div>

      {/* --- 3. FILTRES JAUNES (#FFEF63) --- */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-4 px-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap text-gray-800
              ${
                activeCategory === cat
                  ? "bg-[#FFEF63] shadow-md transform scale-105" // Actif
                  : "bg-[#F6F3E7]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- 4. POPULAIRE (CARROUSEL Bicolore) --- */}
      <div className="mb-8 mt-2">
        <h2 className="text-xl font-semibold text-black mb-8 px-6">
          Populaire
        </h2>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory"
          style={{
            paddingLeft: "calc(50% - 90px)",
            paddingRight: "calc(50% - 90px)",
          }}
        >
          {popularTracks.map((track, index) => {
            const isCenter = index === centerIndex;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`

                    snap-center shrink-0 w-[180px] h-[220px] rounded-[30px] relative p-4 flex flex-col justify-end shadow-sm cursor-pointer 

                    transition-all duration-300 ease-out overflow-hidden 

                    ${
                      isCenter
                        ? "scale-110 z-10 shadow-xl"
                        : "scale-90 opacity-90"
                    }

                    ${isCenter ? "bg-[#75BDBC]" : "bg-[#90D6DD]"} 

                `}

                // ^ J'ai ajouté 'overflow-hidden' dans la className ci-dessus
              >
                {/* --- IMAGE DE FOND --- */}

                {track.img && (
                  <>
                    <img
                      src={track.img}
                      alt={track.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Petit dégradé noir par-dessus l'image pour qu'on puisse lire le texte blanc */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </>
                )}

                {/* --- TEXTE (avec z-10 pour passer au dessus de l'image) --- */}

                <div
                  className={`relative z-10 transition-opacity duration-300 ${
                    isCenter ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="font-bold text-white leading-tight drop-shadow-md">
                    {track.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- 5. LISTE DES SONS (Style blanc et ondes Teal) --- */}
      <div className="px-6">
        <h2 className="text-xl font-semibold text-black mb-8">Sons</h2>
        <div className="space-y-4">
          {filteredTracks.map((track) => {
            const isPlayingThis = currentTrack?.id === track.id;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`group bg-white p-3 rounded-full flex items-center gap-4 transition-all cursor-pointer shadow-lg ${
                  isPlayingThis ? "ring-2 ring-[#75BDBC]" : ""
                }`}
              >
                {/* Cercle Noir/Gris foncé pour l'icône */}
                <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center shrink-0">
                  {isPlayingThis && isPlaying ? (
                    <BarChart3 size={20} className="text-white animate-pulse" />
                  ) : (
                    // Cercle vide ou icône play
                    <div className="w-4 h-4 rounded-full bg-white opacity-20"></div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center overflow-hidden">
                  <h4 className="font-medium text-black text-sm">
                    {track.title}
                  </h4>

                  {/* VISUALIZER TYPE "WAVEFORM" (Couleur #75BDBC) */}
                  <div className="h-6 w-full max-w-[200px]">
                    <TrackWaveform
                      isPlaying={isPlayingThis} // Vrai seulement si c'est CE son qui joue
                      audioRef={audioRef} // On passe la ref de l'audio global
                      trackId={track.id} // Pour générer la forme statique unique
                      color="#75BDBC"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Audio;
