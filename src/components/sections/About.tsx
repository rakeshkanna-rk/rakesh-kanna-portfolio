import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { BlurText } from "../ui/BlurTextProps";
import { aboutText } from "../../data/about";

export function About() {

  return (
    <section className="relative pt-28 pb-20 px-4 md:px-12 z-10 overflow-visible">
      {/* Grid Background at the top of About */}
      <div
        className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/gird-background.svg")',
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-5xl">
        <SectionHeader title="The Mind Behind the Work" />

        <div className="space-y-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex items-center gap-4 md:gap-6"
          >
            <h4 className="text-2xl md:text-4xl font-pearl text-white tracking-tight">
              I'm Rakesh Kanna
            </h4>
          </motion.div>

          <div className="whitespace-pre-line">
            <BlurText
              text={aboutText}
              delay={40}
              animateBy="words"
              direction="top"
              className="text-lg md:text-2xl text-white/70 leading-relaxed font-light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
