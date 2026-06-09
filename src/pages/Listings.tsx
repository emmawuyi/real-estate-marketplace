import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useListings } from '../lib/hooks';
import { ListingCard } from '../components/ListingCard';
import { Search, MapPin, Grid, List, RefreshCw } from 'lucide-react';

export const Listings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync state with URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [priceMax, setPriceMax] = useState(searchParams.get('price') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [minBeds, setMinBeds] = useState('all');
  const [minBaths, setMinBaths] = useState('all');

  const [isGridView, setIsGridView] = useState(true);

  // Fetch listings from Supabase
  const filters = {
    search: query,
    category: category !== 'all' ? category : undefined,
    type: type !== 'all' ? type : undefined,
    priceMax: priceMax !== 'all' ? parseInt(priceMax, 10) : undefined,
    priceMin: undefined,
    beds: minBeds !== 'all' ? parseInt(minBeds, 10) : undefined,
    baths: minBaths !== 'all' ? parseFloat(minBaths) : undefined,
  };

  const { listings, isLoading } = useListings(filters);

  // Apply baths filtering (since the hook doesn't support it perfectly)
  const filteredProperties = minBaths !== 'all' 
    ? listings.filter(p => p.baths >= parseFloat(minBaths))
    : listings;

  // Sync URL search parameters
  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set('q', query);
    if (type !== 'all') nextParams.set('type', type);
    if (category !== 'all') nextParams.set('category', category);
    if (priceMax !== 'all') nextParams.set('price', priceMax);
    setSearchParams(nextParams, { replace: true });
  }, [query, type, category, priceMax, setSearchParams]);

  const handleResetFilters = () => {
    setQuery('');
    setType('all');
    setPriceMax('all');
    setCategory('all');
    setMinBeds('all');
    setMinBaths('all');
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Banner and Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Explore Property Listings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Showing {filteredProperties.length} high-quality verified listings matching your preferences.</p>
        </div>
        
        {/* Layout buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setIsGridView(true)} 
            style={{
              padding: '8px', 
              borderRadius: '6px', 
              border: 'none', 
              background: isGridView ? 'var(--accent-light)' : 'transparent',
              color: isGridView ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setIsGridView(false)} 
            style={{
              padding: '8px', 
              borderRadius: '6px', 
              border: 'none', 
              background: !isGridView ? 'var(--accent-light)' : 'transparent',
              color: !isGridView ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Filters, Right Grid */}
      <div style={{ display: 'flex', gap: '28px', flexDirection: 'column', alignItems: 'stretch' }} className="responsive-listing-layout">
        
        {/* Filtering Panel */}
        <aside className="glass-panel" style={{
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} color="var(--accent)" /> Search Filters
            </h3>
            <button 
              onClick={handleResetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <RefreshCw size={12} /> Clear All
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px'
          }}>
            {/* Search Input */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Keyword / City</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Enter keywords..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '36px' }}
                />
                <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Rent vs Sale */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="form-input">
                <option value="all">Any Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
                <option value="all">Any Category</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condominium</option>
                <option value="land">Land</option>
              </select>
            </div>

            {/* Max Price */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Max Budget</label>
              <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="form-input">
                <option value="all">Any Price</option>
                <option value="5000">Under $5k/mo</option>
                <option value="1000000">Under $1.0M</option>
                <option value="3000000">Under $3.0M</option>
                <option value="5000000">Under $5.0M</option>
              </select>
            </div>

            {/* Beds min */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Minimum Beds</label>
              <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)} className="form-input">
                <option value="all">Any Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
              </select>
            </div>

            {/* Baths min */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Minimum Baths</label>
              <select value={minBaths} onChange={(e) => setMinBaths(e.target.value)} className="form-input">
                <option value="all">Any Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Property Grid Content */}
        <main style={{ flexGrow: 1 }}>
          {isLoading ? (
            <div className="glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 40px',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <p>Loading listings...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="glass-panel animate-fade-in" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 40px',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <Search size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>No Listings Found</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '24px' }}>
                We couldn't find any listings that matched your search criteria. Try modifying your filters or entering different keywords.
              </p>
              <button onClick={handleResetFilters} className="btn btn-primary">Reset Search Filters</button>
            </div>
          ) : (
            <div className={isGridView ? "listings-grid" : ""} style={!isGridView ? { display: 'flex', flexDirection: 'column', gap: '20px' } : undefined}>
              {filteredProperties.map(property => (
                <div key={property.id} style={!isGridView ? { width: '100%' } : undefined}>
                  <ListingCard property={property} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .responsive-listing-layout {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .responsive-listing-layout aside {
            width: 300px !important;
            flex-shrink: 0 !important;
            position: sticky !important;
            top: 96px !important;
          }
          .responsive-listing-layout aside > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
