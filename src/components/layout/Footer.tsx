import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "HOME", url: "/" },
  { name: "WORK", url: "/work" },
  { name: "ABOUT", url: "/about" },
  { name: "BLOG", url: "/blog" },
  { name: "LINKS", url: "/links" },
];

const socialLinks = [
  {
    icon: <Instagram className="w-5 h-5" />,
    url: "https://instagram.com/rakesh_kanna.creates",
  },
  {
    icon: (
      <img
        src="https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/links/behance.svg"
        className="p-2 w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
        alt="Behance"
      />
    ),
    url: "https://behance.net/rakesh_kanna",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    url: "https://linkedin.com/in/rakeshkannas",
  },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.5, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative bg-bg pt-32 pb-12 overflow-hidden"
    >
      {/* Top Border with Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-accent/30 blur-sm" />

      {/* --- COOL BACKGROUND SYSTEM --- */}

      {/* 1. Soft Mesh Gradient System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-accent/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      {/* 2. Subtle Scanlines & Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 3px)`,
        }}
      />

      {/* 2. Dynamic Amorphous Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* 3. Parallax Name SVG (Bottom) */}
      <motion.div
        style={{ y, opacity }}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full px-4 flex justify-center pointer-events-none z-0"
      >
        <img
          src="/name.svg"
          alt="Rakesh Kanna"
          className="w-full max-w-7xl opacity-[0.1] select-none pointer-events-none grayscale contrast-125"
        />
      </motion.div>

      {/* 4. Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none contrast-150 brightness-150"
        style={{
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
        }}
      />

      {/* --- CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-32">
          {/* Left: Branding & Message */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-Advercase text-5xl md:text-7xl text-white mb-6 uppercase italic leading-[0.9]">
                RAKESH
                <br />
                KANNA
              </h2>
              <p className="text-white/40 font-roboto text-lg md:text-xl italic mb-10 max-w-sm leading-relaxed">
                Pioneering digital frontiers through intent, design & visual
                clarity.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle: Navigation */}
          <div className="md:col-span-3 pt-4">
            <h4 className="font-sugopro text-[10px] tracking-[0.4em] text-white/20 uppercase mb-10">
              Sitemap
            </h4>
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.url}
                    className="group flex items-center gap-2 font-Advercase text-2xl text-white/40 hover:text-white transition-all italic uppercase tracking-widest"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                      /
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Connect Card */}
          <div className="md:col-span-4 pt-4">
            <h4 className="font-sugopro text-[10px] tracking-[0.4em] text-white/20 uppercase mb-10">
              Contact
            </h4>

            <div className="mb-12">
              <span className="text-[10px] font-roboto tracking-widest text-white/20 uppercase block mb-4">
                REACH OUT
              </span>
              <a href="tel:+918754247760" className="inline-flex flex-col">
                <span className="group text-xl md:text-2xl font-bold text-white transition-colors">
                  +91 8754 247760
                </span>
              </a>
              <a
                href="mailto:rakeshkanna0108@gmail.com"
                className="inline-flex flex-col"
              >
                <span className="text-xl md:text-2xl font-bold text-white transition-colors">
                  rakeshkanna0108@gmail.com
                </span>
              </a>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-4xl bg-white/3 border border-white/10 backdrop-blur-xl relative overflow-hidden group cursor-default"
            >
              <span className="text-[10px] font-roboto tracking-widest text-white/30 uppercase block mb-6">
                CURRENT STATUS
              </span>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_#22c55e]" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-white font-Advercase text-xl italic tracking-wider">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] font-roboto tracking-[0.3em] text-white/10 uppercase">
          <div className="flex items-center gap-2">
            <span>© 2026 RAKESH KANNA</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>VISUAL ARTIST & DEV</span>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">
              EST. 2024
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS OF USE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
