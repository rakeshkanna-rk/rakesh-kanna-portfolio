import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader } from '../ui/SectionHeader';
import { vibeDevelops } from '../../data/work';

interface VibeDevelopsProps {
  isWorkPage?: boolean;
}

export function VibeDevelops({ isWorkPage = false }: VibeDevelopsProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On Home page, show only items where showOnHome is true. On Works page, show all.
  const displayedProjects = isWorkPage 
    ? vibeDevelops 
    : vibeDevelops.filter((p: any) => p.showOnHome);

  if (displayedProjects.length === 0) return null;

  return (
    <>
      <section className="py-20 md:py-32 px-3 md:px-20 relative z-10 overflow-hidden">
        <SectionHeader title="Vibe Develops" className="mb-12 md:mb-20" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {displayedProjects.map((project: any) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => navigate(`/work/view-project/${project.id}`)}
                  whileHover={{ scale: 1.02 }}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-[20px] md:rounded-[30px] transition-all duration-300 hover:shadow-[0_0_50px_#33007E]"
                >
                  <div className="border border-white/80 rounded-[20px] md:rounded-[30px] overflow-hidden bg-[#0A0A0A] aspect-[4/3] md:aspect-video relative">
                    {/* Mobile Image */}
                    <img 
                      src={`https://rakeshkanna-rk.github.io/database/new_portfolio/${project.image.replace(/\.(\w+)$/, '_mobi.$1').replace(/^\//, '')}`} 
                      alt={project.title}
                      className="relative h-full w-full object-cover object-top block md:hidden"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = `https://rakeshkanna-rk.github.io/database/new_portfolio/${project.image.replace(/^\//, '')}`;
                      }}
                    />
                    {/* Desktop Image */}
                    <img 
                      src={`https://rakeshkanna-rk.github.io/database/new_portfolio/${project.image.replace(/^\//, '')}`} 
                      alt={project.title}
                      className="relative h-full w-full object-cover object-top hidden md:block"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-end p-8 pointer-events-none">
                       <h3 className="text-white text-3xl font-pearl mix-blend-difference">{project.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
      </section>
    </>
  );
}
