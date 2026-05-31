import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Building, FileText, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgencyRequest {
  id: string;
  name: string;
  representative: string;
  licenseNumber: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_REQUESTS: AgencyRequest[] = [
  { id: 'ar-1', name: 'Apex Premier Realty', representative: 'Marcus Aurelius', licenseNumber: 'RE-99210-CA', location: 'Los Angeles, CA', status: 'pending' },
  { id: 'ar-2', name: 'Vanguard Suburban Brokerage', representative: 'Jennifer Lopez', licenseNumber: 'RE-88432-OR', location: 'Portland, OR', status: 'pending' },
  { id: 'ar-3', name: 'Elite Coastal LLC', representative: 'Bruce Wayne', licenseNumber: 'RE-00007-NY', location: 'New York, NY', status: 'pending' }
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AgencyRequest[]>(INITIAL_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-error" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Shield size={12} /> Platform Administrator
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Platform Control Panel</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Centralized telemetry, agency approvals, and policy control dashboards.</p>
        </div>
        <Link to="/moderation" className="btn btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <span>Moderation Queue ({pendingRequests.length + 2})</span>
        </Link>
      </div>

      {/* Telemetry telemetry widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Total Active Listings</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>384</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>94% approved organically</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Registered Users</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>4,820</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>↑ 140 new signups today</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Verified Agencies</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>42</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>3 requests awaiting review</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Monthly Platform Revenue</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>$14,520</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>↑ 22% vs last month</span>
        </div>
      </div>

      {/* Split layout: Left Agency verification workbench, Right policy quick settings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="admin-split-layout">
        
        {/* Left Side: Agency Requests */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="var(--accent)" /> Corporate Agency Verification
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 8px' }}>Agency Details</th>
                  <th style={{ padding: '12px 8px' }}>Representative</th>
                  <th style={{ padding: '12px 8px' }}>License Code</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                  <th style={{ padding: '12px 8px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px 8px' }}>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{req.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.location}</span>
                    </td>
                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>{req.representative}</td>
                    <td style={{ padding: '16px 8px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{req.licenseNumber}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span className={`badge ${
                        req.status === 'pending' ? 'badge-accent' : req.status === 'approved' ? 'badge-success' : 'badge-error'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
                      {req.status === 'pending' ? (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleApprove(req.id)}
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--success)', borderColor: 'rgba(16,185,129,0.2)' }}
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button 
                            onClick={() => handleReject(req.id)}
                            className="btn btn-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--error)', borderColor: 'rgba(244,63,94,0.2)' }}
                          >
                            <XCircle size={14} /> Decline
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decision logged</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Policies */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} color="var(--accent)" /> Policy & Engine Controls
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Automated AI Moderation</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan uploaded images and captions automatically</span>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Lead SLA Warning Notification</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Page agents when lead is untouched for 2 hours</span>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Boost Verification Check</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mandatory manual check before boosted assets are shown</span>
              </div>
              <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--accent)' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-split-layout {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AdminDashboard;
