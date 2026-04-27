import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { BlurText } from "../ui/BlurTextProps";

// interface CharProps {
//   children: string;
//   progress: MotionValue<number>;
//   range: [number, number];
//   key?: React.Key;
// }

// function Char({ children, progress, range }: CharProps) {
//   const opacity = useTransform(progress, range, [0.1, 1]); // Start slightly visible so they "ghost" in
//   const blurValue = useTransform(progress, range, [8, 0]);
//   const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

//   return (
//     <motion.span style={{ opacity, filter }} className="inline-block">
//       {children === " " ? "\u00A0" : children}
//     </motion.span>
//   );
// }

// interface ScrollRevealParagraphProps {
//   text: string;
//   className?: string;
// }

// function ScrollRevealParagraph({
//   text,
//   className,
// }: ScrollRevealParagraphProps) {
//   const container = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: container,
//     offset: ["start 0.8", "start 0.3"],
//   });

//   const words = text.split(" ");
//   let charCount = 0;
//   const totalChars = text.length;

//   return (
//     <p ref={container} className={className}>
//       {words.map((word, wordIndex) => {
//         const chars = word.split("");
//         const result = (
//           <span key={wordIndex} className="inline-block whitespace-nowrap">
//             {chars.map((char, i) => {
//               const step = 1 / totalChars;
//               const start = charCount * step;
//               const end = Math.min(start + 0.1, 1);
//               charCount++;
//               return (
//                 <Char key={i} progress={scrollYProgress} range={[start, end]}>
//                   {char}
//                 </Char>
//               );
//             })}
//             {wordIndex !== words.length - 1 && (
//               <Char
//                 progress={scrollYProgress}
//                 range={[
//                   charCount * (1 / totalChars),
//                   Math.min(charCount * (1 / totalChars) + 0.1, 1),
//                 ]}
//               >
//                 {" "}
//               </Char>
//             )}
//           </span>
//         );
//         if (wordIndex !== words.length - 1) charCount++; // Increment for the space we added
//         return result;
//       })}
//     </p>
//   );
// }

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

        <div className="space-y-16 w-full text-wrap">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-5xl font-pearl text-white/90"
          >
            I'm Rakesh Kanna
          </motion.h4>

          <BlurText
            text={para1}
            delay={30}
            animateBy="words"
            direction="top"
            className="text-xl md:text-2xl text-white/90 leading-relaxed whitespace-pre-line"
          />

          {/* <ScrollRevealParagraph 
            text={para1}
            className="font-roboto font-semibold text-xl md:text-2xl text-white/90 leading-relaxed"
          />

          <ScrollRevealParagraph 
            text={para2}
            className="font-roboto font-semibold text-xl md:text-2xl text-white/90 leading-relaxed"
          /> */}
        </div>
      </div>
    </section>
  );
}
