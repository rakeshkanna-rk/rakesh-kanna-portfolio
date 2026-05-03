import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects, posters } from "../data/work";

type ProjectItem = {
  id: string;
  title: string;
  image: string | string[];
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

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Rakesh Kanna`;
    }
    return () => {
      document.title = "Rakesh Kanna — Product Designer & Developer";
    };
  }, [project]);

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
  const isCarousel = project.type === "carousel" || Array.isArray(project.image);
  const hasUrl = !!project.url;
  
  const images = Array.isArray(project.image) 
    ? (project.type === 'poster' ? project.image : project.image.slice(1))
    : [project.image];
    
  const isFewImages = project.type === 'poster' && images.length <= 2;
  const hasCarousel = isCarousel && images.length > 0;

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

        {hasUrl ? (
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-white transition-all cursor-pointer font-sugopro text-sm tracking-widest"
          >
            {project.type === "poster" ? "VIEW PROJECT" : "VISIT LIVE"}
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="w-[100px]"></div> /* Placeholder for balance */
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mt-20 flex flex-col items-center justify-start w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full ${isWebsite ? 'h-[calc(100vh-80px)]' : 'min-h-[calc(100vh-80px)]'}`}
        >
          {isWebsite ? (
            <iframe 
              src={project.url} 
              title={project.title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : hasCarousel ? (
            <div className="w-full">
              <div className={`mx-auto flex flex-col items-center ${isFewImages ? 'gap-0 py-0' : 'w-[95%] md:w-[80%]'}`}>
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={isFewImages ? 'flex justify-center w-full' : 'w-full'}
                  >
                    <img 
                      src={img.startsWith("http") ? img : `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${img.replace(/^\//, '')}`} 
                      alt={`${project.title} - ${index + 1}`} 
                      className={isFewImages 
                        ? "md:h-[90vh] md:w-auto w-screen h-auto object-contain block" 
                        : "w-full h-auto block"
                      }
                    />
                  </motion.div>
                ))}
                
                {/* Mobile/Bottom Info for Carousel */}
                <div className="text-center py-12">
                  <h1 className="font-Advercase text-3xl mb-2">{project.title}</h1>
                  {project.category && (
                    <p className="font-sugopro tracking-widest text-white/40 text-sm uppercase">{project.category}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
               <img 
                src={(() => {
                  const img = Array.isArray(project.image) ? project.image[0] : project.image;
                  return img.startsWith("http") ? img : `https://raw.githubusercontent.com/rakeshkanna-rk/database/refs/heads/main/new_portfolio/${img.replace(/^\//, '')}`;
                })()} 
                alt={project.title} 
                className={isFewImages 
                  ? "md:h-[90vh] md:w-auto w-screen h-auto object-contain" 
                  : "w-full max-w-5xl h-auto max-h-full object-contain rounded-2xl border border-white/10 bg-white/5 p-4"
                }
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
    </div>
  );
}
