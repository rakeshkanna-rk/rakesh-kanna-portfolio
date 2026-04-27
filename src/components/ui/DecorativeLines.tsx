import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function DecorativeLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We want the animation to happen as the component enters and moves through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform gap from 15px to 30px based on scroll
  const gap = useTransform(scrollYProgress, [0, 0.5, 1], ["15px", "30px", "45px"]);

  const lineHeights = [10, 7, 5, 2.5];

  return (
    <motion.div 
      ref={containerRef}
      style={{ gap }}
      className="flex flex-col w-full bg-black py-4"
    >
      {lineHeights.map((height, i) => (
        <div 
          key={i} 
          style={{ height: `${height}px` }}
          className="w-full bg-accent leading-185" 
        />
      ))}
    </motion.div>
  );
}
