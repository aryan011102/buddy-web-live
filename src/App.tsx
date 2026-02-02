
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import About from "./pages/About/About";

import FloatingMenuButton from "./components/FloatingMenuButton/FloatingMenuButton";
import Sidebar from "./components/Sidebar/Sidebar";
import Landing from "./pages/Landing/Landing";
import CursorDot from "./components/Cursor/CursorDot";

function App() {
  const [open, setOpen] = useState(false);

  return (
    
    <BrowserRouter>
        <CursorDot />
   {!open && <FloatingMenuButton onClick={() => setOpen(true)} />}

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
