import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../mockData';
import { ListingCard } from '../components/ListingCard';
import { Search, MapPin, DollarSign, Home as HomeIcon } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query params
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (propertyType !== 'all') params.append('type', propertyType);
    if (priceRange !== 'all') params.append('price', priceRange);
    if (category !== 'all') params.append('category', category);
    
    navigate(`/listings?${params.toString()}`);
  };

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.isBoosted);

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '520px',
        width: '100%',
        borderRadius: 'var(--radius-xl)',
        backgroundImage: 'linear-gradient(rgba(8, 12, 20, 0.4), rgba(8, 12, 20, 0.95)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Decorative ambient glowing sphere */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '800px', zIndex: 1, marginBottom: '32px' }} className="animate-slide-up">
          <span className="badge badge-accent" style={{ marginBottom: '16px', fontSize: '0.8rem', padding: '6px 14px' }}>
            YOUR PREMIER REAL ESTATE HUB & MARKETPLACE
          </span>
          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: '16px',
            fontFamily: 'var(--font-heading)'
          }}>
            Discover Luxury Living <br />
            <span className="gradient-accent-text">Tailored Just For You</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Search verified properties, explore virtual vertical short tour reels, connect with elite agents, and secure your dream home instantly.
          </p>
        </div>

        {/* Dynamic Search Box */}
        <form 
          onSubmit={handleSearch}
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '900px',
            borderRadius: 'var(--radius-xl)',
            padding: '16px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            alignItems: 'center',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 2,
            boxSizing: 'border-box'
          }}
        >
          {/* Location Search input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} color="var(--accent)" /> Location
            </label>
            <input 
              type="text" 
              placeholder="e.g. Beverly Hills, Malibu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px' }}
            />
          </div>

          {/* Property Listing Type (Sale vs Rent) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HomeIcon size={12} color="var(--accent)" /> Listing Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: 'var(--bg-secondary)' }}>All Options</option>
              <option value="sale" style={{ background: 'var(--bg-secondary)' }}>For Sale</option>
              <option value="rent" style={{ background: 'var(--bg-secondary)' }}>For Rent</option>
            </select>
          </div>

          {/* Category Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HomeIcon size={12} color="var(--accent)" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: 'var(--bg-secondary)' }}>All Categories</option>
              <option value="house" style={{ background: 'var(--bg-secondary)' }}>House</option>
              <option value="apartment" style={{ background: 'var(--bg-secondary)' }}>Apartment</option>
              <option value="condo" style={{ background: 'var(--bg-secondary)' }}>Condominium</option>
              <option value="land" style={{ background: 'var(--bg-secondary)' }}>Vacant Land</option>
            </select>
          </div>

          {/* Budget Range */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <DollarSign size={12} color="var(--accent)" /> Max Budget
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', cursor: 'pointer' }}
            >
              <option value="all" style={{ background: 'var(--bg-secondary)' }}>Any Price</option>
              <option value="5000" style={{ background: 'var(--bg-secondary)' }}>Under $5k/mo</option>
              <option value="1000000" style={{ background: 'var(--bg-secondary)' }}>Under $1.0M</option>
              <option value="3000000" style={{ background: 'var(--bg-secondary)' }}>Under $3.0M</option>
              <option value="5000000" style={{ background: 'var(--bg-secondary)' }}>Under $5.0M</option>
            </select>
          </div>

          {/* Submit Search Button */}
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{
              height: '46px',
              marginTop: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%'
            }}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Featured Boosted Properties Section */}
      <section style={{ marginTop: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Handpicked Masterpieces</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Featured Luxury Properties</h2>
          </div>
          <button 
            onClick={() => navigate('/listings')} 
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            Explore All Listings
          </button>
        </div>

        <div className="listings-grid">
          {featuredProperties.map(property => (
            <ListingCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Aesthetic Promo Banner */}
      <section 
        className="glass-panel animate-fade-in"
        style={{
          marginTop: '64px',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          backgroundImage: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(244, 63, 94, 0.05) 100%)',
        }}
      >
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span className="badge badge-warning" style={{ alignSelf: 'flex-start' }}>Trending Content</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>TikTok-Style Property Swipes</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1rem' }}>
            Tired of boring photos? Dive into our vertical video feed to take virtual high-definition walkthrough tours in 30 seconds. Like, comment, save, and contact listing agents instantly!
          </p>
          <button 
            onClick={() => navigate('/feed')} 
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', padding: '10px 24px', marginTop: '8px' }}
          >
            Open Short Reels Feed
          </button>
        </div>
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" 
            alt="Agent Tour Mockup" 
            style={{
              width: '180px',
              height: '320px',
              borderRadius: '24px',
              objectFit: 'cover',
              border: '4px solid var(--bg-tertiary)',
              boxShadow: 'var(--shadow-xl)',
              transform: 'rotate(-5deg)'
            }}
          />
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400" 
            alt="Malibu Tour Mockup" 
            style={{
              width: '180px',
              height: '320px',
              borderRadius: '24px',
              objectFit: 'cover',
              border: '4px solid var(--bg-tertiary)',
              boxShadow: 'var(--shadow-xl)',
              transform: 'rotate(5deg)',
              position: 'absolute',
              top: '20px',
              right: '20%',
              zIndex: -1
            }}
          />
        </div>
      </section>
    </div>
  );
};
