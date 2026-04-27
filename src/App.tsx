/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ClickSpark } from "./components/ui/ClickSpark";
import { FloatingMenu } from "./components/ui/FloatingMenu";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { Blog } from "./pages/Blog";
import { Links } from "./pages/Links";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    
    if (hash) {
      // Delay to ensure DOM and page components are fully rendered
      setTimeout(() => {
        const element = document.querySelector(hash) as HTMLElement;
        if (element) {
          lenis.scrollTo(element, { offset: -50, duration: 1.2 });
        } else {
          // Retry once more if element not yet in DOM
          setTimeout(() => {
            const el = document.querySelector(hash) as HTMLElement;
            if (el) lenis.scrollTo(el, { offset: -50, duration: 1.2 });
          }, 400);
        }
      }, 300);
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash, lenis]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent/30 relative">
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </ClickSpark>
    </div>
  );
}
