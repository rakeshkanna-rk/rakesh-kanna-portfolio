import { Footer } from "../components/layout/Footer";

export function Blog() {
  return (
    <div className="min-h-screen flex flex-col pt-32">
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-12 text-white">
        <h1 className="text-4xl md:text-6xl font-serif mb-8">Blog</h1>
        <p className="text-white/60 text-lg md:text-xl">Coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}
