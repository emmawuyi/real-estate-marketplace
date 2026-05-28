import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_FEED_POSTS, FeedPost } from '../mockData';
import { VideoPlayer } from '../components/VideoPlayer';
import { 
  Heart, MessageCircle, Bookmark, Share2, MapPin, 
  ChevronUp, ChevronDown, Send, X, ArrowUpRight, Check 
} from 'lucide-react';

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  
  const activePost = posts[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commentsOpen) return; // ignore when typing comments
      
      if (e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, commentsOpen]);

  const handleNext = () => {
    if (activeIndex < posts.length - 1) {
      setActiveIndex(activeIndex + 1);
      setCommentsOpen(false);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setCommentsOpen(false);
    }
  };

  // Toggle reactions
  const handleLike = () => {
    const next = [...posts];
    const post = next[activeIndex];
    if (post.isLiked) {
      post.likes -= 1;
      post.isLiked = false;
    } else {
      post.likes += 1;
      post.isLiked = true;
    }
    setPosts(next);
  };

  const handleSave = () => {
    const next = [...posts];
    const post = next[activeIndex];
    if (post.isSaved) {
      post.saves -= 1;
      post.isSaved = false;
    } else {
      post.saves += 1;
      post.isSaved = true;
    }
    setPosts(next);
  };

  // Submit comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const next = [...posts];
    const post = next[activeIndex];
    post.comments.unshift({
      id: `c-new-${Date.now()}`,
      userName: 'You (Active Session)',
      userPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60',
      text: newCommentText,
      timeAgo: 'Just now'
    });
    post.commentsCount += 1;
    setPosts(next);
    setNewCommentText('');
  };

  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      height: 'calc(100vh - 100px)',
      position: 'relative',
      marginTop: '12px'
    }}>
      
      {/* Mobile hint header */}
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Tip: Use <strong>↑</strong> and <strong>↓</strong> arrow keys or the side navigation buttons to swipe tours
      </div>

      {/* Main viewport */}
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px', // Standard phone aspect ratio
          height: '100%',
          maxHeight: '740px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          border: '2px solid var(--border-color)',
          background: '#000',
          display: 'flex',
        }}
      >
        {/* Video Player */}
        <VideoPlayer url={activePost.mediaUrl} isActive={true} />

        {/* Vertical Swipe Nav Overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '12px',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10
        }}>
          <button 
            disabled={activeIndex === 0}
            onClick={handlePrev}
            style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
              color: activeIndex === 0 ? 'var(--text-muted)' : 'white', cursor: activeIndex === 0 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => activeIndex > 0 && (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
          >
            <ChevronUp size={20} />
          </button>
          <button 
            disabled={activeIndex === posts.length - 1}
            onClick={handleNext}
            style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
              color: activeIndex === posts.length - 1 ? 'var(--text-muted)' : 'white', cursor: activeIndex === posts.length - 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => activeIndex < posts.length - 1 && (e.currentTarget.style.background = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Top Location indicator */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          color: 'white',
          fontWeight: 600,
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <MapPin size={12} color="var(--accent)" />
          <span>{activePost.location}</span>
        </div>

        {/* Right Interactions Sidebar */}
        <div style={{
          position: 'absolute',
          right: '12px',
          bottom: '180px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          zIndex: 10
        }}>
          {/* Agent Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }}>
            <img 
              src={activePost.agentPhoto} 
              alt={activePost.agentName} 
              style={{
                width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover',
                border: '2px solid var(--accent)', boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)'
              }}
            />
          </div>

          {/* Like */}
          <button 
            onClick={handleLike}
            style={{
              background: 'transparent', border: 'none', color: activePost.isLiked ? '#f43f5e' : 'white',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s'
            }} onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.85)')} onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
              <Heart size={20} fill={activePost.isLiked ? '#f43f5e' : 'none'} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', textShadow: '1px 1px 2px black' }}>{activePost.likes}</span>
          </button>

          {/* Comments toggle */}
          <button 
            onClick={() => setCommentsOpen(true)}
            style={{
              background: 'transparent', border: 'none', color: 'white',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <MessageCircle size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', textShadow: '1px 1px 2px black' }}>{activePost.commentsCount}</span>
          </button>

          {/* Save */}
          <button 
            onClick={handleSave}
            style={{
              background: 'transparent', border: 'none', color: activePost.isSaved ? '#fbbf24' : 'white',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Bookmark size={20} fill={activePost.isSaved ? '#fbbf24' : 'none'} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', textShadow: '1px 1px 2px black' }}>{activePost.saves}</span>
          </button>

          {/* Share */}
          <button 
            onClick={handleShare}
            style={{
              background: 'transparent', border: 'none', color: copied ? 'var(--success)' : 'white',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', textShadow: '1px 1px 2px black' }}>
              {copied ? 'Copied!' : activePost.shares}
            </span>
          </button>
        </div>

        {/* Bottom Details Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 9
        }}>
          {/* Caption Details */}
          <div style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>@{activePost.agentName}</div>
            <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.4', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
              {activePost.caption}
            </p>
          </div>

          {/* Floating Connected Property Link Card */}
          <Link 
            to={`/listings/${activePost.propertyId}`}
            style={{
              background: 'rgba(14, 20, 34, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              color: 'white',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Featured Property Tour</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Inspect Rooms & Inquiry</span>
            </div>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ArrowUpRight size={14} color="white" />
            </div>
          </Link>
        </div>

        {/* Sliding Comments Drawer Overlay */}
        {commentsOpen && (
          <div className="glass-panel animate-slide-up" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '60%',
            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            boxShadow: '0 -10px 30px rgba(0,0,0,0.6)',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-color)',
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Comments ({activePost.comments.length})</span>
              <button 
                onClick={() => setCommentsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activePost.comments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No comments yet. Start the conversation!
                </div>
              ) : (
                activePost.comments.map((comm) => (
                  <div key={comm.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <img 
                      src={comm.userPhoto} 
                      alt={comm.userName} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{comm.userName}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{comm.timeAgo}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{comm.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleAddComment}
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <input 
                type="text" 
                placeholder="Add comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '0.85rem', background: 'rgba(255,255,255,0.03)' }}
              />
              <button 
                type="submit" 
                style={{
                  background: 'var(--accent)', border: 'none', width: '34px', height: '34px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer'
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Feed;
