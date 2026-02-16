import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
const Dash = lazy(() => import("./pages/Dashboard"));
export default function App() {

  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="loading-container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dash />} />
        </Routes>
      </Suspense>
    </>
  );
}
