import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Briefcase, Image, User, FileText, Link as LinkIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'hero', path: '/', icon: <Home size={20} />, label: 'Home' },
  { id: 'about', path: '/#about', icon: <User size={20} />, label: 'About' },
  { id: 'crafted', path: '/work', icon: <Briefcase size={20} />, label: 'Work' },
  { id: 'blog', path: '/blog', icon: <FileText size={20} />, label: 'Blog' },
  { id: 'links', path: '/links', icon: <LinkIcon size={20} />, label: 'Links' },
];

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-2 bg-[#1A1A1A] p-2 rounded-[24px] border border-white/10"
          >
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md border transition-all ${
                    isActive ? 'bg-accent border-accent text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/10 text-white/60 border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="absolute right-16 scale-0 rounded bg-white px-3 py-1 text-xs font-sugopro tracking-wider text-black transition-all group-hover:scale-100 uppercase">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-colors duration-300 ${
          isOpen ? 'bg-accent text-white' : 'bg-white text-black'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
