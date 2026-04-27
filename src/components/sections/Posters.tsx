import React from 'react';
import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import {TextReveal} from '../ui/TextReveal';

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
    <section className="py-20 md:py-32 px-3 md:px-20 bg-bg relative z-10 overflow-hidden">
      <SectionHeader title="Design & Posters" className="mb-12 md:mb-20" />
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
        {displayedPosters.map((poster, index) => (
          <motion.div
            key={poster.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
              delay: index * 0.1
            }}
            whileHover={{ y: -10 }}
            className="group relative cursor-pointer"
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
            <div className="mt-6 flex justify-between items-start px-1">
              <div className="overflow-hidden">
                <h3 className="text-white font-Advercase text-lg md:text-2xl group-hover:text-accent transition-colors duration-500">
                  <TextReveal text={poster.title} />
                </h3>
                <p className="text-white/40 text-[9px] md:text-[11px] font-sugopro tracking-[0.25em] uppercase mt-1.5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/60">
                  {poster.category}
                </p>
              </div>
              <div className="relative">
                <span className="text-white/5 text-3xl md:text-5xl font-tanpearl transition-all duration-700 group-hover:text-accent group-hover:-translate-y-2 inline-block">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {!isWorkPage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <button onClick={() => window.location.href = "/work"} className="cursor-pointer group relative px-10 py-4 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-accent/50 hover:bg-white/10">
            <span className="relative z-10 text-white/70 font-sugopro text-sm tracking-[0.2em] group-hover:text-white transition-colors duration-300">
              EXPLORE FULL GALLERY
            </span>
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
