import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/UI/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";  // Import your dashboard page
import './styles/globals.css';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
