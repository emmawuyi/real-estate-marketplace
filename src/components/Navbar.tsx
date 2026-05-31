import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, Home, Search, Video, PlusCircle, 
  LayoutDashboard, CreditCard, ShieldCheck, LogOut, Menu, X 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
    fontWeight: isActive ? '600' : '400',
  });

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
      boxSizing: 'border-box',
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)',
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
        }}>
          <Building2 size={22} color="white" />
        </div>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.4rem',
          letterSpacing: '-0.03em',
        }} className="gradient-text">
          EstateHub
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
        <NavLink to="/" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
          <Home size={16} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/listings" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
          <Search size={16} />
          <span>Browse</span>
        </NavLink>
        <NavLink to="/feed" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
          <Video size={16} />
          <span>Feed</span>
        </NavLink>

        {user && (
          <>
            <NavLink to="/submit" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
              <PlusCircle size={16} />
              <span>Submit Listing</span>
            </NavLink>
            <NavLink to="/dashboard" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </NavLink>
            {user.role === 'admin' && (
              <NavLink to="/moderation" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
                <ShieldCheck size={16} />
                <span>Moderation</span>
              </NavLink>
            )}
            <NavLink to="/billing" style={({ isActive }) => ({ ...activeStyle({ isActive }), display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' })}>
              <CreditCard size={16} />
              <span>Billing</span>
            </NavLink>
          </>
        )}
      </div>

      {/* User Info / Auth Desktop */}
      <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-nav">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user.displayName}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role.toUpperCase()}</div>
            </div>
            <img 
              src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
              alt={user.displayName} 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '2px solid var(--accent)',
                objectFit: 'cover'
              }}
            />
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--error)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
            Get Started
          </button>
        )}
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'block',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: '4px',
        }}
        className="mobile-nav-toggle"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-slide-up" style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '16px',
          boxSizing: 'border-box',
          borderTop: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Home size={18} /> <span>Home</span>
          </Link>
          <Link to="/listings" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Search size={18} /> <span>Browse Listings</span>
          </Link>
          <Link to="/feed" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Video size={18} /> <span>Shorts Feed</span>
          </Link>

          {user ? (
            <>
              <Link to="/submit" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                <PlusCircle size={18} /> <span>Submit Property</span>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                <LayoutDashboard size={18} /> <span>Dashboard</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/moderation" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <ShieldCheck size={18} /> <span>Moderation</span>
                </Link>
              )}
              <Link to="/billing" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                <CreditCard size={18} /> <span>Billing & Boosts</span>
              </Link>
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.displayName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role.toUpperCase()}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }} className="btn btn-primary" style={{ width: '100%' }}>
              Get Started
            </button>
          )}
        </div>
      )}

      {/* Responsive Inline CSS overrides */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
