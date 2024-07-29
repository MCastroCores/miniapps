import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Login } from "./pages/Login.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { Register } from "./pages/Register.jsx";

export const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
};
