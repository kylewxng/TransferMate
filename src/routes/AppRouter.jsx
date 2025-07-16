import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Survey from "../pages/Survey";
import Home from "../pages/Home";
import RouteRedirector from "../routes/RouteRedirector";

function AppRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<RouteRedirector />} />
    </Routes>
  );
}

export default AppRouter;
