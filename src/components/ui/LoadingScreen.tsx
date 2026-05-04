import { useState, useEffect } from "react";
import { motion } from "motion/react";

const IMAGES_TO_PRELOAD = [
  "/herobackground.avif",
  "/mobi-profile.png",
  "/profile.png",
  "/name.svg"
];

export function LoadingScreen({ onFinished }: { onFinished: () => void; key?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; 
      });
    };

    const startTime = Date.now();
    
    Promise.all(IMAGES_TO_PRELOAD.map(src => preloadImage(src))).then(() => {
      const elapsedTime = Date.now() - startTime;
      const minimumTime = 1500; 
      
      const remainingTime = Math.max(0, minimumTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(onFinished, 600); // Wait for fade-out
      }, remainingTime);
    });
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-9999 bg-bg flex items-center justify-center overflow-hidden"
    >
      <div className="flex font-sugopro text-4xl md:text-9xl tracking-widest select-none pointer-events-none">
        <motion.span
          animate={{ 
            opacity: isLoaded ? 0 : 1
          }}
          className="text-white"
        >
          R
        </motion.span>
        <motion.span
          animate={{ 
            opacity: isLoaded ? 0 : [0.5, 1]
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-white"
        >
          AKESH KANNA
        </motion.span>
      </div>

      {/* Subtle Background Mesh/Glow for depth */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/3 blur-[120px]" />
      </div>
    </motion.div>
  );
}
