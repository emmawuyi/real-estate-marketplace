import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { User, Shield, Briefcase, Building, ShoppingBag, Check, ChevronUp } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'buyer', label: 'Buyer Dashboard', icon: <ShoppingBag size={16} /> },
    { role: 'seller', label: 'Seller Dashboard', icon: <User size={16} /> },
    { role: 'agent', label: 'Agent Dashboard', icon: <Briefcase size={16} /> },
    { role: 'agency', label: 'Agency Portal', icon: <Building size={16} /> },
    { role: 'admin', label: 'Admin & Mod Area', icon: <Shield size={16} /> },
  ];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'buyer': return <ShoppingBag size={18} />;
      case 'seller': return <User size={18} />;
      case 'agent': return <Briefcase size={18} />;
      case 'agency': return <Building size={18} />;
      case 'admin': return <Shield size={18} />;
    }
  };

  return (
    <>
      <button 
        className="role-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Quick Role Switcher for Phase 1 testing"
      >
        {getRoleIcon(user.role)}
        <span>Testing: {user.role.toUpperCase()}</span>
        <ChevronUp size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.2s' }} />
      </button>

      {isOpen && (
        <div className="role-menu glass-panel animate-slide-up">
          <div style={{ padding: '8px 12px 4px 12px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
            TEST PLATFORM ROLES
          </div>
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => {
                switchRole(r.role);
                setIsOpen(false);
              }}
              className={`role-item ${user.role === r.role ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {r.icon}
                <span>{r.label}</span>
              </div>
              {user.role === r.role && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
