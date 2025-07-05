import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VolunteerPortal from "./pages/VolunteerPortal";
// import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import RegisterType from "./pages/RegisterType";
import VolunteerRegister from "./pages/VolunteerRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<VolunteerPortal />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterType />} />
        <Route path="/register/volunteer" element={<VolunteerRegister />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
