import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Benefits from './components/Benefits';
// import Team from './components/Team';
import Footer from './components/Footer';
import FloatingChat from "./components/FloatingChat";

import CRMDashboard from './pages/CMRDashboard';
import LeadsPage from './pages/LeadsPage';
import EngagementTracker from './pages/EngagementTracker';
import LeadScoring from './pages/LeadScoring';
import DataInsightsDashboard from './pages/DataInsightsDashboard';
import FollowUpsDashboard from './pages/FollowUpsDashboard';
import AIPrioritizerDashboard from './pages/AIPrioritizerDashboard';

import PredictiveLeadIntentDashboard from './components/benefits/PredictiveLeadIntentDashboard';
import DealClosingDashboard from './components/benefits/DealClosingDashboard';
import AICopilotDashboard from './components/benefits/AICopilotDashboard'; // ✅ NEW IMPORT

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />

        <div className="pt-16">
          <Routes>
            {/* Main Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Problem />
                  <Solution />
                  <Benefits />
                  {/* <Team /> */}
                  <Footer />
                </>
              }
            />

            {/* CRM-related Pages */}
            <Route path="/crm-dashboard" element={<CRMDashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/engagement" element={<EngagementTracker />} />
            <Route path="/lead-scoring" element={<LeadScoring />} />
            <Route path="/data-insights" element={<DataInsightsDashboard />} />
            <Route path="/follow-ups-dashboard" element={<FollowUpsDashboard />} />
            <Route path="/ai-prioritizer-dashboard" element={<AIPrioritizerDashboard />} />

            {/* AI Benefit Dashboards */}
            <Route path="/predictive-intent" element={<PredictiveLeadIntentDashboard />} />
            <Route path="/deal-closing" element={<DealClosingDashboard />} />
            <Route path="/ai-copilot" element={<AICopilotDashboard />} /> {/* ✅ NEW ROUTE */}
          </Routes>
        </div>

        {/* 🌟 Global Floating Chatbot Widget */}
        <FloatingChat selectedLanguage="en-IN" />
      </div>
    </Router>
  );
}

export default App;