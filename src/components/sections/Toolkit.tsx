import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Code2 as Code, Layers, Terminal, Palette, Layout } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../constants/animations';
import { SectionHeader } from '../ui/SectionHeader';

const tools = [
  { icon: <Database />, name: "MySQL", color: "text-blue-600" },
  { icon: <Code />, name: "Node.js", color: "text-green-600" },
  { icon: <Database />, name: "MySQL", color: "text-blue-600" },
  { icon: <Layers />, name: "VN", color: "text-gray-800" },
  { icon: <Terminal />, name: "PyCharm", color: "text-green-700" },
  { icon: <Database />, name: "MySQL", color: "text-blue-600" },
  { icon: <Code />, name: "VS Code", color: "text-blue-500" },
  { icon: <Palette />, name: "Vue", color: "text-emerald-500" },
  { icon: <Terminal />, name: "Python", color: "text-yellow-600" },
  { icon: <Code />, name: "Node.js", color: "text-green-600" },
  { icon: <Code />, name: "VS Code", color: "text-blue-500" },
  { icon: <Terminal />, name: "Python", color: "text-yellow-600" },
  { icon: <Layers />, name: "VN", color: "text-gray-800" },
  { icon: <Terminal />, name: "Python", color: "text-yellow-600" },
  { icon: <Code />, name: "VS Code", color: "text-blue-500" },
  { icon: <Code />, name: "Node.js", color: "text-green-600" }
];

export function Toolkit() {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  const tooltipVariants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    hover: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    }
  };

  return (
    <section className="py-32 px-4 md:px-12 relative isolate">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] -z-10 pointer-events-none">
        <img src="/paste-bg.svg" className="w-full h-full blur-[50px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="My Toolkit" />

        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.05 }}
          className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8 justify-items-center mt-10"
        >
          {tools.map((tool, index) => (
            <motion.div 
              key={`${tool.name}-${index}`}
              variants={containerVariants}
              whileHover="hover"
              className="relative flex flex-col items-center cursor-pointer z-10"
            >
              {/* Tooltip Name */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                variants={{
                  hover: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }
                }}
                className="absolute bottom-full mb-4 pointer-events-none z-30"
              >
                <div className="bg-orange-500/20 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(249,115,22,0.2)] relative whitespace-nowrap border border-orange-500/30">
                  <span className="text-orange-500 font-roboto text-sm md:text-base font-bold tracking-tight">
                    {tool.name}
                  </span>
                </div>
              </motion.div>

              {/* Icon Container */}
              <motion.div
                variants={{
                  hover: { 
                    scale: 1.05,
                    boxShadow: "0px 0px 40px 0px rgba(255, 255, 255, 0.4)",
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }
                }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center p-4 transition-all duration-300"
              >
                <div className="shrink-0 flex items-center justify-center pointer-events-none">
                  {React.cloneElement(tool.icon as React.ReactElement, { 
                    className: `w-6 h-6 md:w-8 md:h-8 ${tool.color} stroke-[2.5px]` 
                  })}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
