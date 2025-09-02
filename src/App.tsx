import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import PlantPage from "./pages/PlantPage";
import PlantInfoPage from "./pages/PlantInfoPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { GardenCreatorPage } from "./pages/GardenCreatorPage";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // duration = czas animacji
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path="/encyklopedia" element={<PlantPage />} />
            <Route path="/plant/:id" element={<PlantInfoPage />} />
            <Route path="/garden-creator" element={<GardenCreatorPage />} />
            <Route path="*" element={<h1>404 - Nie znaleziono strony</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
