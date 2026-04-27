import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { BlurText } from "../ui/BlurTextProps";

export function About() {
  const para1 = `I design digital experiences with a strong focus on clarity, visual consistency, and how things feel in use. My work is rooted in UI/UX and brand thinking, where every interface is shaped to be simple, structured, and easy to navigate. I pay close attention to spacing, typography, and visual rhythm to make sure each product feels cohesive from end to end.

  I work closely with early-stage ideas and growing products, shaping both the interface and the brand as they evolve. From defining visual direction to building scalable design systems, I focus on creating work that holds together across screens and touchpoints. Currently, I lead design and brand experience at Mergex, where I handle the overall direction of product design and ensure consistency across everything we build.`;

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

          <div className="">
            <BlurText
              text={para1}
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
