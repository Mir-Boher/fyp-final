import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import VolunteerPortal from "./pages/VolunteerPortal";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./pages/SignIn";
import RegisterType from "./pages/RegisterType";
import VolunteerRegister from "./pages/VolunteerRegister";
import ApplyPage from "./pages/ApplyPage";
import Project from "./pages/Project";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import OrganizationRegistration from "./pages/OrganizationRegistration";
import PostOpportunity from "./pages/PostOpportunity";
import Dashboard from "./pages/Dashboard";
import OpportunityDetails from "./pages/OpportunityDetails";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<VolunteerPortal />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/project" element={<Project />} />
        <Route path="/application-success" element={<ApplicationSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunity/:id" element={<OpportunityDetails />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterType />} />
        <Route
          path="/register/organization"
          element={<OrganizationRegistration />}
        />
        <Route path="/register/volunteer" element={<VolunteerRegister />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/post-opportunity" element={<PostOpportunity />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
