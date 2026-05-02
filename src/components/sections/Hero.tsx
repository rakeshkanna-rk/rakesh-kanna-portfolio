import { motion, scale, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const profileY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const designerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative h-[80vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image for glow effects - Centered */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/herobackground.avif" 
          className="w-full h-full object-fit object-center opacity-40 md:opacity-50" 
          alt="Background Glow"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Big Background Image: RAKESH SVG (Top) - Full Width Impact */}
      <motion.div 
        id="hero-title-container" 
        style={{ y: nameY }}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="p-[10px] md:p-[30px] absolute top-0 left-0 w-full z-10 select-none pointer-events-none"
      >
        <img 
          src="/name.svg" 
          alt="Rakesh Name Logo" 
          className="w-full h-auto object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      {/* Profile Image Overlay (Centered) - Spanning bottom to top */}
      <motion.div 
        id="hero-profile-container"
        style={{ y: profileY }}
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none"
      >
        <picture className="contents">
          <source media="(max-width: 767px)" srcSet="/mobi-profile.png" />
          <img 
            id="hero-profile-img"
            src="/profile.png" 
            alt="Rakesh Kanna Portrait" 
            className="h-[85vh] md:h-full w-auto object-contain object-bottom scale-110 md:scale-100 origin-bottom"
            referrerPolicy="no-referrer"
          />
        </picture>
      </motion.div>

       {/* Bottom Text: DESIGNER (Small, Left Bottom) - Positioned with 30px offset */}
       <motion.div 
         id="hero-subtitle-container" 
         style={{ y: designerY }}
         className="absolute bottom-[40px] left-[10px] md:bottom-[30px] md:left-[30px] z-30"
       >
         <motion.h2 
           id="hero-lastname"
           initial={{ x: -200 }}
           animate={{ x: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
           className="text-4xl md:text-6xl font-pearl text-white leading-normal uppercase"
         >
          DESIGNER
        </motion.h2>
      </motion.div>
    </section>
  );
}
