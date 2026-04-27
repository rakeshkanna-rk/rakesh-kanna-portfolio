import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase } from "lucide-react";
import { fadeInUp } from "../../constants/animations";
import { SectionHeader } from "../ui/SectionHeader";
import { TextReveal } from "../ui/TextReveal";

const experiences = [
  {
    role: "Graphics Designer & Web Designer",
    company: "Runverve",
    type: "Internship",
    description: [
      "Designed pitch decks, standees, print materials, and responsive websites using Wix for a sports-tech startup incubated at IITM.",
      "Supported branding and marketing efforts through creative visual assets.",
    ],
    period: "Feb 2025 – Jun 2025",
    location: "Tamil Nadu, India",
    workType: "Remote",
    icon: "https://api.indieground.net/v1/assets/logo.png",
  },
  {
    role: "Head of Design and Experience",
    company: "MergeX",
    type: "Full Time",
    description: [
      "Designed pitch decks, standees, print materials, and responsive websites using Wix for a sports-tech startup incubated at IITM.",
      "Supported branding and marketing efforts through creative visual assets.",
    ],
    period: "Feb 2025 – Jun 2025",
    location: "Tamil Nadu, India",
    workType: "Remote",
    icon: "/mergex_logo.svg",
  },
];

function ExperienceIcon({ src }: { src: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white/20" />;
  }

  return (
    <img
      src={src}
      alt=""
      className="w-full h-full object-contain grayscale invert opacity-80"
      onError={() => setError(true)}
    />
  );
}

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the vertical track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Shift the timeline content up as we scroll through the track
  // For 2 items, -40% to -50% keeps them well-positioned as they pass
  const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"]);
  
  // Progress line grows as we scroll through the track
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-visible px-2 md:px-12 flex-col">
        {/* Background Layer with opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.1) 17.79%, rgba(0, 0, 0, 0) 50.48%, rgba(0, 0, 0, 0.1) 80.77%, #000000 100%), url('/my-journey.webp')`
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl relative z-10 mx-auto w-full grow overflow-visible flex items-center">
          {/* Viewport for items - items translate within this container */}
          <div className="relative w-full h-[70vh] pl-10 sm:pl-[60px]">
            <motion.div style={{ y: contentY }} className="relative">
              {/* Static Timeline Base */}
              <div className="absolute left-[-26px] sm:left-[-30px] top-0 bottom-0 w-[4px] bg-white/10 rounded-full" />

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-[-26px] sm:left-[-30px] top-0 w-[4px] rounded-full z-20"
                style={{
                  height: lineHeight,
                  background:
                    "linear-gradient(to bottom, #00ffff 0%, #6366f1 50%, #ff00ff 100%)",
                  boxShadow: "0 0 20px rgba(0,255,255,0.7)",
                }}
              />

              <div className="space-y-32 pb-20">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Circle Marker */}
                    <motion.div
                      className="absolute left-[-33px] sm:left-[-38px] top-12 w-[18px] h-[18px] rounded-full bg-[#111] border-2 border-white z-30 flex items-center justify-center transition-all duration-500"
                      whileInView={{
                        backgroundColor: "#00ffff",
                        borderColor: "#00ffff",
                        boxShadow: "0 0 20px #00ffff",
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: false, amount: 0.8 }}
                    />

                    {/* Replace ONLY your card block inside map() with this improved version */}
                    <motion.div {...fadeInUp} className="relative group w-full">
                      {/* OUTER BORDER SHAPE WITH CUT CORNER */}
                      <div
                        className="relative p-[4px]"
                        style={{
                          clipPath:
                            "polygon(0 0,100% 0,100% calc(100% - 56px),calc(100% - 56px) 100%,0 100%)",
                          borderRadius: "24px",
                          background:
                            "linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))",
                        }}
                      >
                        {/* INNER CARD */}
                        <div
                          className="relative bg-[#040007]"
                          style={{
                            clipPath:
                              "polygon(0 0,100% 0,100% calc(100% - 56px),calc(100% - 56px) 100%,0 100%)",
                            borderRadius: "22px",
                          }}
                        >
                          {/* Top left purple glow */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,0,255,0.20),transparent_42%)] pointer-events-none" />

                          {/* Inner soft border */}
                          <div className="absolute inset-px border border-white/10 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),calc(100%-56px)_100%,0_100%)]" />

                          {/* CONTENT */}
                          <div className="relative z-10 px-5 py-6 md:px-10 md:py-9">
                            <div className="flex flex-col gap-5 md:gap-7">
                              {/* Header */}
                              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-5">
                                  <div className="hidden md:flex w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 items-center justify-center shrink-0 overflow-hidden">
                                    <ExperienceIcon src={exp.icon} />
                                  </div>

                                <div className="flex-1">
                                  <h4 className="hidden md:block text-white text-xl md:text-[30px] leading-tight md:leading-none font-advercase">
                                    <TextReveal text={exp.role} />
                                  </h4>

                                  <p className="hidden md:block text-white/85 text-base md:text-[20px] mt-2 md:mt-3 font-medium">
                                    <TextReveal text={`${exp.company} • ${exp.type}`} delay={0.2} />
                                  </p>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-white/75 text-base md:text-[20px] leading-relaxed max-w-[96%]">
                                <TextReveal text={exp.description.join(" ")} delay={0.4} stagger={0.01} />
                              </p>

                              {/* Footer */}
                              <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-3 text-white/65 text-sm md:text-lg">
                                <div className="flex items-center gap-3">
                                  <span>🗓️</span>
                                  <TextReveal text={exp.period} delay={0.6} />
                                </div>

                                <div className="flex items-center gap-3">
                                  <span>📍</span>
                                  <TextReveal text={`${exp.location} • ${exp.workType}`} delay={0.7} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover glow */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-tr from-cyan-400/5 via-purple-500/5 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}