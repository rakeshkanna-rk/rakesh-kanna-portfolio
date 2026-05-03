import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Footer } from "../components/layout/Footer";
import { fadeInUp } from "../constants/animations";
import { Threads } from "../components/ui/Threads";

interface LinkItem {
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  color: string;
}

const BASE_ICON_URL = "https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/links/";

export function Links() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch("https://raw.githubusercontent.com/rakeshkanna-rk/database/main/new_portfolio/links.json");
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
    
    document.title = "Links — Rakesh Kanna";
    return () => {
      document.title = "Rakesh Kanna — Product Designer & Developer";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-bg relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Threads
          color={[1, 1, 1]}
          amplitude={2}
          distance={0.6}
          enableMouseInteraction
        />
      </div>
      <div className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 md:px-0">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-35 h-35 rounded-full border-2 border-accent/30 p-1 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <img
                src="/link-profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <SectionHeader
            title="Connect with Me"
            className="flex justify-center"
          />
          <p className="text-white/50 font-roboto text-sm md:text-base mt-4 max-w-md mx-auto">
            Design Lead at Mergex. Building digital products with intent and
            visual clarity.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-24">
            {links.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="group relative flex items-center p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                style={{
                  '--hover-color': link.color
                } as any}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = link.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div
                  className="w-14 h-14 p-2 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 overflow-hidden shrink-0"
                >
                  <img 
                    src={`${BASE_ICON_URL}${link.icon}`} 
                    alt={link.title}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="ml-5 flex-1">
                  <h3 
                    className="text-white font-sugopro text-sm md:text-base tracking-widest transition-colors duration-300"
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = link.color}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  >
                    {link.title}
                  </h3>
                  <p className="text-white/40 text-[11px] md:text-xs font-roboto mt-0.5">
                    {link.subtitle}
                  </p>
                </div>
                <div 
                  className="text-white/20 group-hover:translate-x-1 transition-all"
                  style={{ color: 'inherit' }}
                >
                  →
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
