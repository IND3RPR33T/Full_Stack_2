import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Profile = lazy(() => wait(1000).then(() => import("./pages/Profile")));
const Dash = lazy(() => wait(1000).then(() => import("./pages/Dashboard")));
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
