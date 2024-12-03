import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutManager from "./pages/WorkoutManager";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import WorkoutHistory from "./pages/WorkoutHistory";
import GoalSetting from "./pages/GoalSetting"
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/workout-manager"
          element={
            <ProtectedRoute>
              <WorkoutManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout-history"
          element={
            <ProtectedRoute>
              <WorkoutHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/goal-setting"
          element={
            <ProtectedRoute>
              <GoalSetting />
            </ProtectedRoute>
          }
        />
         <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
