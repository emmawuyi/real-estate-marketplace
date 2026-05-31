import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, MapPin, DollarSign, BedDouble, Bath, 
  Square, Image as ImageIcon, Video, ArrowRight, ArrowLeft, CheckCircle, Flame 
} from 'lucide-react';

export const SubmitListing: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('sale');
  const [category, setCategory] = useState('house');
  const [location, setLocation] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  
  // Media uploads states
  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState<string | null>(null);
  
  // Boost states
  const [isBoosted, setIsBoosted] = useState(false);

  // Handle local mock media creation for preview
  const handleImageMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const urls: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      setImages([...images, ...urls]);
    }
  };

  const handleVideoMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = (index: number) => {
    const next = [...images];
    next.splice(index, 1);
    setImages(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate creation persistence delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>SELL OR LEASE</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Submit Your Property</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Publish your listing and reach thousands of high-budget buyers instantly.</p>
      </div>

      {/* Progress Multi-step Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '32px',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }} className="glass-panel">
        <span style={{ color: step >= 1 ? 'var(--accent)' : 'inherit', fontWeight: step === 1 ? 800 : 600 }}>1. Basic Details</span>
        <span style={{ color: step >= 2 ? 'var(--accent)' : 'inherit', fontWeight: step === 2 ? 800 : 600 }}>2. Specifications</span>
        <span style={{ color: step >= 3 ? 'var(--accent)' : 'inherit', fontWeight: step === 3 ? 800 : 600 }}>3. Media Assets</span>
        <span style={{ color: step >= 4 ? 'var(--accent)' : 'inherit', fontWeight: step === 4 ? 800 : 600 }}>4. Boost & Publish</span>
      </div>

      {isSuccess ? (
        /* Success Screen */
        <div className="glass-panel animate-fade-in" style={{
          padding: '48px 32px',
          borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            <CheckCircle size={48} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Listing Pending Moderation!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.6' }}>
            Congratulations! Your property **"{title}"** has been received. Our automated and manual moderation queues are verifying the photos and safety rules. It will go live in less than 15 minutes.
          </p>

          {isBoosted && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              maxWidth: '500px',
              textAlign: 'left',
              display: 'flex',
              gap: '12px',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}>
              <Flame size={28} color="var(--warning)" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--warning)', display: 'block', marginBottom: '2px' }}>PRO BOOST CONFIRMED</strong>
                Your 3x boost has been scheduled. As soon as the moderators approve your listing, it will be highlighted with a luxury glow, placed at the top of organic feeds, and promoted on our vertical Shorts Feed.
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button onClick={() => navigate('/listings')} className="btn btn-secondary">
              Browse Listings
            </button>
            <button onClick={() => {
              setTitle(''); setPrice(''); setLocation(''); setBeds(''); setBaths(''); setArea(''); setDescription(''); setImages([]); setVideo(null); setIsBoosted(false);
              setStep(1); setIsSuccess(false);
            }} className="btn btn-primary">
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        /* Form Wizard */
        <form onSubmit={handleSubmit} className="glass-panel" style={{
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          
          {/* STEP 1: Basic details */}
          {step === 1 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Basic Details</h3>
              
              <div className="form-group">
                <label className="form-label">Property Title</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="e.g. Magnificent Oceanfront Penthouse Loft" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                  />
                  <Building size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Listing Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="form-input">
                    <option value="sale">For Sale (Sell)</option>
                    <option value="rent">For Rent (Lease)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Property Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
                    <option value="house">House / Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condominium</option>
                    <option value="land">Vacant Land</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Price {type === 'rent' ? '($ per month)' : '($ USD)'}</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" 
                    placeholder={type === 'rent' ? 'e.g. 4500' : 'e.g. 1250000'} 
                    required 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                  />
                  <DollarSign size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location Address</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="e.g. 102 Luxury Way, Malibu, CA 90265" 
                    required 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px' }}
                  />
                  <MapPin size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Technical Specifications */}
          {step === 2 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Technical Specifications</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Bedrooms</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      placeholder="e.g. 4" 
                      required={category !== 'land'} 
                      disabled={category === 'land'}
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <BedDouble size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bathrooms</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      step="0.5"
                      placeholder="e.g. 3.5" 
                      required={category !== 'land'} 
                      disabled={category === 'land'}
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <Bath size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Area (sq ft)</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      placeholder="e.g. 2400" 
                      required 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '36px' }}
                    />
                    <Square size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea 
                  rows={6} 
                  placeholder="Outline key selling points, local school ratings, security provisions, and architectural features..."
                  required 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-input"
                  style={{ resize: 'none', lineHeight: '1.5' }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Media Upload Assets */}
          {step === 3 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Media Assets</h3>
              
              {/* Image upload box */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Property Images (Multiple)</label>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 20px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageMock}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  <ImageIcon size={32} color="var(--accent)" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click to choose property images</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Formats: JPG, PNG. Max 5MB per file.</span>
                </div>

                {/* Previews */}
                {images.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                    {images.map((img, i) => (
                      <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          style={{
                            position: 'absolute', top: '2px', right: '2px', width: '18px', height: '18px', borderRadius: '50%',
                            background: 'rgba(0,0,0,0.7)', border: 'none', color: 'white', fontSize: '10px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video upload box */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 600 }}>Short Video Walkthrough (TikTok Feed compatible)</label>
                <div style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px 20px',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input 
                    type="file" 
                    accept="video/*"
                    onChange={handleVideoMock}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  <Video size={32} color="var(--accent)" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click to choose a short video walkthrough</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Formats: MP4, MOV (Vertical layout recommended). Max 20MB.</span>
                </div>

                {video && (
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-success">✓ Video Selected</span>
                    <button 
                      type="button" 
                      onClick={() => setVideo(null)} 
                      style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Boost & Publish */}
          {step === 4 && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Boost & Publish</h3>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Your listing is ready to go! To get up to **3x more views**, inquiries, and leads, choose to boost this listing before publishing.
              </p>

              <div 
                onClick={() => setIsBoosted(!isBoosted)}
                style={{
                  border: isBoosted ? '2px solid var(--warning)' : '1px solid var(--border-color)',
                  background: isBoosted ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={isBoosted} 
                  onChange={() => {}} // handled by div onClick
                  style={{ width: '20px', height: '20px', accentColor: 'var(--warning)', cursor: 'pointer' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: isBoosted ? 'var(--warning)' : 'var(--text-primary)' }}>Apply Featured Boost</h4>
                    <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}><Flame size={10} fill="currentColor" /> POPULAR</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Highlight property with a premium gold border, secure top slot in organic search, and display custom vertical walk-through tours on our global Shorts Feed page. (Uses 1 Boost Credit)
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>1 Credit</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Value: $15.00</div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                <input type="checkbox" required style={{ marginTop: '2px' }} />
                <span>I agree that all uploaded media assets represent the actual physical site truthfully, are free of watermarks, and adhere to structural verification standards.</span>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '20px',
            marginTop: '8px'
          }}>
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div /> // placeholder for alignment
            )}

            {step < 4 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #a855f7 100%)', minWidth: '160px' }}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
export default SubmitListing;
