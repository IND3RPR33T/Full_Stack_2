import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Settings from "./pages/settings";
import SmartAssistant from "./pages/smart-assistant";
import StudentDashboard from "./pages/student-dashboard";
import Events from "./pages/events";
import EventDetails from "./pages/event-details";
import CampusMap from "./pages/campus-map";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Main Features */}
        <Route path="/smart-assistant" element={<SmartAssistant />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Events */}
        <Route path="/events" element={<Events />} />
        <Route path="/events-notices" element={<Events />} />

        {/* Event Details */}
        <Route path="/event-details" element={<EventDetails />} />

        {/* Campus Map */}
        <Route path="/campus-map" element={<CampusMap />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

        {/* Fallback (404-safe) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
