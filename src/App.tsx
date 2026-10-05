import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Terms } from "./Terms";
import { Privacy } from "./Privacy";
import ThemesHapp from "./ThemesHapp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/themes-happ" element={<ThemesHapp />} />
      </Routes>
    </BrowserRouter>
  );
}
