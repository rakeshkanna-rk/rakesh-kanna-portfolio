import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Footer } from "../components/layout/Footer";
import { fadeInUp } from "../constants/animations";

const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Minimalist Design in 2026",
    date: "April 15, 2026",
    category: "Design",
    excerpt: "Exploring how minimalism is shifting towards more organic and expressive forms in the modern digital landscape.",
    image: "/images/image1.png"
  },
  {
    id: 2,
    title: "Mastering Motion: A Guide to React Animations",
    date: "April 10, 2026",
    category: "Development",
    excerpt: "Deep dive into Framer Motion and how to create physics-based interactions that feel alive.",
    image: "/images/image2.png"
  },
  {
    id: 3,
    title: "Brand Identity: More Than Just a Logo",
    date: "April 5, 2026",
    category: "Branding",
    excerpt: "Why consistency across touchpoints is the key to building a memorable and trustworthy brand.",
    image: "/images/image3.png"
  }
];

export function Blog() {
  return (
    <div className="min-h-screen flex flex-col pt-32 bg-bg">
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-12">
        <SectionHeader title="Writings & Thoughts" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 pb-24">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              {...fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-6">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/80 backdrop-blur-md border border-white/20 text-[10px] font-sugopro tracking-widest text-white uppercase">
                  {post.category}
                </div>
              </div>

              <div className="px-1">
                <p className="text-white/40 text-[10px] font-sugopro tracking-[0.2em] uppercase mb-2">
                  {post.date}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-Advercase leading-tight mb-4 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-accent font-sugopro text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Read Article <span className="text-lg">→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
