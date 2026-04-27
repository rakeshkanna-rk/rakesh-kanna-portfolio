import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';

const posters = [
  {
    id: 1,
    title: "VIBRANCE",
    image: "/images/image1.png",
    category: "POSTER DESIGN"
  },
  {
    id: 2,
    title: "NEON NIGHTS",
    image: "/images/image2.png",
    category: "DIGITAL ART"
  },
  {
    id: 3,
    title: "MINIMALISM",
    image: "/images/image3.png",
    category: "BRANDING"
  },
  {
    id: 4,
    title: "CONCRETE",
    image: "/images/image2.png",
    category: "POSTER DESIGN"
  },
  {
    id: 5,
    title: "FUTURISM",
    image: "/images/image3.png",
    category: "EXPERIMENTAL"
  },
  {
    id: 6,
    title: "RETRO GRADE",
    image: "/images/image1.png",
    category: "POSTER DESIGN"
  }
];

interface PostersProps {
  isWorkPage?: boolean;
  limit?: number;
}

export function Posters({ isWorkPage = false, limit }: PostersProps) {
  const displayedPosters = limit ? posters.slice(0, limit) : posters;

  return (
    <section className="py-32 px-2 md:px-20 bg-bg relative z-10 overflow-hidden">
      <SectionHeader title="Design & Posters" className="mb-20" />
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
        {displayedPosters.map((poster, index) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.05 }}
            transition={{ 
              duration: 1.2,
              ease: [0.19, 1, 0.22, 1] 
            }}
            className="group relative"
          >
            <motion.div 
              transition={{ duration: 0.4 }}
              className="relative aspect-[3/4.2] overflow-hidden rounded-[10px] bg-white/5 border border-white/10 hover:border-[#33007E] hover:border-2"
            >
              <motion.img 
                src={poster.image} 
                alt={poster.title}
                transition={{ duration: 0.8 }}
                className="h-full w-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Reveal text on hover/active */}
            <div className="mt-4 md:mt-6 flex justify-between items-end px-1">
              <div>
                <h3 className="text-white font-Advercase text-lg md:text-2xl group-hover:text-accent transition-colors duration-300">
                  {poster.title}
                </h3>
                <p className="text-white/30 text-[8px] md:text-[10px] font-sugopro tracking-[0.2em] uppercase mt-0.5 md:mt-1">
                  {poster.category}
                </p>
              </div>
              <div className="text-white/10 text-2xl md:text-4xl font-tanpearl group-hover:text-accent/20 transition-colors duration-500">
                0{index + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {!isWorkPage && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <button className="px-8 py-3 rounded-full border border-white/20 text-white/60 font-sugopro tracking-wider hover:bg-white hover:text-black transition-all duration-300">
            EXPLORE MORE DESIGN
          </button>
        </motion.div>
      )}
    </section>
  );
}
