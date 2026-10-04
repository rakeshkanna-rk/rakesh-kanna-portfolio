import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { brands, BrandItem } from "../../data/brands";

/* ─── Inline Markdown & Rich Text Renderer ──────────────────── */
function parseInline(text: string): React.ReactNode[] {
  // Regex to match:
  // 1. Linked Image: [![alt](imgUrl)](href)
  // 2. Regular Image: ![alt](imgUrl)
  // 3. Regular Link: [text](href)
  // 4. Bold: **bold**
  const regex = /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[1] !== undefined && match[2] !== undefined && match[3] !== undefined) {
      // Linked image: [![alt](imgUrl)](href)
      const alt = match[1];
      const imgSrc = match[2].replace(/\\&/g, "&");
      const href = match[3];
      elements.push(
        <a
          key={`imglink-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-white text-xs font-medium mr-2 mb-2"
        >
          <img src={imgSrc} alt={alt} className="w-4 h-4 object-contain inline-block" />
          <span className="capitalize">{alt || "Link"}</span>
        </a>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // Standalone Image: ![alt](imgUrl)
      const alt = match[4];
      const imgSrc = match[5].replace(/\\&/g, "&");
      elements.push(
        <img
          key={`img-${match.index}`}
          src={imgSrc}
          alt={alt}
          className="max-h-24 max-w-full rounded object-contain inline-block my-2"
        />
      );
    } else if (match[6] !== undefined && match[7] !== undefined) {
      // Standalone Link: [text](href)
      elements.push(
        <a
          key={`link-${match.index}`}
          href={match[7]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white font-medium"
        >
          {match[6]}
        </a>
      );
    } else if (match[8] !== undefined) {
      // Bold: **text**
      elements.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-white">
          {match[8]}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

function renderMd(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={`${keyPrefix}-list`} className="space-y-2 mb-5">
        {listBuffer.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-white text-sm sm:text-base leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span className="flex-1">{parseInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList(`empty-${idx}`);
      return;
    }

    if (line.startsWith("## ")) {
      flushList(`h2-${idx}`);
      nodes.push(
        <h2 key={`h2-${idx}`} className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-6 mb-2 first:mt-0">
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList(`h1-${idx}`);
      nodes.push(
        <h1 key={`h1-${idx}`} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-6 mb-2 first:mt-0">
          {parseInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith("### ")) {
      flushList(`h3-${idx}`);
      nodes.push(
        <h3 key={`h3-${idx}`} className="text-lg sm:text-xl font-semibold text-white tracking-wide mt-4 mb-2">
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listBuffer.push(line.slice(2));
    } else {
      flushList(`p-${idx}`);
      // Handle badge/social rows or standard paragraphs
      const isSocialBadgeRow = line.includes("[![");
      nodes.push(
        <div
          key={`p-${idx}`}
          className={
            isSocialBadgeRow
              ? "flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10"
              : "text-white text-sm sm:text-base leading-relaxed mb-4"
          }
        >
          {parseInline(line)}
        </div>
      );
    }
  });

  flushList("final");
  return nodes;
}

/* ─── Modal Dialog Component ─────────────────────────────────── */
function BrandDialog({ brand, onClose }: { brand: BrandItem; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lenis = useLenis();

  // Stop Lenis smooth scroll and lock background page scroll while dialog is open
  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [lenis]);

  // Fetch markdown content
  useEffect(() => {
    if (!brand.markdown) {
      setLoading(false);
      return;
    }
    const cleanPath = brand.markdown.replace(/^\//, "");
    const url = `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${cleanPath}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent(null);
        setLoading(false);
      });
  }, [brand]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const modalNode = (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-9999 flex items-center justify-center p-1 sm:p-6 overflow-hidden"
    >
      {/* Backdrop with touch & wheel lock */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md touch-none"
        onClick={onClose}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* 98% Mobile Width / 95% Desktop Width & 95% Height Modal Box */}
      <motion.div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-[98%] sm:w-[95%] h-[95%] max-w-4xl max-h-[95vh] bg-[#0c0a14] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col"
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-white/10 shrink-0 bg-white/2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <p className="text-white font-bold text-base sm:text-xl tracking-wide">{brand.name}</p>
            {brand.role && (
              <span className="text-white/60 text-xs sm:text-sm font-medium border-l border-white/20 pl-2.5 sm:pl-3">
                {brand.role}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="overflow-y-auto overscroll-contain flex-1 px-4 sm:px-8 py-5 sm:py-6 text-white touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {loading && (
            <div className="space-y-4 animate-pulse pt-4">
              <div className="h-6 w-1/3 bg-white/15 rounded" />
              <div className="h-4 w-1/4 bg-white/10 rounded" />
              <div className="h-20 w-full bg-white/5 rounded mt-4" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
              <div className="h-4 w-4/6 bg-white/10 rounded" />
            </div>
          )}

          {!loading && content && renderMd(content)}

          {!loading && !content && (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-white text-base">Unable to load contribution file.</p>
              <p className="text-white/60 text-xs mt-1">Please ensure the database repository is up to date.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : null;
}

/* ─── Logo Image ────────────────────────────────────────────── */
function BrandLogoImage({ src, alt, name }: { src: string; alt: string; name: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <span className="font-pearl text-xl md:text-2xl text-white group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    );
  }

  const fullSrc = src.startsWith("http")
    ? src
    : `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${src.replace(/^\//, "")}`;

  return (
    <img
      src={fullSrc}
      alt={alt}
      className="max-h-16 md:max-h-24 max-w-35 md:max-w-50 w-auto h-auto object-contain brightness-90 opacity-75 group-hover:opacity-100 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300 pointer-events-none select-none"
      onError={() => setError(true)}
    />
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function Brands() {
  const [selected, setSelected] = useState<BrandItem | null>(null);

  const close = useCallback(() => setSelected(null), []);

  if (!brands || brands.length === 0) return null;

  return (
    <div className="mt-16 md:mt-24">
      <div className="mb-6">
        <SectionHeader title="Brands & Partners" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-2 md:grid-cols-4"
      >
        {brands.map((brand: BrandItem, index: number) => (
          <motion.div
            key={brand.id || index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
            }}
            onClick={() => setSelected(brand)}
            className="group relative flex items-center justify-center h-28 md:h-40 glass hover:bg-white/10 transition-colors duration-300 overflow-hidden cursor-pointer"
          >
            {/* Subtle accent glow on hover */}
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/8 transition-colors duration-300 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-center">
              <BrandLogoImage src={brand.logo} alt={brand.name} name={brand.name} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <BrandDialog brand={selected} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
