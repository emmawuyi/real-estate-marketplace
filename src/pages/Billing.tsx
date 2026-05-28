import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '../mockData';
import { CreditCard, Check, ShieldCheck, Flame, ShoppingCart, Loader2 } from 'lucide-react';

export const Billing: React.FC = () => {
  const { user } = useAuth();
  
  // Local billing state
  const [activeTierId, setActiveTierId] = useState(user?.role === 'agency' ? 'tier-agency' : user?.role === 'agent' ? 'tier-pro' : 'tier-free');
  const [boostCredits, setBoostCredits] = useState(user?.role === 'agency' ? 10 : user?.role === 'agent' ? 2 : 0);

  // Boost calculator shopping cart state
  const [purchaseQuantity, setPurchaseQuantity] = useState(5);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'checking_out' | 'success'>('idle');
  const [paymentCard, setPaymentCard] = useState('');
  
  const getBoostPrice = (qty: number) => {
    if (qty >= 10) return qty * 10; // $10 per credit (33% off)
    if (qty >= 5) return qty * 12; // $12 per credit (20% off)
    return qty * 15; // standard $15
  };

  const handleSubscribe = (tierId: string) => {
    setActiveTierId(tierId);
  };

  const handlePurchaseBoosts = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('checking_out');

    // Simulate Stripe payment intent delay
    setTimeout(() => {
      setCheckoutStep('success');
      setBoostCredits(prev => prev + purchaseQuantity);
    }, 1800);
  };

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Page Title */}
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-accent" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Monetization Tiers</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Billing & Subscriptions</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', marginTop: '4px' }}>
          Select standard subscription layers, upgrade agency scale seats, and buy sponsored boosts to maximize organic lead routing velocities.
        </p>
      </div>

      {/* Subscription Plans Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center' }}>Choose Your Agent Plan</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          alignItems: 'stretch'
        }}>
          {SUBSCRIPTION_TIERS.map((tier) => {
            const isActive = activeTierId === tier.id;
            return (
              <div 
                key={tier.id}
                className="glass-panel"
                style={{
                  padding: '32px 24px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  position: 'relative',
                  border: isActive ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  background: isActive ? 'rgba(99, 102, 241, 0.02)' : 'rgba(255,255,255,0.01)',
                  transition: 'all 0.2s'
                }}
              >
                {tier.recommended && (
                  <span className="badge badge-accent" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    Recommended
                  </span>
                )}
                {isActive && (
                  <span className="badge badge-success" style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.65rem' }}>
                    Active Plan
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tier.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '12px' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>${tier.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/{tier.period}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Check size={14} color="var(--success)" style={{ flexShrink: 0 }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={isActive}
                  className={`btn ${isActive ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ marginTop: 'auto', width: '100%', fontSize: '0.9rem' }}
                >
                  {isActive ? 'Current Plan' : tier.price === 0 ? 'Select Standard' : 'Upgrade Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Boost credit calculator section */}
      <section 
        className="glass-panel responsive-billing-layout"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px',
          backgroundImage: 'linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(99, 102, 241, 0.01) 100%)'
        }}
      >
        {/* Left Side: Calculator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px', background: 'var(--warning-light)', color: 'var(--warning)',
              display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center'
            }}>
              <Flame size={20} fill="currentColor" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Buy Sponsored Boost Credits</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Balance: <strong>{boostCredits} Credits</strong></span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Boost Credits place properties at the top of Browse feeds, highlight cards with a warm golden edge, and unlock vertical Short walk-throughs in global TikTok feeds. Bulk purchase saves up to 33%.
          </p>

          {/* Calculator Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <label className="form-label" style={{ fontWeight: 600 }}>Select Credit Quantity</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 5, 10, 20].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => { setPurchaseQuantity(qty); if (checkoutStep === 'success') setCheckoutStep('idle'); }}
                  className={`btn ${purchaseQuantity === qty ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    flexGrow: 1, padding: '8px', fontSize: '0.85rem',
                    background: purchaseQuantity === qty ? 'var(--warning)' : 'var(--bg-tertiary)',
                    borderColor: purchaseQuantity === qty ? 'var(--warning)' : 'var(--border-color)',
                    boxShadow: purchaseQuantity === qty ? '0 4px 10px rgba(245, 158, 11, 0.2)' : 'none'
                  }}
                >
                  {qty} {qty === 1 ? 'Credit' : 'Credits'}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={purchaseQuantity}
                onChange={(e) => { setPurchaseQuantity(parseInt(e.target.value, 10)); if (checkoutStep === 'success') setCheckoutStep('idle'); }}
                style={{ flexGrow: 1, accentColor: 'var(--warning)' }}
              />
              <span style={{ fontWeight: 800, fontSize: '1.25rem', width: '50px', textAlign: 'right' }}>{purchaseQuantity}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Simulated Checkout Card */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={16} color="var(--warning)" /> Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Boost Credits ({purchaseQuantity}x)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                ${purchaseQuantity * 15}.00
              </span>
            </div>
            {purchaseQuantity >= 5 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                <span>Bulk discount deduction</span>
                <span>
                  -${purchaseQuantity * 15 - getBoostPrice(purchaseQuantity)}.00
                </span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '6px' }}>
              <span>Total Price</span>
              <span>${getBoostPrice(purchaseQuantity)}.00</span>
            </div>
          </div>

          {checkoutStep === 'success' ? (
            <div className="animate-fade-in" style={{
              textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--success)', padding: '10px 0'
            }}>
              <ShieldCheck size={42} />
              <strong style={{ fontSize: '1rem' }}>Payment Successful!</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Your card has been billed. **{purchaseQuantity} Credits** have been credited to your active wallet balance.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePurchaseBoosts} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Card (Stripe sandbox)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="4242 •••• •••• 4242"
                    required
                    pattern="[0-9]{16}"
                    maxLength={16}
                    value={paymentCard}
                    onChange={(e) => setPaymentCard(e.target.value.replace(/\D/g, ''))}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                  <CreditCard size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={checkoutStep === 'checking_out'}
                className="btn btn-primary"
                style={{
                  background: 'var(--warning)',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  gap: '8px',
                  width: '100%',
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.2)'
                }}
              >
                {checkoutStep === 'checking_out' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Processing Stripe...
                  </>
                ) : (
                  `Pay $${getBoostPrice(purchaseQuantity)}.00`
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .responsive-billing-layout {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default Billing;
