import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Award, X, Loader2 } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { LightPillar } from "../ui/LightPillar";
import { education, certifications } from "../../data/about";

/* ─── Icon helper ──────────────────────────────────────────── */
function ItemIcon({
  src,
  fallback: FallbackIcon,
}: {
  src: string;
  fallback: React.ElementType;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return <FallbackIcon className="w-6 h-6 text-white/40" />;
  }

  const fullSrc = src.startsWith("http")
    ? src
    : `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${src.replace(/^\//, "")}`;

  return (
    <img
      src={fullSrc}
      alt=""
      className="w-full h-full object-contain"
      onError={() => setError(true)}
    />
  );
}

const DB_BASE = "https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio";

function toGDocsUrl(credential: string): string {
  const full = credential.startsWith("http")
    ? credential
    : `${DB_BASE}${credential.startsWith("/") ? credential : "/" + credential}`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(full)}&embedded=true`;
}

/* ─── PDF Viewer Modal ─────────────────────────────────────── */
function CertModal({ title, credential, onClose }: { title: string; credential: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const viewerUrl = toGDocsUrl(credential);

  const modal = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Modal box */}
      <motion.div
        className="relative w-full max-w-3xl h-[90vh] rounded-2xl overflow-hidden border border-white/15 flex flex-col z-10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(14,10,28,0.95) 100%)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-roboto">Certificate</p>
            <p className="text-white font-advercase text-sm md:text-base mt-0.5">{title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PDF viewer */}
        <div className="relative flex-1 select-none">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-7 h-7 text-white/40 animate-spin" />
              <p className="text-white/40 text-sm">Loading certificate…</p>
            </div>
          )}
          <iframe
            src={viewerUrl}
            title={title}
            className="w-full h-full border-0"
            onLoad={() => setLoading(false)}
            sandbox="allow-scripts allow-same-origin"
            style={{ pointerEvents: loading ? "none" : "auto" }}
          />
        </div>

        {/* Footer notice */}
        <div className="px-5 py-2.5 border-t border-white/8 shrink-0">
          <p className="text-white/30 text-[11px] text-center font-roboto">
            View only · Downloading is not permitted
          </p>
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}

/* ─── Card ─────────────────────────────────────────────────── */
function EduCard({ item, index }: { key?: React.Key; item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-white/15 flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_0%_0%,rgba(85,19,185,0.2),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 overflow-hidden">
            <ItemIcon src={item.icon} fallback={GraduationCap} />
          </div>
          <span className="px-2.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-white text-[11px] font-bold tracking-widest uppercase">
            {item.type}
          </span>
        </div>

        {/* Degree / title */}
        <h3 className="text-white text-base md:text-lg font-advercase leading-snug mb-1">
          {item.degree}
        </h3>
        {/* Institution */}
        <p className="text-white text-sm font-medium mb-3 opacity-80">{item.institution}</p>

        {/* Description */}
        <p className="text-white text-sm leading-relaxed flex-1 mb-4 opacity-75">
          {item.description}
        </p>

        {/* Footer pills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-roboto">
            🗓️ {item.period}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-roboto">
            📍 {item.location}
          </span>
          {item.grade && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-roboto">
              🎓 {item.grade}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Cert Card ─────────────────────────────────────────────── */
function CertCard({ item, index }: { key?: React.Key; item: any; index: number }) {
  const [open, setOpen] = useState(false);
  return (<>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-white/15 flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-400/70 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.18),transparent_55%)] pointer-events-none" />

      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Icon + issuer */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 overflow-hidden">
            <ItemIcon src={item.icon} fallback={Award} />
          </div>
          <div>
            <p className="text-white text-xs font-roboto uppercase tracking-wider opacity-60">
              Issued by
            </p>
            <p className="text-white text-sm font-semibold">{item.issuer}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-sm md:text-base font-advercase leading-snug mb-2 flex-1">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-white text-xs leading-relaxed mb-4 opacity-75">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-roboto">
            🗓️ {item.date}
          </span>
          {item.credential && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/20 hover:bg-accent/35 border border-accent/40 text-white text-xs font-roboto transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              View Certificate
            </button>
          )}
        </div>
      </div>
    </motion.div>

    {/* PDF Modal */}
    <AnimatePresence>
      {open && (
        <CertModal
          title={item.title}
          credential={item.credential}
          onClose={() => setOpen(false)}
        />
      )}
    </AnimatePresence>
  </>);
}

/* ─── Main Section ──────────────────────────────────────────── */
export function Journey() {
  return (
    <section className="relative py-24 px-4 md:px-12 overflow-hidden">
      {/* ── LightPillar gradient background ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
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
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-40 z-10"
          style={{ background: "linear-gradient(180deg, #000000 13.37%, rgba(0,0,0,0) 100%)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 z-10"
          style={{ background: "linear-gradient(0deg, #000000 13.37%, rgba(0,0,0,0) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── Education ─────────────────────────────────── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeader title="Education" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.length > 0 ? (
              education.map((item: any, i: number) => (
                <EduCard key={i} item={item} index={i} />
              ))
            ) : (
              /* Skeleton placeholders while loading */
              [0, 1].map((i) => (
                <div
                  key={i}
                  className="h-60 rounded-2xl border border-white/8 bg-white/3 animate-pulse"
                />
              ))
            )}
          </div>
        </div>

        {/* ── Certifications ────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <SectionHeader title="Certifications" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.length > 0 ? (
              certifications.map((item: any, i: number) => (
                <CertCard key={i} item={item} index={i} />
              ))
            ) : (
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-52 rounded-2xl border border-white/8 bg-white/3 animate-pulse"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
