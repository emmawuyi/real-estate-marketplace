import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../mockData';
import { VideoPlayer } from '../components/VideoPlayer';
import { 
  MapPin, BedDouble, Bath, Square, Calendar, 
  Send, User, Phone, Mail, ChevronRight, CheckCircle2, ShieldCheck, Play 
} from 'lucide-react';

export const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = MOCK_PROPERTIES.find(p => p.id === id);

  if (!property) {
    return (
      <div className="page-container animate-fade-in" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Property Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The listing you are looking for might have been sold, removed, or does not exist.</p>
        <Link to="/listings" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

  // Active media view tab ('image' or 'video')
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  
  // Lead Capture Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState(`Hi ${property.agentName}, I am very interested in this property (${property.title}) and would like to schedule a viewing or request more details.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedAgent, setAssignedAgent] = useState(property.agentName);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate SLA Auto-assignment and lead scoring
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear form
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
    }, 1200);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <Link to="/listings" style={{ color: 'inherit', textDecoration: 'none' }}>Listings</Link>
        <ChevronRight size={12} color="var(--text-muted)" />
        <span style={{ color: 'var(--text-primary)' }}>{property.title}</span>
      </div>

      {/* Main Grid: Left Media & Details, Right Sidebar Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="detail-layout">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Media Player Container */}
          <div className="glass-panel" style={{
            position: 'relative',
            height: '450px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {activeMedia === 'image' ? (
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <VideoPlayer url={property.videoUrl || ''} isActive={true} />
            )}

            {/* Media Selector Tabs */}
            {property.videoUrl && (
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                display: 'flex',
                gap: '8px',
                zIndex: 10
              }}>
                <button 
                  onClick={() => setActiveMedia('image')}
                  className={`btn ${activeMedia === 'image' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                >
                  Photos
                </button>
                <button 
                  onClick={() => setActiveMedia('video')}
                  className={`btn ${activeMedia === 'video' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Play size={12} fill={activeMedia === 'video' ? 'white' : 'none'} /> Video Tour
                </button>
              </div>
            )}
          </div>

          {/* Heading Information */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>
                For {property.type === 'sale' ? 'Sale' : 'Rent'}
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{property.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                <MapPin size={16} color="var(--accent)" />
                <span>{property.location}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)' }}>
                {formatPrice(property.price)}
                {property.type === 'rent' && <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/month</span>}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Est. Mortgage: $12,400/mo</span>
            </div>
          </div>

          {/* Core Specifications Banner */}
          <div className="glass-panel" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Bedrooms</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1.25rem', fontWeight: 700 }}>
                <BedDouble size={18} color="var(--accent)" /> {property.beds || 'N/A'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Bathrooms</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1.25rem', fontWeight: 700 }}>
                <Bath size={18} color="var(--accent)" /> {property.baths || 'N/A'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Square Footage</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1.25rem', fontWeight: 700 }}>
                <Square size={16} color="var(--accent)" /> {property.area} sqft
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Listed Date</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '1.25rem', fontWeight: 700 }}>
                <Calendar size={16} color="var(--accent)" /> {property.createdDate}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Property Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
              {property.description}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
              Designed as a luxury statement piece, this custom structure features high-quality premium imported materials, automated climate zones, smart lighting arrays, state-of-the-art security integrations, and ultra-high speed internet backbones. Fully responsive smart floor plans designed for the modern lifestyle.
            </p>
          </div>
        </div>

        {/* Right Column: Lead Capture Card */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Agent Overview Profile Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Listed By Agent</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={property.agentPhoto} 
                alt={property.agentName} 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
              />
              <div>
                <Link to={`/agent/${property.agentId}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {property.agentName}
                </Link>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Luxury Property Specialist</div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Top Agent</span>
                  <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>SLA 2hr</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={14} color="var(--accent)" /> <span>+1 (555) 987-6543</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={14} color="var(--accent)" /> <span>{property.agentName.toLowerCase().replace(' ', '.')}@horizon.com</span>
              </div>
            </div>

            {/* Direct buttons */}
            <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '4px' }}>
              <Link to={`/agency/${property.agencyId}`} className="btn btn-secondary" style={{ flexGrow: 1, fontSize: '0.85rem', padding: '10px' }}>
                View Agency
              </Link>
              <Link to={`/agent/${property.agentId}`} className="btn btn-secondary" style={{ flexGrow: 1, fontSize: '0.85rem', padding: '10px' }}>
                Agent Portfolio
              </Link>
            </div>
          </div>

          {/* Lead Capture Form Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'sticky',
            top: '96px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Request Tour & Details</h3>
            
            {isSuccess ? (
              <div className="animate-fade-in" style={{
                textAlign: 'center',
                padding: '16px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CheckCircle2 size={48} color="var(--success)" />
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Inquiry Submitted!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  Your lead inquiry has been successfully captured and routed to **{assignedAgent}** automatically.
                </p>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  fontSize: '0.75rem',
                  color: '#6ee7b7',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  width: '100%'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                    <ShieldCheck size={14} /> Agent SLA Verified (2-Hour Limit)
                  </div>
                  <span>Alex Carter has been paged. If they fail to respond within 2 hours, this lead will escalates automatically.</span>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.85rem', marginTop: '8px' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <User size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      placeholder="your.email@domain.com" 
                      required 
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <Mail size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      required 
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <Phone size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Message Details</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="form-input"
                    style={{ resize: 'none', lineHeight: '1.4', fontSize: '0.85rem' }}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '6px', gap: '8px' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Routing Lead...' : 'Contact Agent & Tour'}</span>
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .detail-layout {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </div>
  );
};
