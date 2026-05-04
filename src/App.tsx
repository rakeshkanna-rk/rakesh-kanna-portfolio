/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ClickSpark } from "./components/ui/ClickSpark";
import { FloatingMenu } from "./components/ui/FloatingMenu";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { Blog } from "./pages/Blog";
import { Links } from "./pages/Links";
import { ProjectView } from "./pages/ProjectView";
import { NotFound } from "./pages/NotFound";
import { AnimatePresence } from "motion/react";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !hash) return;
    
    // Function to perform the scroll
    const performScroll = (retryCount = 0) => {
      const element = document.querySelector(hash) as HTMLElement;
      if (element) {
        // Wait a bit more on the first try to ensure layout is ready
        const delay = retryCount === 0 ? 100 : 0;
        
        setTimeout(() => {
          lenis.scrollTo(element, { 
            offset: -50, 
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Smooth expo out
          });
        }, delay);
      } else if (retryCount < 5) {
        // Retry if element not found yet
        setTimeout(() => performScroll(retryCount + 1), 200);
      }
    };

    // Initial trigger after a safe delay for components to mount
    const timeoutId = setTimeout(() => performScroll(), 600);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, hash, lenis]);

  // Handle normal top-of-page scroll when no hash
  useEffect(() => {
    if (!lenis || hash) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, hash, lenis]);

  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollToHash />
          <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <FloatingMenu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/view-project/:id" element={<ProjectView />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/links" element={<Links />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ClickSpark>
        </>
      )}
    </div>
  );
}
