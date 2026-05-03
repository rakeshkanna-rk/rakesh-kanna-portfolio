import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FuzzyText from "../components/ui/FuzzyText";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="mb-8">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            fuzzRange={20}
            enableHover={true}
          >
            404
          </FuzzyText>
        </div>

        <h1 className="text-4xl md:text-6xl font-Advercase text-white mb-6">
          Lost in Space?
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-md mb-12 font-roboto leading-relaxed">
          The page you're looking for has drifted into another dimension. Let's
          get you back home.
        </p>

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-sugopro tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-500 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          GO BACK HOME
        </button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
