import React, { useEffect, useRef, useMemo } from 'react';

// --- GESTIONNAIRE AUDIO GLOBAL (Hors du composant) ---
// Ces variables existent en dehors du cycle de vie de React
// pour ne pas être effacées quand vous changez de musique.
let audioContext = null;
let analyser = null;
let mediaSource = null;

const TrackWaveform = ({ isPlaying, audioRef, trackId, color = '#75BDBC' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // 1. LOGIQUE DYNAMIQUE (Quand ça joue)
  useEffect(() => {
    if (isPlaying && audioRef.current && canvasRef.current) {
      
      // A. Initialisation sécurisée du Contexte Audio
      const initAudio = () => {
        // Si le contexte n'existe pas, on le crée
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Si l'analyseur n'existe pas, on le crée
        if (!analyser) {
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 128; // 64 barres environ
        }

        // LE POINT CRITIQUE : On ne connecte la source que SI elle n'existe pas déjà
        if (!mediaSource) {
          try {
            mediaSource = audioContext.createMediaElementSource(audioRef.current);
            mediaSource.connect(analyser);
            analyser.connect(audioContext.destination);
          } catch (e) {
            // Si erreur "already connected", on l'ignore car c'est bon signe : c'est déjà branché !
            console.log("Source audio déjà connectée, reprise du flux existant.");
          }
        }
      };

      initAudio();

      // B. La boucle d'animation
      const draw = () => {
        if (!canvasRef.current || !analyser) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Paramètres de style (comme Vudio)
        const barWidth = (canvas.width / bufferLength) * 2; 
        let barHeight;
        let x = 0;

        // Dessin des barres
        for (let i = 0; i < bufferLength; i++) {
          // On booste un peu la hauteur pour que ce soit joli
          barHeight = (dataArray[i] / 255) * canvas.height; 

          ctx.fillStyle = color;
          
          // Dessin de bas en haut
          // (x, y, largeur, hauteur)
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

          x += barWidth;
        }

        animationRef.current = requestAnimationFrame(draw);
      };

      // Lancer l'animation
      draw();
    }

    // Nettoyage quand on met pause ou change de piste
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioRef, color]);

  // 2. LOGIQUE STATIQUE (Fixe pour les autres pistes)
  const staticBars = useMemo(() => {
    const pseudoRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 30 }).map((_, i) => {
      // Hauteur fixe basée sur l'ID
      return Math.floor(pseudoRandom(trackId * 100 + i) * 80 + 10); 
    });
  }, [trackId]);

  // --- RENDU ---

  if (isPlaying) {
    return (
      <canvas 
        ref={canvasRef} 
        width={200}
        height={50}
        className="w-full h-full"
      />
    );
  }

  return (
    <div className="flex items-end gap-[2px] h-full opacity-80">
      {staticBars.map((height, i) => (
        <div 
          key={i} 
          className="w-[3px] rounded-full" 
          style={{ 
            height: `${height}%`, 
            backgroundColor: color 
          }} 
        />
      ))}
    </div>
  );
};

export default TrackWaveform;