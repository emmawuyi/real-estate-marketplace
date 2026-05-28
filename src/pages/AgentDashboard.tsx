import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LEADS, MOCK_PROPERTIES, Lead } from '../mockData';
import { 
  Briefcase, MessageSquare, Plus, Flame, Clock, 
  CheckCircle, User, Phone, Mail, AlertTriangle, Play 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  
  // Interactive lead interaction log state
  const [interactionType, setInteractionType] = useState<'call' | 'email' | 'meeting' | 'note'>('call');
  const [interactionNotes, setInteractionNotes] = useState('');

  // Local properties manager
  const agentProperties = MOCK_PROPERTIES.filter(p => p.agentId === user?.uid || p.agentId === 'agent-789');

  const getSlaBadge = (deadlineStr: string, status: string) => {
    if (status === 'closed_won' || status === 'closed_lost') {
      return <span className="badge badge-success">Closed</span>;
    }
    const deadline = new Date(deadlineStr).getTime();
    const now = Date.now();
    const diff = deadline - now;

    if (diff < 0) {
      // Overdue
      return (
        <span className="badge badge-error" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={12} /> SLA Overdue
        </span>
      );
    } else {
      // Impending
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return (
        <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {hours > 0 ? `${hours}h ` : ''}${mins}m left
        </span>
      );
    }
  };

  const handleAddInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !interactionNotes.trim()) return;

    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          status: 'contacted' as const,
          interactions: [
            {
              id: `int-${Date.now()}`,
              type: interactionType,
              notes: interactionNotes,
              date: 'Just now',
              operator: user?.displayName || 'Alex Carter'
            },
            ...l.interactions
          ]
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    const refreshedLead = updatedLeads.find(l => l.id === selectedLead.id);
    if (refreshedLead) setSelectedLead(refreshedLead);
    setInteractionNotes('');
  };

  const handleToggleLeadStatus = (id: string, newStatus: Lead['status']) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    const refreshed = updated.find(l => l.id === id);
    if (refreshed) setSelectedLead(refreshed);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome & Stats Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Agent Portal</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Agent Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, **{user?.displayName || 'Alex Carter'}**. Horizon Realty Group.</p>
        </div>
        <button onClick={() => navigate('/submit')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> <span>Submit New Property</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Total Views</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>1,240</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>↑ 12% vs last week</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Active Inquiries</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{leads.length}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>4 pending SLA action</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Portfolio Properties</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{agentProperties.length}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4 boosted featured slots</span>
        </div>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>Deals Closed</div>
          <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>15</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Target Met 100%</span>
        </div>
      </div>

      {/* Main split: Left leads columns, Right Lead Details & Activity console */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="agent-split-layout">
        
        {/* Left Side: Lead List */}
        <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color="var(--accent)" /> Automated Lead Capture Queue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto' }}>
            {leads.map(lead => (
              <div 
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedLead?.id === lead.id ? 'var(--accent-light)' : 'rgba(255,255,255,0.01)',
                  border: selectedLead?.id === lead.id ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{lead.buyerName}</strong>
                    <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>Score: {lead.score}%</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' }}>
                    {lead.propertyTitle}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  {getSlaBadge(lead.slaDeadline, lead.status)}
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lead.createdDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Lead inspection Workbench */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedLead ? (
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Lead Details: {selectedLead.buyerName}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Interested in: <strong>{selectedLead.propertyTitle}</strong></span>
                </div>
                
                {/* Actions selection dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                  <select 
                    value={selectedLead.status} 
                    onChange={(e) => handleToggleLeadStatus(selectedLead.id, e.target.value as Lead['status'])}
                    className="form-input"
                    style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto' }}
                  >
                    <option value="new">New Inquiry</option>
                    <option value="assigned">Assigned</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="closed_won">Closed (Won)</option>
                    <option value="closed_lost">Closed (Lost)</option>
                  </select>
                </div>
              </div>

              {/* Lead basic metrics & info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="var(--accent)" /> <span>{selectedLead.buyerEmail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="var(--accent)" /> <span>{selectedLead.buyerPhone}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
                  <div>Lead Score: <strong style={{ color: 'var(--accent)' }}>{selectedLead.score}/100</strong> (Immediate Buyer)</div>
                  <div>SLA Deadline: <span style={{ color: 'var(--error)' }}>{new Date(selectedLead.slaDeadline).toLocaleTimeString()}</span></div>
                </div>
              </div>

              {/* Inquiry details */}
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Buyer Inquiry Message</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>"{selectedLead.message}"</p>
              </div>

              {/* Interaction Logger Form */}
              <form onSubmit={handleAddInteraction} style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Log Client Interaction</h4>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {(['call', 'email', 'meeting', 'note'] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInteractionType(type)}
                        className={`btn ${interactionType === type ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '4px' }}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter activity log notes (e.g. Talked on call, cash buyer interested in Malibu walkthrough)..."
                    required
                    value={interactionNotes}
                    onChange={(e) => setInteractionNotes(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                    Log
                  </button>
                </div>
              </form>

              {/* Interactions history timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Timeline Activities</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '180px', overflowY: 'auto' }}>
                  {selectedLead.interactions.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                      <div className="badge badge-accent" style={{ fontSize: '0.6rem', padding: '2px 6px', textTransform: 'uppercase', marginTop: '2px' }}>
                        {item.type}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p style={{ color: 'var(--text-primary)' }}>{item.notes}</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Logged by {item.operator} • {item.date}</span>
                      </div>
                    </div>
                  ))}
                  {selectedLead.interactions.length === 0 && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No activities logged yet for this lead.</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', borderRadius: 'var(--radius-xl)', textAlign: 'center'
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>Select a lead from the capture queue to open the active workbench.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .agent-split-layout {
            grid-template-columns: 320px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default AgentDashboard;
