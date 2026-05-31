import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../mockData';
import { ListingCard } from '../components/ListingCard';
import { Building2, Phone, Mail, Award, CheckCircle2, ChevronRight, Users, ShieldCheck } from 'lucide-react';

export const AgencyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Aggregated listing stats under agency
  const agencyProperties = MOCK_PROPERTIES;
  
  const agencyName = 'Horizon Realty Group';
  const agencyPhoto = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120';
  const agencyPhone = '+1 (555) 500-1000';
  const agencyEmail = 'contact@horizonrealty.com';

  // Agent team list
  const agents = [
    { id: 'agent-789', name: 'Alex Carter', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', role: 'Executive Broker', count: 4 },
    { id: 'agent-111', name: 'Brooke Sterling', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', role: 'Malibu Specialist', count: 2 },
    { id: 'agent-222', name: 'Tyler Vance', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'Downtown Specialist', count: 1 }
  ];

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <Link to="/listings" style={{ color: 'inherit', textDecoration: 'none' }}>Listings</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)' }}>Agency Profile: {agencyName}</span>
      </div>

      {/* Agency Corporate Banner card */}
      <div className="glass-panel" style={{
        padding: '40px 32px',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(0,0,0,0) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)',
            width: '80px', height: '80px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Building2 size={44} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{agencyName}</h1>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> VERIFIED
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '600px' }}>
              Horizon Realty Group is the leading bespoke real estate brokerage in California, setting high standards of excellence for luxury residential and investment estates.
            </p>
          </div>
        </div>

        {/* Agency contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '20px', borderLeft: '3px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={14} color="var(--accent)" /> <strong>{agencyPhone}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={14} color="var(--accent)" /> <strong>{agencyEmail}</strong>
          </div>
        </div>
      </div>

      {/* Grid structure: Left Agents Directory, Right Aggregated Listings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="agency-layout">
        
        {/* Left Column: Agents Directory */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <Users size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Agency Directory ({agents.length} Agents)</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {agents.map(agent => (
              <Link 
                key={agent.id}
                to={`/agent/${agent.id}`}
                className="glass-panel"
                style={{
                  padding: '16px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '12px',
                  textDecoration: 'none', color: 'inherit', border: '1px solid var(--border-color)', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              >
                <img 
                  src={agent.photo} 
                  alt={agent.name} 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{agent.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{agent.role}</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <strong>{agent.count} Listings</strong>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* Right Column: Aggregated Properties */}
        <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <Building2 size={18} color="var(--accent)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Agency Aggregated Portfolio</h3>
          </div>

          <div className="listings-grid">
            {agencyProperties.map(property => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .agency-layout {
            grid-template-columns: 320px 1fr !important;
            align-items: flex-start !important;
          }
          .agency-layout aside {
            position: sticky !important;
            top: 96px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AgencyProfile;
