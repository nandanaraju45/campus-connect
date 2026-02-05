import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LearnMorePage from "./pages/LearnMorePage";
import RegisterPage from "./pages/RegisterPage";

import AdminHomePage from "./pages/AdminHomePage";
import FacultyHomePage from "./pages/FacultyHomePage";
import StudentHomePage from "./pages/StudentHomePage";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 🔐 Admin protected */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-home" element={<AdminHomePage />} />
        </Route>

        {/* 🔐 Faculty protected */}
        <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
          <Route path="/faculty-home" element={<FacultyHomePage />} />
        </Route>

        {/* 🔐 Student protected */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student-home" element={<StudentHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
