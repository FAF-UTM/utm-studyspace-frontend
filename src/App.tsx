import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}
