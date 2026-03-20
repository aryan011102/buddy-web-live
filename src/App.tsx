import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import FloatingMenuButton from "./components/FloatingMenuButton/FloatingMenuButton";
import Sidebar from "./components/Sidebar/Sidebar";
import Landing from "./pages/Landing/Landing";
import CursorDot from "./components/Cursor/CursorDot";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { Analytics } from "@vercel/analytics/react";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <CursorDot />
      {!open && <FloatingMenuButton onClick={() => setOpen(true)} />}
      <ScrollToTopButton />

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
