import ambiance1 from '../assets/ambiances/skz-chk-chk-boom.mp3'; 
import podcast1 from '../assets/podcast/kitten-skz.mp3';
import meme from '../assets/thumbnail/meme.png';
import funny from '../assets/video/funny_skz.mp4';

export const audioList = [
  { 
    id: 1, 
    title: "Bruit de la pluie", 
    category: "Ambiances", 
    src: ambiance1, 
    img : meme,
    video : funny,
  },
  { 
    id: 2, 
    title: "Devenir Parent", 
    category: "Podcast", 
    src: podcast1, 
    img : meme,
    video : "",
  },
  { 
    id: 3, 
    title: "Devenir Parent", 
    category: "Podcast", 
    src: podcast1, 
    img : meme,
    video : "",
  },
  { 
    id: 4, 
    title: "Devenir Parent", 
    category: "Podcast", 
    src: podcast1, 
    img : meme,
    video : "",
  },
  { 
    id: 5, 
    title: "Podcast-Devenir Parent", 
    category: "Autre",
    src: podcast1, 
    img : meme,
    video : "",
  },
];


export const getPopularAudios = () => {
    return audioList.slice(0, 3);
};