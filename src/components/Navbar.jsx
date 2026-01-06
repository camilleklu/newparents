import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Headphones, CalendarHeart } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { 
      name: 'Accueil', 
      path: '/', 
      icon: Home 
    },
    { 
      name: 'Articles', 
      path: '/publications', 
      icon: BookOpen 
    },
    { 
      name: 'Audios', 
      path: '/audios', 
      icon: Headphones 
    },
    { 
      name: 'Ateliers', 
      path: '/ateliers', 
      icon: CalendarHeart 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white px-6 py-3 rounded-t-[30px] shadow-[0_-5px_20px_rgba(0,0,0,0.06)] flex justify-between items-center h-20">
        
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-16 transition-all duration-300 ease-in-out
              ${isActive ? 'text-teal-600 transform -translate-y-1' : 'text-gray-400 hover:text-gray-500'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={isActive ? 28 : 24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="mb-1"
                />
                
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-teal-600' : 'bg-transparent'}`} />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;