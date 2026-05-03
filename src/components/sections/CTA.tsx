import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 md:py-48 relative overflow-hidden bg-bg">
      {/* --- PREMIUM BACKGROUND SYSTEM --- */}
      
      {/* 1. Glowing High (Top Accent) */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"
      />

      {/* 2. Glowing Low (Bottom Purple) */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 left-1/4 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* 3. Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} 
      />

      {/* 4. Original Decorative Elements (Refined) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="font-sugopro tracking-[0.3em] text-accent text-xs md:text-sm uppercase bg-accent/5 px-6 py-2 rounded-full border border-accent/10">
              AVAILABLE FOR NEW PROJECTS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-Advercase text-white leading-tight mb-12 max-w-4xl"
          >
            LET'S CRAFT SOMETHING <span className="text-white/40 italic">EXTRAORDINARY</span> TOGETHER
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <a 
              href="mailto:rakeshkanna0108@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-sugopro tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-500"
            >
              <Mail className="w-5 h-5" />
              GET IN TOUCH
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="/links"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white/60 rounded-full font-sugopro tracking-widest text-sm hover:bg-white/10 hover:text-white transition-all duration-500"
            >
              SOCIAL LINKS
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-white/30 font-roboto text-xs md:text-sm tracking-widest uppercase"
          >
            OR DROP A MAIL AT <span className="text-white/60 border-b border-white/20 pb-0.5 ml-1">RAKESHKANNA0108@GMAIL.COM</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
