import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, BedDouble, Bath, Square, Flame } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  area: number;
  imageUrl: string;
  videoUrl?: string;
  type: 'sale' | 'rent';
  category: 'house' | 'apartment' | 'condo' | 'land';
  isBoosted?: boolean;
  agentId: string;
  agentName: string;
  agentPhoto: string;
  agencyId: string;
  description: string;
  createdDate: string;
}

interface ListingCardProps {
  property: Property;
  onSaveToggle?: (id: string, saved: boolean) => void;
  isInitiallySaved?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({ 
  property, 
  onSaveToggle,
  isInitiallySaved = false 
}) => {
  const [isSaved, setIsSaved] = useState(isInitiallySaved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (onSaveToggle) {
      onSaveToggle(property.id, nextSaved);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link 
      to={`/listings/${property.id}`} 
      className="glass-card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        boxShadow: property.isBoosted ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
        border: property.isBoosted ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--glass-border)',
      }}
    >
      {/* Property Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
        <img 
          src={property.imageUrl} 
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        
        {/* Floating Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexDirection: 'column' }}>
          <span className="badge badge-accent" style={{ textTransform: 'uppercase', fontWeight: 700 }}>
            For {property.type}
          </span>
          {property.isBoosted && (
            <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', fontWeight: 700 }}>
              <Flame size={12} fill="currentColor" /> Boosted
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleSave}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(14, 20, 34, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isSaved ? '#f43f5e' : 'white',
            backdropFilter: 'blur(4px)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = 'rgba(14, 20, 34, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(14, 20, 34, 0.6)';
          }}
        >
          <Heart size={18} fill={isSaved ? '#f43f5e' : 'none'} />
        </button>
      </div>

      {/* Property Details Container */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {formatPrice(property.price)}
            {property.type === 'rent' && <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/mo</span>}
          </h2>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {property.title}
          </h3>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <MapPin size={14} color="var(--text-muted)" />
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{property.location}</span>
        </div>

        {/* Specs Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <BedDouble size={14} color="var(--accent)" />
            <span>{property.beds} Beds</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Bath size={14} color="var(--accent)" />
            <span>{property.baths} Baths</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Square size={12} color="var(--accent)" />
            <span>{property.area} sqft</span>
          </div>
        </div>

        {/* Agent Info footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={property.agentPhoto} 
              alt={property.agentName} 
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{property.agentName}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{property.createdDate}</span>
        </div>
      </div>
    </Link>
  );
};
