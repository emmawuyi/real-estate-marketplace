import React, { useState } from 'react';
import { MOCK_MODERATION_QUEUE, ModerationItem } from '../mockData';
import { AlertTriangle, CheckCircle2, Shield, Eye, Trash2, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ModerationQueue: React.FC = () => {
  const [items, setItems] = useState<ModerationItem[]>(MOCK_MODERATION_QUEUE);
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(MOCK_MODERATION_QUEUE[0]);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'suspend') => {
    // Modify item status or remove
    const updated = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: action === 'approve' ? ('approved' as const) : ('rejected' as const) 
        };
      }
      return item;
    });
    setItems(updated);

    // Refresh selected item view
    const refreshed = updated.find(i => i.id === id);
    if (refreshed) setSelectedItem(refreshed);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <span className="badge badge-error" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', marginBottom: '8px' }}>
          <Shield size={12} /> Compliance Control
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Moderation & Moderation Workbench</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Review reported listings, investigate flagged media walkthrough videos, and enforce compliance guidelines.</p>
      </div>

      {/* Main split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '28px' }} className="mod-split-layout">
        
        {/* Left Side: reported list */}
        <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--error)" /> Flagged Reports Inbox
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedItem?.id === item.id ? 'rgba(244,63,94,0.06)' : 'rgba(255,255,255,0.01)',
                  border: selectedItem?.id === item.id ? '1px solid var(--error)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt="thumbnail" 
                    style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                  />
                )}
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.type}</strong>
                    <span className="badge badge-error" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>Flags: {item.flagCount}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                    {item.title}
                  </div>
                </div>

                <span className={`badge ${
                  item.status === 'pending' ? 'badge-warning' : item.status === 'approved' ? 'badge-success' : 'badge-error'
                }`} style={{ fontSize: '0.65rem', flexShrink: 0 }}>
                  {item.status.toUpperCase()}
                </span>
              </div>
            ))}
            {items.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>All queues clear! Compliance target achieved.</p>
            )}
          </div>
        </div>

        {/* Right Side: workbench inspectors */}
        <div>
          {selectedItem ? (
            <div className="glass-panel" style={{ borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Investigate Report #{selectedItem.id}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Type: <strong>{selectedItem.type.toUpperCase()}</strong> • Flagged: {selectedItem.createdDate}</span>
              </div>

              {/* Image Preview if available */}
              {selectedItem.imageUrl && (
                <div style={{ width: '100%', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={selectedItem.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {/* Report analysis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '16px', background: 'rgba(244,63,94,0.03)', border: '1px solid rgba(244,63,94,0.1)', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ color: 'var(--error)', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Flags Allegations</strong>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Reporter: {selectedItem.reporterName}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                    Reasoning: "{selectedItem.reason}"
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div>Target Content ID: <code style={{ color: 'var(--accent)' }}>{selectedItem.targetId}</code></div>
                  <div>Status: <strong style={{ color: selectedItem.status === 'approved' ? 'var(--success)' : selectedItem.status === 'rejected' ? 'var(--error)' : 'var(--warning)' }}>{selectedItem.status.toUpperCase()}</strong></div>
                </div>
              </div>

              {/* Interactive Moderation Workbench Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '4px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Decision Actions Workbench</h4>
                
                {selectedItem.status === 'pending' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
                    <button 
                      onClick={() => handleAction(selectedItem.id, 'approve')}
                      className="btn btn-secondary" 
                      style={{ color: 'var(--success)', borderColor: 'rgba(16,185,129,0.2)', fontSize: '0.8rem', padding: '10px' }}
                    >
                      <CheckCircle2 size={16} /> Approve (Safe)
                    </button>
                    <button 
                      onClick={() => handleAction(selectedItem.id, 'reject')}
                      className="btn btn-secondary" 
                      style={{ color: 'var(--error)', borderColor: 'rgba(244,63,94,0.2)', fontSize: '0.8rem', padding: '10px' }}
                    >
                      <Trash2 size={16} /> Reject & Remove
                    </button>
                    <button 
                      onClick={() => handleAction(selectedItem.id, 'suspend')}
                      className="btn btn-danger" 
                      style={{ fontSize: '0.8rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Ban size={16} /> Suspend Publisher
                    </button>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px',
                    textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600
                  }}>
                    ✓ Audit trail recorded: Action "{selectedItem.status.toUpperCase()}" logged successfully.
                  </div>
                )}
                
                {/* Visual Direct Redirect to inspecting */}
                {selectedItem.type === 'listing' && (
                  <Link 
                    to={`/listings/${selectedItem.targetId}`}
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Eye size={14} /> Full Visual Inspection
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-panel" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px', borderRadius: 'var(--radius-xl)', textAlign: 'center'
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>Select a compliance alert item to inspect flagged attributes.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .mod-split-layout {
            grid-template-columns: 340px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
export default ModerationQueue;
