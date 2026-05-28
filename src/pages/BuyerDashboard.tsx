import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_PROPERTIES, MOCK_LEADS } from '../mockData';
import { ListingCard } from '../components/ListingCard';
import { Heart, Search, Mail, Bell, MessageSquare, Clock, MapPin } from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Buyer's saved property IDs (mocked as the first two)
  const savedProperties = MOCK_PROPERTIES.slice(0, 2);

  // Leads sent by the buyer
  const submittedInquiries = MOCK_LEADS.filter(l => l.buyerEmail === user?.email || l.buyerName === user?.displayName);

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '32px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)'
      }}>
        <div>
          <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Consumer Portal</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Welcome Back, {user?.displayName}!</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Track your active inquiries, manage saved property catalogs, and adjust search preferences.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            background: 'var(--bg-tertiary)', padding: '12px 20px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>2</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Saved Items</div>
          </div>
          <div style={{
            background: 'var(--bg-tertiary)', padding: '12px 20px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>{submittedInquiries.length}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Active Leads</div>
          </div>
        </div>
      </div>

      {/* Grid: Left Inquiries Inbox, Right Saved Items */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="buyer-grid">
        
        {/* Left Side: Active Inquiries & Replies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <MessageSquare size={20} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Communication & Lead Status</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {submittedInquiries.map((inquiry) => (
              <div key={inquiry.id} className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{inquiry.propertyTitle}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={12} /> Received: {inquiry.createdDate}
                    </div>
                  </div>
                  <span className={`badge ${
                    inquiry.status === 'new' ? 'badge-accent' : inquiry.status === 'contacted' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {inquiry.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '10px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', borderLeft: '3px solid var(--accent)' }}>
                  <strong>Your Inquiry:</strong> "{inquiry.message}"
                </div>

                {/* Simulated Agent reply */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100" 
                    alt={inquiry.assignedAgentName} 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{inquiry.assignedAgentName} (Broker)</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>2 hours ago</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px', lineHeight: '1.4' }}>
                      "Hi Sarah! Thanks for reaching out. I just verified with the owner that this villa is indeed available this Saturday morning at 10:00 AM. I have sent an invite to your email. Talk soon!"
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {submittedInquiries.length === 0 && (
              /* If mock switcher changed email, default fallback inquiry */
              <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Ultra-Modern Glass Villa</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={12} /> Active SLA: 2 hours
                    </div>
                  </div>
                  <span className="badge badge-accent">ROUTED</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '10px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px', borderLeft: '3px solid var(--accent)' }}>
                  <strong>Your Inquiry:</strong> "Is this oceanfront property available for private showings? Cash buyer pre-approved."
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100" 
                    alt="Alex Carter" 
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Alex Carter (Broker)</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Active Session</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px', lineHeight: '1.4' }}>
                      "Hi Sarah! Yes, I received your pre-approval details and marked your request as high-priority. Routing details sent to the owner, I will call you in 10 minutes to schedule!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Saved Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Saved Catalogs & Favorites</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {savedProperties.map(property => (
              <ListingCard key={property.id} property={property} isInitiallySaved={true} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .buyer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default BuyerDashboard;
