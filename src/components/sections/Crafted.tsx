import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/work';

interface CraftedProps {
  isWorkPage?: boolean;
  limit?: number;
}

export function Crafted({ isWorkPage = false, limit }: CraftedProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate exact move distance in pixels for perfectly linear scroll
  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth * 0.95 : windowWidth * 0.7;
  const gap = 48; // 3rem (gap-12)
  const totalMove = (projects.length - 1) * (cardWidth + gap);

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalMove]);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  };

  return (
    <section 
      ref={targetRef} 
      className={`relative mt-24 ${isWorkPage ? 'h-auto pb-20' : (isMobile ? 'h-auto pb-20' : 'h-[600vh]')}`}
    >
      <div className={`${isWorkPage || isMobile ? 'relative' : 'sticky top-0 h-screen flex flex-col justify-center'} p-0 md:p-[30px] pt-12 md:pt-0`}>
        <div className="w-full max-w-7xl mx-auto">
          <SectionHeader title="Dive Into My Work" className="mb-8 md:mb-12 px-6 md:px-0" />
          
          <motion.div 
            style={{ x: isWorkPage || isMobile ? 0 : x }} 
            className={isWorkPage 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0' 
              : `flex ${isMobile 
                  ? 'flex-col gap-12 px-1 pb-20' 
                  : 'gap-12 items-center'
                }`}
          >
            {displayedProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={isWorkPage ? { opacity: 0, y: 50, scale: 0.95 } : { opacity: 0.8, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={isMobile ? undefined : handleMouseMove}
                onMouseEnter={() => !isMobile && setHoveredId(project.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                onClick={() => navigate(`/work/view-project/${project.id}`)}
                whileHover={isMobile ? { scale: 1.02 } : { scale: 1.05 }}
                className={`group relative h-auto ${isWorkPage ? 'w-full cursor-none' : (isMobile ? 'w-[98vw] sticky top-[15vh] cursor-pointer' : 'w-[70vw] shrink-0 cursor-none')} overflow-hidden rounded-[20px] md:rounded-[30px] transition-all duration-300 hover:shadow-[0_0_50px_#33007E]`}
              >
                <div className="border border-white/80 rounded-[20px] md:rounded-[30px] overflow-hidden">
                  {/* Per-Project Cursor - Only for Desktop */}
                  {!isMobile && (
                    <motion.div 
                      style={{ 
                        x: cursorX, 
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%" 
                      }}
                      className={`md:flex hidden pointer-events-none absolute z-50 font-sugopro tracking-wider px-5 py-2 items-center justify-center gap-2 rounded-full bg-accent text-white shadow-2xl group-hover:scale-110 transition-opacity duration-300 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.title}
                    </motion.div>
                  )}
                  
                  {/* Mobile Image */}
                  <img 
                    src={`https://rakeshkanna-rk.github.io/database/new_portfolio/${(Array.isArray(project.image) ? project.image[0] : project.image).replace(/\.(\w+)$/, '_mobi.$1').replace(/^\//, '')}`} 
                    alt={project.title}
                    className="relative h-auto w-full object-contain block md:hidden"
                    referrerPolicy="no-referrer"
                  />
                  {/* Desktop Image */}
                  <img 
                    src={`https://rakeshkanna-rk.github.io/database/new_portfolio/${(Array.isArray(project.image) ? project.image[0] : project.image).replace(/^\//, '')}`} 
                    alt={project.title}
                    className="relative h-auto w-full object-contain hidden md:block"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
            
            {/* CTA Card - Only show in Home */}
            {!isWorkPage && (
              <div className={`group relative h-auto ${isMobile ? 'w-[98vw] sticky top-[15vh]' : 'w-[70vw] shrink-0'} border border-dashed border-white/20 rounded-[20px] md:rounded-[30px] flex flex-col items-center justify-center text-center p-12 bg-white/2 backdrop-blur-sm aspect-video md:aspect-auto md:h-[70vh]`}>
                 <motion.h4 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   className="text-lg md:text-2xl font-agraham text-white/40 italic mb-8"
                 >
                   Ready for the next forge?
                 </motion.h4>
              </div>
            )}
          </motion.div>

          {!isWorkPage && (
            <motion.button 
              whileHover={{ x: 10 }}
              onClick={() => window.location.href = "/work"}
              className="cursor-pointer flex items-start justify-start gap-2 text-xl font-pearl text-white/70 hover:text-white mt-8 md:mt-12 px-[30px] md:px-[10px] w-fit leading-normal"
            >
              View my forge <img src="/icons/arrow-right.svg" className="w-auto h-6" alt="arrow"/>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
