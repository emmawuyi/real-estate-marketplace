import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../mockData';
import { ListingCard } from '../components/ListingCard';
import { MapPin, Phone, Mail, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export const AgentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch agent attributes (defaulting to Alex Carter if id mismatch)
  const agentId = id || 'agent-789';
  const agentProperties = MOCK_PROPERTIES.filter(p => p.agentId === agentId);
  
  // Use first property agent details or default mock agent details
  const agentName = agentProperties[0]?.agentName || 'Alex Carter';
  const agentPhoto = agentProperties[0]?.agentPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100';
  const agencyId = agentProperties[0]?.agencyId || 'agency-999';

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <Link to="/listings" style={{ color: 'inherit', textDecoration: 'none' }}>Listings</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)' }}>Agent Profile: {agentName}</span>
      </div>

      {/* Main Grid: Left sidebar profile, Right Listings portfolio */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="profile-layout">
        
        {/* Left Side: Agent Bio card */}
        <aside className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <img 
              src={agentPhoto} 
              alt={agentName} 
              style={{
                width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)',
                boxShadow: 'var(--shadow-glow)'
              }}
            />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{agentName}</h1>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Broker & Luxury Property Specialist</div>
              <span className="badge badge-success" style={{ marginTop: '8px', fontSize: '0.65rem' }}>Top 1% Producer</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={14} color="var(--accent)" /> <span>+1 (555) 987-6543</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={14} color="var(--accent)" /> <span>{agentName.toLowerCase().replace(' ', '.')}@horizon.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={14} color="var(--accent)" /> <span>Beverly Hills Office</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>About {agentName}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Alex brings over 8 years of luxury residential real estate experience. Dedicated to providing bespoke advisory services, Alex has negotiated over $120M in transactions, serving elite high-net-worth clients globally.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Affiliation</h4>
            <Link 
              to={`/agency/${agencyId}`} 
              style={{
                textDecoration: 'none', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.02)', padding: '10px',
                borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '0.85rem', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <Award size={16} color="var(--warning)" />
              <div>
                <strong>Horizon Realty Group</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Verified Elite Agency</span>
              </div>
            </Link>
          </div>
        </aside>

        {/* Right Side: Agent Listings Grid */}
        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Portfolio & Active Listings</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Showing {agentProperties.length} active residential properties managed by {agentName}.</p>
          </div>

          <div className="listings-grid">
            {agentProperties.map(property => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .profile-layout {
            grid-template-columns: 300px 1fr !important;
            align-items: flex-start !important;
          }
          .profile-layout aside {
            position: sticky !important;
            top: 96px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AgentProfile;
