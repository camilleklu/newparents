import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { audioList, getPopularAudios } from "../data/audios";
import PlayerModal from "../components/PlayerModal";
import AudioCard from "../components/AudioCard";

const Audio = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Tout");

  // États Audio
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // États UI
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const popularTracks = getPopularAudios();
  const filteredTracks = activeCategory === "Tout" 
    ? audioList 
    : audioList.filter((track) => track.category === activeCategory);

  const categories = ["Tout", "Podcast", "Ambiances", "Autre"];

  // --- LOGIQUE DE FADE (FONDU) ---
  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    audio.volume = 0;
    audio.play();
    fadeInterval.current = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.05, 1);
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
        audio.volume = Math.max(audio.volume - 0.05, 0);
      } else {
        clearInterval(fadeInterval.current);
        audio.pause();
        audio.volume = 1;
        if (callback) callback();
      }
    }, 50);
  };

  // --- EFFETS (Auto-play & Nettoyage) ---
  useEffect(() => {
    if (location.state?.autoPlayTrack) {
      const track = location.state.autoPlayTrack;
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [location]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) fadeIn();
    }
  }, [currentTrack]);

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---
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
      newIndex = (currentIndex + 1) % audioList.length;
    } else {
      newIndex = (currentIndex - 1 + audioList.length) % audioList.length;
    }
    setCurrentTrack(audioList[newIndex]);
    setIsPlaying(true);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setCenterIndex(Math.round(scrollRef.current.scrollLeft / 176));
    }
  };

  // LA FONCTION QUI MANQUAIT :
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="pb-32 px-0 min-h-screen relative bg-[#F6F3E7]">
      <audio
        ref={audioRef}
        onEnded={() => !isLooping && setIsPlaying(false)}
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
        onSeek={handleSeek} // Utilisée ici
        isLooping={isLooping}
        toggleLoop={() => setIsLooping(!isLooping)}
      />

      {/* Header Orange Déco */}
      <div className="w-full h-6 bg-[#FFB041] mb-4" />

      <div className="px-6 my-8">
        <h1 className="text-3xl font-bold text-gray-800">Audios</h1>
      </div>

      {/* Filtres Catégories */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-4 px-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap text-gray-800
              ${activeCategory === cat ? "bg-[#FFEF63] shadow-md scale-105" : "bg-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carrousel Populaire */}
      <div className="mb-8 mt-2">
        <h2 className="text-xl font-semibold text-black mb-8 px-6">Populaire</h2>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory"
          style={{ paddingLeft: "calc(50% - 90px)", paddingRight: "calc(50% - 90px)" }}
        >
          {popularTracks.map((track, index) => (
            <div
              key={track.id}
              onClick={() => handleTrackClick(track)}
              className={`snap-center shrink-0 w-[180px] h-[220px] rounded-[30px] relative p-4 flex flex-col justify-end shadow-sm cursor-pointer transition-all duration-300 overflow-hidden 
                ${index === centerIndex ? "scale-110 z-10 shadow-xl bg-[#75BDBC]" : "scale-90 opacity-90 bg-[#90D6DD]"}`}
            >
              {track.img && (
                <>
                  <img src={track.img} alt={track.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </>
              )}
              <div className={`relative z-10 transition-opacity ${index === centerIndex ? "opacity-100" : "opacity-0"}`}>
                <h3 className="font-bold text-white leading-tight drop-shadow-md">{track.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des Sons avec AudioCard */}
      <div className="px-6">
        <h2 className="text-xl font-semibold text-black mb-8">Sons</h2>
        <div className="space-y-4">
          {filteredTracks.map((track) => (
            <AudioCard 
              key={track.id}
              track={track}
              isPlaying={isPlaying}
              isCurrentTrack={currentTrack?.id === track.id}
              onClick={handleTrackClick}
              audioRef={audioRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audio;