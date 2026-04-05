import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";
import PropertiesListing from "./pages/PropertiesListing";
import ProtectedRoute from "./components/ProtectedRoutes";
import SingleProperty from "./pages/SingleProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/properties" element={<PropertiesListing />} />
        <Route path="/property/:id" element={<SingleProperty />} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          

        <Route path="/about" element={<AboutPage /> } />
        <Route path="/contact" element={<ContactPage /> } />


        <Route path="/*" element={<h1>404  Page not found</h1> } />


      </Routes>

    </BrowserRouter>
  );
}

export default App;
