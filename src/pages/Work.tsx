import { Crafted } from "../components/sections/Crafted";
import { Posters } from "../components/sections/Posters";
import { Footer } from "../components/layout/Footer";

export function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <img className="w-full px-1 py-2 md:px-10 opacity-50" src="./works-header.svg" alt="work-header" />
      <div className="flex-1">
        <Crafted isWorkPage={true} />
        <Posters isWorkPage={true} />
      </div>
      <Footer />
    </div>
  );
}
