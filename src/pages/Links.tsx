import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Footer } from "../components/layout/Footer";
import { fadeInUp } from "../constants/animations";
import {
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  Github,
} from "lucide-react";
import { Threads } from "../components/ui/Threads";

const links = [
  {
    title: "Instagram",
    subtitle: "Daily design inspiration and process",
    url: "https://instagram.com",
    icon: <Instagram className="w-5 h-5" />,
    color: "group-hover:text-pink-500",
  },
  {
    title: "LinkedIn",
    subtitle: "Professional network and case studies",
    url: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />,
    color: "group-hover:text-blue-500",
  },
  {
    title: "Twitter / X",
    subtitle: "Design thoughts and quick updates",
    url: "https://twitter.com",
    icon: <Twitter className="w-5 h-5" />,
    color: "group-hover:text-blue-400",
  },
  {
    title: "GitHub",
    subtitle: "Open source projects and experiments",
    url: "https://github.com",
    icon: <Github className="w-5 h-5" />,
    color: "group-hover:text-gray-400",
  },
  {
    title: "Personal Website",
    subtitle: "Back to home",
    url: "/",
    icon: <Globe className="w-5 h-5" />,
    color: "group-hover:text-accent",
  },
];

export function Links() {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-bg relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Threads color={[1, 1, 1]} amplitude={2} distance={0.6} enableMouseInteraction />
      </div>
      <div className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 md:px-0">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full border-2 border-accent/30 p-1 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src="/profile.png"
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

        <div className="flex flex-col gap-4 pb-24">
          {links.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeInUp}
              transition={{ delay: index * 0.05 }}
              className="group relative flex items-center p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:border-white/20 hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-colors duration-300 ${link.color}`}
              >
                {link.icon}
              </div>
              <div className="ml-5 flex-1">
                <h3 className="text-white font-sugopro text-sm md:text-base tracking-widest group-hover:text-white transition-colors">
                  {link.title}
                </h3>
                <p className="text-white/40 text-[11px] md:text-xs font-roboto mt-0.5">
                  {link.subtitle}
                </p>
              </div>
              <div className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all">
                →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
