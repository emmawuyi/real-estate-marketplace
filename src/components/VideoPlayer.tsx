import React, { useRef, useEffect, useState } from 'react';
import { Play, Volume2, VolumeX, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Small timeout to prevent AbortError in browsers
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent play/pause toggle
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div 
      onClick={togglePlay}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        src={url}
        loop
        muted={isMuted}
        playsInline
        onLoadStart={() => setIsLoading(true)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          zIndex: 2,
        }}>
          <Loader2 size={48} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
        </div>
      )}

      {/* Play Overlay (shows briefly when paused) */}
      {!isPlaying && !isLoading && (
        <div style={{
          position: 'absolute',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 2,
        }}>
          <Play size={28} fill="white" style={{ marginLeft: '4px' }} />
        </div>
      )}

      {/* Sound Controller Button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 10,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Add spin animation keyframes in standard react style tag if not defined elsewhere */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
export default VideoPlayer;
