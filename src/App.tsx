import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { RoleSwitcher } from './components/RoleSwitcher';

// Pages
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { ListingDetail } from './pages/ListingDetail';
import { SubmitListing } from './pages/SubmitListing';
import { Feed } from './pages/Feed';
import { AgentProfile } from './pages/AgentProfile';
import { AgencyProfile } from './pages/AgencyProfile';
import { Dashboard } from './pages/Dashboard';
import { ModerationQueue } from './pages/ModerationQueue';
import { Billing } from './pages/Billing';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-container">
          {/* Top Navigation */}
          <Navbar />

          {/* Main View Area */}
          <div className="content-area">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                <Route path="/submit" element={<SubmitListing />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/agent/:id" element={<AgentProfile />} />
                <Route path="/agency/:id" element={<AgencyProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/moderation" element={<ModerationQueue />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
            </main>
          </div>

          {/* FLOATING DEVELOPER UTILITY */}
          <RoleSwitcher />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
