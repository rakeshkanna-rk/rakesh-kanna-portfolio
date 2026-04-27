import React from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { DotGrid } from "../ui/DotGrid";
import {TextReveal} from "../ui/TextReveal";


/* ─── Tool data ─────────────────────────────────────────── */
const tools = [
  { name: "Figma",      img: "/icons/tools/figma.svg" },
  { name: "Framer",     img: "/icons/tools/framer.svg" },
  { name: "Photoshop",  img: "/icons/tools/photoshop.svg" },
  { name: "Illustrator",img: "/icons/tools/illustrator.svg" },
  { name: "After FX",   img: "/icons/tools/aftereffects.svg" },
  { name: "Notion",     img: "/icons/tools/notion.svg" },
  { name: "VS Code",    img: "/icons/tools/vscode.svg" },
  { name: "React",      img: "/icons/tools/react.svg" },
  { name: "Tailwind",   img: "/icons/tools/tailwind.svg" },
  { name: "Node.js",    img: "/icons/tools/nodejs.svg" },
  { name: "Python",     img: "/icons/tools/python.svg" },
  { name: "Git",        img: "/icons/tools/git.svg" },
];

/* ─── Skills data ────────────────────────────────────────── */
const skills = [
  {
    category: "Design",
    items: ["UI/UX Design", "Brand Identity", "Motion & Animation", "Design Systems", "Prototyping", "Visual Direction", "Typography"],
  },
  {
    category: "Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "REST APIs"],
  },
  {
    category: "Process",
    items: ["Creative Direction", "User Research", "Product Strategy", "Design Thinking", "Team Collaboration", "Wireframing"],
  },
];

/* ─── Component ──────────────────────────────────────────── */
export function Toolkit() {
  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden my-20">
      <div className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-bg to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-bg to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-bg to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-bg to-transparent z-10" />
      {/* DotGrid background — absolutely fills the section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={6}
          gap={22}
          baseColor="#1e1a2e"
          activeColor="#5227FF"
          proximity={230}
          shockRadius={360}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="p-0! h-full"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── MY TOOLKIT ───────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader title="My Toolkit" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-5 md:gap-6 justify-items-center mt-10"
        >
          {tools.map((tool, i) => (
            <motion.div
              key={`${tool.name}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.92 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
              }}
              whileHover="hover"
              className="relative flex flex-col items-center cursor-pointer group"
            >
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                variants={{
                  hover: {
                    opacity: 1, y: 0, scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  },
                }}
                className="absolute bottom-full mb-3 pointer-events-none z-30 whitespace-nowrap"
              >
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                  <span className="text-white font-roboto text-xs font-semibold tracking-wide">
                    {tool.name}
                  </span>
                </div>
              </motion.div>

              {/* Icon box */}
              <motion.div
                variants={{
                  hover: {
                    scale: 1.08,
                    boxShadow: "0 0 30px rgba(82,39,255,0.5)",
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  },
                }}
                className="backdrop-blur-xs w-14 h-14 md:w-16 md:h-16 bg-white/5 border border-white/10 group-hover:border-accent/40 rounded-2xl flex items-center justify-center p-3 transition-colors duration-300"
              >
                <img
                  src={tool.img}
                  alt={tool.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // fallback: show first 2 letters if icon missing
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const span = document.createElement("span");
                    span.className = "text-white/60 text-xs font-bold font-roboto";
                    span.textContent = tool.name.slice(0, 2).toUpperCase();
                    e.currentTarget.parentElement!.appendChild(span);
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── SKILLS ───────────────────────────────────────── */}
        <div className="mt-28">
          <SectionHeader title="Skills" />

          <div className="mt-12 flex flex-col divide-y divide-white/10">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: gi * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 py-8"
              >
                {/* Category label */}
                <div className="flex items-start gap-4">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent ring-4 ring-accent/15 shrink-0" />
                  <span className="text-lg md:text-xl font-sugopro tracking-[0.2em] text-white/80 uppercase">
                    <TextReveal text={group.category} />
                  </span>
                </div>

                {/* Pill cloud */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                >
                  {group.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85, y: 10 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] } },
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(82, 39, 255, 0.5)",
                        boxShadow: "0 0 20px rgba(82, 39, 255, 0.2)",
                      }}
                      className="backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs md:text-sm font-roboto font-medium cursor-default select-none transition-all duration-300 hover:text-white"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
