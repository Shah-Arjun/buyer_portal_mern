import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PropertiesListing from "./pages/PropertiesListing";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/properties" element={<PropertiesListing />} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
      </Routes>

    </BrowserRouter>
  );
}

export default App;
