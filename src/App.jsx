import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Training from "./pages/Training";
import TrainingFrases from "./pages/TrainingFrases";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Envolver todas las rutas con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="training" element={<Training />} />
          <Route path="training/frases" element={<TrainingFrases />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
