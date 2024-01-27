import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={Home} path="/home" />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
