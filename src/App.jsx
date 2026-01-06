import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Publications from './pages/Publications.jsx';
import Audio from './pages/Audio.jsx';
import Atelier from './pages/Atelier.jsx'; 
import Navbar from './components/Navbar.jsx';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/audios" element={<Audio />} />
        <Route path="/ateliers" element={<Atelier />} />
      </Routes>
    <Navbar />
    </>
  )
}

export default App
