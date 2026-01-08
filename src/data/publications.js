export const articleList = [
  {
    id: 1,
    title: "Le sommeil de bébé",
    category: "Conseils",
    author: "Marie Martin",
    date: "Aujourd'hui, 10:30",
    excerpt: "Comment instaurer une routine de sommeil efficace dès les premières semaines...",
    content: "Le texte long complet de l'article sur le sommeil de bébé ira ici...",
    img: "https://www.lpcr.fr/app/uploads/2024/07/65312935a8823_bb-dort-beaucoup-scaled.jpeg"
  },
  {
    id: 2,
    title: "L'alimentation diversifiée",
    category: "Nutrition",
    author: "Dr. Jean Dupont",
    date: "Hier, 15:45",
    excerpt: "Les étapes clés pour introduire les morceaux en toute sécurité...",
    content: "Le texte long complet sur la nutrition...",
    img: "https://mapetiteassiette.com/wp-content/uploads/2020/06/labimg_870_blw-e1592986608495.jpg"
  },
  {
    id: 3,
    title: "Activités d'éveil à la maison",
    category: "Éveil",
    author: "Sophie Lucas",
    date: "2 Janv. 2026",
    excerpt: "5 jeux simples à fabriquer soi-même pour stimuler la motricité fine...",
    content: "Le texte long complet sur l'éveil...",
    img: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-03-27_um_11.01.34_168b9ee3-e724-41d4-b1ca-b67edc3787ff.png?v=1711533764"
  }
];

export const getLatestArticles = () => [...articleList].reverse().slice(0, 3);