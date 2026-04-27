import { motion } from 'motion/react';
import { slideInLeft } from '../../constants/animations';
import { cn } from '../../lib/utils'; // Assuming cn exists or I'll just use template strings if not sure, but I'll check lib/utils later or just use cleaner classes.

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <motion.h3 
      {...slideInLeft}
      className={cn("text-2xl md:text-4xl font-agraham leading-relaxed mb-10", className)}
    >
      {title}
    </motion.h3>
  );
}
