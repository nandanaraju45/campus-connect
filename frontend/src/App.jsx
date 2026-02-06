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
import RootPage from "./pages/RootPage";
import EventDetailPage from "./pages/EventDetailPage";
import PublishResultPage from "./pages/PublishResultPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public routes */}
        {/* <Route path="/" element={<RootPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/events/:id" element={<ProtectedRoute allowedRoles={["student", "faculty", "admin"]} />} >
          <Route path="" element={<EventDetailPage />} />
        </Route>

        <Route path="/publish-result/:itemId" element={<ProtectedRoute allowedRoles={["faculty", "admin"]} />} >
          <Route path="" element={<PublishResultPage />} />
        </Route>

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
