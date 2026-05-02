import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { projects, posters } from "../data/work";

type ProjectItem = {
  id: string;
  title: string;
  image: string;
  type: string;
  url?: string;
  category?: string;
};

const allProjects: ProjectItem[] = [...projects, ...posters];

export function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find project or use a fallback for now
  // Note: if you want query params like ?id=123 instead of /view-project/123,
  // we would use useLocation() and URLSearchParams instead of useParams.
  // The route /work/view-project/:id is generally cleaner.
  const project = allProjects.find(p => p.id === id) || allProjects[0];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  // Determine if we should show iframe (website with url) or just image (poster)
  // For safety, only iframe actual http URLs, otherwise just show the image
  const isWebsite = project.type === "website" && project.url;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-white">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-bg/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
        <button 
          onClick={() => navigate('/work')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-roboto tracking-wider text-sm">BACK TO WORK</span>
        </button>

        <h1 className="font-Advercase text-xl hidden md:block">{project.title}</h1>

        {isWebsite ? (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all cursor-pointer font-sugopro text-sm tracking-widest"
          >
            VISIT LIVE
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="w-[100px]"></div> /* Placeholder for balance */
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mt-20 flex flex-col items-center justify-start min-h-[calc(100vh-80px)] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[calc(100vh-80px)]"
        >
          {isWebsite ? (
            <iframe 
              src={project.url} 
              title={project.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
               <img 
                src={project.image} 
                alt={project.title} 
                className="w-full max-w-5xl h-auto max-h-full object-contain rounded-2xl border border-white/10 bg-white/5 p-4"
              />
               {/* Mobile Title (shown below since header might be cramped) */}
              <div className="md:hidden mt-6 text-center">
                <h1 className="font-Advercase text-2xl mb-2">{project.title}</h1>
                {project.category && (
                  <p className="font-sugopro tracking-widest text-white/40 text-xs">{project.category}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
