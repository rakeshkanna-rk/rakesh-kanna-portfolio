import { Hero } from "../components/sections/Hero";
import { Crafted } from "../components/sections/Crafted";
import { Posters } from "../components/sections/Posters";
import { About } from "../components/sections/About";
import { Marquee } from "../components/sections/Marquee";
import { Toolkit } from "../components/sections/Toolkit";
import { Journey } from "../components/sections/Journey";
import { CTA } from "../components/sections/CTA";
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
        <Crafted limit={5} />
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
        className="custom-text-style cursor-default w-screen md:text-6xl text-[100px]"
      />

      <Toolkit />
      <div id="journey" className="relative">
        <Journey />
      </div>
      <CTA />
      <Footer />
    </>
  );
}
