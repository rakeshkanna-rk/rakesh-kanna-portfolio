import { Hero } from "../components/sections/Hero";
import { Crafted } from "../components/sections/Crafted";
import { Posters } from "../components/sections/Posters";
import { About } from "../components/sections/About";
import { Marquee } from "../components/sections/Marquee";
import { Toolkit } from "../components/sections/Toolkit";
import { Journey } from "../components/sections/Journey";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Footer } from "../components/layout/Footer";
import { DecorativeLines } from "../components/ui/DecorativeLines";

export function Home() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <DecorativeLines />
      <div id="crafted">
        <Crafted limit={4} />
      </div>
      <div id="posters">
        <Posters limit={6} />
      </div>
      <div id="about">
        <About />
      </div>

      <Marquee
        marqueeText="UI/UX ✦ Design ✦ With ✦ Figma ✦ Graphics ✦ Branding ✦ Product ✦"
        speed={2}
        curveAmount={200}
        direction="right"
        interactive
        className="custom-text-style cursor-default"
      />

      <Toolkit />
      <div id="journey" className="relative">
        <SectionHeader
          title="My Journey"
          className="px-2 md:px-12 -mb-7 relative z-50"
        />
        <Journey />
      </div>
      <Footer />
    </>
  );
}
