import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { supabase } from './lib/supabase';

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

// Seed demo data on first load
async function seedDemoData() {
  const seeded = localStorage.getItem('demo_data_seeded');
  if (seeded) return;

  try {
    // Check if data already exists
    const { count } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });

    if ((count || 0) > 0) {
      localStorage.setItem('demo_data_seeded', 'true');
      return;
    }

    // Create demo profiles
    const demoProfiles = [
      { displayName: 'Alex Carter', role: 'agent', email: 'agent@demo.com' },
      { displayName: 'Marcus Brody', role: 'seller', email: 'seller@demo.com' },
      { displayName: 'Sarah Jenkins', role: 'buyer', email: 'buyer@demo.com' },
    ];

    const profileIds: Record<string, string> = {};
    for (const profile of demoProfiles) {
      const { data: authData } = await supabase.auth.signUp({
        email: profile.email,
        password: 'demo123456',
        options: { data: { display_name: profile.displayName, role: profile.role } },
      });

      if (authData.user) {
        profileIds[profile.role] = authData.user.id;
      }
    }

    // Insert demo listings
    const listings = [
      {
        title: 'Modern Downtown Loft',
        price: 850000,
        location: 'Portland, Oregon',
        beds: 2,
        baths: 2,
        area: 1400,
        type: 'sale',
        category: 'apartment',
        agent_id: profileIds['agent'],
        description: 'Stunning modern loft in the heart of downtown.',
        image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800',
        status: 'approved',
      },
      {
        title: 'Cozy Suburban Home',
        price: 450000,
        location: 'Beaverton, Oregon',
        beds: 3,
        baths: 2,
        area: 1800,
        type: 'sale',
        category: 'house',
        agent_id: profileIds['agent'],
        description: 'Perfect family home with large backyard.',
        image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800',
        status: 'approved',
      },
      {
        title: 'Luxury Beach Condo',
        price: 1200000,
        location: 'Cannon Beach, Oregon',
        beds: 3,
        baths: 3,
        area: 2200,
        type: 'sale',
        category: 'condo',
        agent_id: profileIds['agent'],
        description: 'Oceanfront property with stunning views.',
        image_url: 'https://images.unsplash.com/photo-1493857671505-72967e0e0760?auto=format&fit=crop&w=800',
        status: 'approved',
      },
    ];

    await supabase.from('properties').insert(listings);

    // Insert demo feed posts
    const feedPosts = [
      {
        agent_id: profileIds['agent'],
        media_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600',
        caption: 'Just listed this amazing downtown loft! 🏢✨ #realestate #portland',
        type: 'image',
        location: 'Portland, Oregon',
      },
      {
        agent_id: profileIds['agent'],
        media_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600',
        caption: 'New family home with beautiful backyard 🏡 Perfect for young families! #realestate',
        type: 'image',
        location: 'Beaverton, Oregon',
      },
    ];

    await supabase.from('feed_posts').insert(feedPosts);

    localStorage.setItem('demo_data_seeded', 'true');
    console.log('[v0] Demo data seeded successfully');
  } catch (error) {
    console.error('[v0] Error seeding demo data:', error);
  }
}

function AppContent() {
  const { loading } = useAuth();

  useEffect(() => {
    seedDemoData();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="page-container">
        <Navbar />
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
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
