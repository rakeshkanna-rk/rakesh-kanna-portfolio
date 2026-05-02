import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase } from "lucide-react";
import { fadeInUp } from "../../constants/animations";
import { SectionHeader } from "../ui/SectionHeader";
import { TextReveal } from "../ui/TextReveal";
import { LightPillar } from "../ui/LightPillar";
import { experiences } from "../../data/about";

function ExperienceIcon({ src }: { src: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white/20" />;
  }

  const fullSrc = src.startsWith("http")
    ? src
    : `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${src.replace(/^\//, '')}`;

  return (
    <img
      src={fullSrc}
      alt=""
      className="w-full h-full object-contain"
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

  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-80%"]);

  // Progress line grows as we scroll through the track
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* LightPillar — truly full-screen, outside any padding */}
        <div
          className="absolute inset-0 pointer-events-none z-0 "
          aria-hidden="true"
        >
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1.1}
            rotationSpeed={0.9}
            glowAmount={0.004}
            pillarWidth={10}
            pillarHeight={1.6}
            noiseIntensity={0.8}
            pillarRotation={68}
            interactive={false}
            mixBlendMode="normal"
            quality="high"
          />
          {/* Top / bottom soft fades — Figma spec */}
          <div
            className="absolute inset-x-0 top-0 h-50 z-10"
            style={{
              background:
                "linear-gradient(180deg, #000000 13.37%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-50 z-10"
            style={{
              background:
                "linear-gradient(0deg, #000000 13.37%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>

        {/* Scrollable content — padded independently */}
        <div className="relative z-10 h-full w-full flex flex-col px-4 md:px-12">
          <div className="max-w-5xl mx-auto w-full grow flex items-start pt-16 md:pt-20 overflow-hidden">
            {/* Viewport for items - items translate within this container */}
            <div className="relative w-full h-[65vh] pl-10 sm:pl-[60px]">
              <motion.div style={{ y: contentY }} className="relative">
                {/* Title scrolls WITH the cards */}
                <div className="mb-10 ml-[-10px] sm:ml-[-14px]">
                  <SectionHeader title="My Journey" />
                </div>

                {/* Static Timeline Base */}
                <div className="absolute left-[-26px] sm:left-[-30px] top-[120px] bottom-0 w-[4px] bg-white/10 rounded-full" />

                {/* Animated Progress Line */}
                <motion.div
                  className="absolute left-[-26px] sm:left-[-30px] top-[120px] w-[4px] rounded-full z-20"
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
                        className="absolute left-[-33px] sm:left-[-38px] top-10 w-[18px] h-[18px] rounded-full bg-[#111] border-2 border-white z-30"
                        whileInView={{
                          backgroundColor: "#00ffff",
                          borderColor: "#00ffff",
                          boxShadow: "0 0 20px #00ffff",
                          scale: 1.2,
                        }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: false, amount: 0.8 }}
                      />

                      {/* CARD */}
                      <motion.div {...fadeInUp} className="group w-full">
                        <div
                          className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
                            boxShadow:
                              "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                          }}
                        >
                          {/* Top accent bar */}
                          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

                          {/* Purple glow top-left */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(82,39,255,0.18),transparent_55%)] pointer-events-none" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_80%_100%,rgba(155,92,246,0.12),transparent_50%)] pointer-events-none" />

                          {/* Content */}
                          <div className="relative z-10 p-6 md:p-8">
                            {/* Header row */}
                            <div className="flex md:items-center gap-4 mb-5 md:flex-row flex-col ">
                              {/* Company logo */}
                              <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden backdrop-blur-sm">
                                <ExperienceIcon src={exp.icon} />
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Role */}
                                <h4 className="text-white text-lg md:text-2xl font-advercase leading-tight mb-1">
                                  {exp.role}
                                </h4>
                                {/* Company + type badge */}
                                <div className="mt-3 flex items-center gap-2 flex-wrap">
                                  <span className="text-white/60 text-sm md:text-base font-medium">
                                    {exp.company}
                                  </span>
                                  <span className="px-2 py-1 rounded-full bg-accent font-bold border border-white/20 text-white/80 text-[11px] tracking-widest uppercase">
                                    {exp.type}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-linear-to-r from-white/10 via-white/5 to-transparent mb-5" />

                            {/* Description */}
                            <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 whitespace-pre-line">
                              {exp.description.join(" ")}
                            </p>

                            {/* Footer pills */}
                            <div className="flex flex-wrap gap-2">
                              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/80 text-xs font-roboto">
                                <span>🗓️</span>
                                {exp.period}
                              </span>
                              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/80 text-xs font-roboto">
                                <span>📍</span>
                                {`${exp.location} • ${exp.workType}`}
                              </span>
                            </div>
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
        {/* end content wrapper */}
      </div>
      {/* end sticky */}
    </div>
  );
}
