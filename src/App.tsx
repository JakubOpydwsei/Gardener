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
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import UserLoginForm from "./components/UserLoginForm";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/garden-creator" element={<GardenCreatorPage />} />
              <Route path="/encyklopedia" element={<PlantPage />} />
              <Route path="/plant/:id" element={<PlantInfoPage />} />
              <Route path="/about-project" element={<AboutProjectPage />} />
              <Route path="/register-form" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/user-login-form" element={<UserLoginForm />} />
              <Route path="*" element={<h1>404 - Nie znaleziono strony</h1>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
