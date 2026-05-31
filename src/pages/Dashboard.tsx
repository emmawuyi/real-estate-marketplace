import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BuyerDashboard } from './BuyerDashboard';
import { AgentDashboard } from './AgentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { AgencyProfile } from './AgencyProfile';
import { Link } from 'react-router-dom';
import { ShieldCheck, LogIn } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="page-container animate-fade-in" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        textAlign: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'
        }}>
          <LogIn size={28} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Authentication Required</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
          Please log in or sign up to access your personalized real estate control panels.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={() => window.location.reload()} className="btn btn-primary">Try Refreshing</button>
        </div>
      </div>
    );
  }

  // Smart router based on user.role
  switch (user.role) {
    case 'buyer':
      return <BuyerDashboard />;
    case 'seller':
      // Seller inherits lead-captures, listing management from agent dashboard (scaled down)
      return <AgentDashboard />;
    case 'agent':
      return <AgentDashboard />;
    case 'agency':
      // Renders centralized Agency console
      return <AgentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <BuyerDashboard />;
  }
};
export default Dashboard;
