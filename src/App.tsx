import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import PlantPage from "./pages/PlantPage";
import PlantInfoPage from "./pages/PlantInfoPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { GardenCreatorPage } from "./pages/GardenCreatorPage";
import AboutProjectPage from "./pages/AboutProjectPage";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/garden-creator" element={<GardenCreatorPage />} />
            <Route path="/encyklopedia" element={<PlantPage />} />
            <Route path="/plant/:id" element={<PlantInfoPage />} />
            <Route path="/about-project" element={<AboutProjectPage />} />
            <Route path="*" element={<h1>404 - Nie znaleziono strony</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
