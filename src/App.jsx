import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Training from "./pages/Training";
import TrainingFrases from "./pages/TrainingFrases";
import TrainingFonologico from "./pages/TrainingFonologico";
import TrainingFonologicoVocales from "./pages/TrainingFonologicoVocales";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter basename="/rehab-palabras/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="training" element={<Training />} />
          <Route path="training/frases" element={<TrainingFrases />} />
          <Route path="training/fonologico" element={<TrainingFonologico />} />
          <Route path="training/fonologico-vocales" element={<TrainingFonologicoVocales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
