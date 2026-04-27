import { motion } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.025,
}: TextRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      rotateX: -90,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 14,
        mass: 0.7,
      },
    },
  };

  return (
    <motion.span
      className={`inline perspective-[1000px] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block origin-bottom"
              style={{ transformStyle: "preserve-3d" }}
              variants={childVariants}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a non-breaking space after each word except the last one to allow standard wrapping */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}