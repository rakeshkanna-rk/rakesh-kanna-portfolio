import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Footer } from "../components/layout/Footer";
import { fadeInUp } from "../constants/animations";
import { X, ExternalLink } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  description: string;
  content: string;
  categories: string[];
  thumbnail: string;
  pubDate: string;
}

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const truncateText = (text: string, length = 150) => {
  return text.length > length ? text.slice(0, length) + "…" : text;
};

const cleanImageStyles = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("img").forEach((img) => {
    img.removeAttribute("style");
    img.removeAttribute("width");
    img.removeAttribute("height");
    img.className = "w-full h-auto rounded-xl my-6 object-contain shadow-lg";
  });
  doc.querySelectorAll("p").forEach((p) => {
    p.className = "mb-6 leading-relaxed text-white/70 text-base md:text-lg";
  });
  doc.querySelectorAll("h1, h2, h3, h4").forEach((h) => {
    h.className = "text-2xl md:text-3xl font-Advercase mt-12 mb-6 text-white";
  });
  doc.querySelectorAll("a").forEach((a) => {
    a.className = "text-accent underline hover:text-white transition-colors";
  });
  doc.querySelectorAll("figcaption").forEach((f) => {
    f.className = "text-white/40 text-sm text-center mt-2 mb-8";
  });
  doc.querySelectorAll("ul, ol").forEach((list) => {
    list.className = "list-disc list-inside mb-6 space-y-2 text-white/70";
  });
  doc.querySelectorAll("blockquote").forEach((bq) => {
    bq.className = "border-l-4 border-accent pl-4 py-1 italic text-white/80 my-8 bg-white/5 rounded-r-lg";
  });
  return doc.body.innerHTML;
};

const getImageFromContent = (html: string) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match
    ? match[1]
    : "/images/image1.png"; // Fallback
};

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rakeshkanna0108`
        );
        const data = await res.json();
        const formattedPosts = data.items.map((post: any) => ({
          title: post.title,
          link: post.link,
          description: truncateText(stripHtml(post.description), 150),
          content: cleanImageStyles(post.content),
          categories: post.categories || [],
          thumbnail: getImageFromContent(post.content),
          pubDate: new Date(post.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching Medium posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchText.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.categories.some((cat) => cat.toLowerCase().includes(query))
    );
  }, [posts, searchText]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePost]);

  return (
    <div className="min-h-screen flex flex-col bg-bg relative">
      <img className="w-full px-1 py-2 md:px-10 opacity-50" src="./blogs-header.svg" alt="blogs-header" />
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <SectionHeader title="Writings & Thoughts" className="mb-0 mt-20" />
          
          <div className="relative w-full md:w-80 z-10">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/50 transition-colors font-roboto"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24 relative z-0">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.link}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-6 shrink-0">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  {post.categories.length > 0 && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/80 backdrop-blur-md border border-white/20 text-[10px] font-sugopro tracking-widest text-white uppercase line-clamp-1 max-w-[80%]">
                      {post.categories[0]}
                    </div>
                  )}
                </div>

                <div className="px-1 flex-1 flex flex-col">
                  <p className="text-white/40 text-[10px] font-roboto tracking-[0.2em] uppercase mb-2">
                    {post.pubDate}
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-Advercase leading-tight mb-4 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-accent font-sugopro text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    Read Article <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Modal Overlay */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center items-end md:items-center bg-black/80 backdrop-blur-sm md:p-6"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl h-[90vh] md:h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5 shrink-0">
                <a 
                  href={activePost.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm font-roboto"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Read on Medium</span>
                </a>
                <button 
                  onClick={() => setActivePost(null)}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div 
                className="p-6 md:p-12 overflow-y-auto scrollbar-hide"
                data-lenis-prevent="true"
              >
                <h1 className="text-3xl md:text-5xl font-Advercase text-white mb-6 leading-tight">
                  {activePost.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {activePost.categories.map(cat => (
                    <span key={cat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-roboto">
                      {cat}
                    </span>
                  ))}
                  <span className="px-3 py-1 text-xs text-white/40 font-roboto self-center ml-2">
                    {activePost.pubDate}
                  </span>
                </div>

                <div 
                  className="font-roboto pb-20"
                  dangerouslySetInnerHTML={{ __html: activePost.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
