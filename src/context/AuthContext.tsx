import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'buyer' | 'seller' | 'agent' | 'agency' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phoneNumber?: string;
  agencyId?: string; // for agents and agencies
  bio?: string;
  stats?: {
    listingsCount?: number;
    leadsCount?: number;
    viewsCount?: number;
    dealsClosed?: number;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  buyer: {
    uid: 'buyer-123',
    email: 'buyer@estatehub.com',
    displayName: 'Sarah Jenkins',
    role: 'buyer',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    bio: 'Looking for a 3-bedroom suburban family home in Portland.',
    stats: {
      listingsCount: 0,
      leadsCount: 4, // inquiries sent
    }
  },
  seller: {
    uid: 'seller-456',
    email: 'seller@estatehub.com',
    displayName: 'Marcus Brody',
    role: 'seller',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    bio: 'Individual homeowner selling luxury condo in downtown area.',
    stats: {
      listingsCount: 1,
      leadsCount: 12, // leads received on listing
    }
  },
  agent: {
    uid: 'agent-789',
    email: 'agent@estatehub.com',
    displayName: 'Alex Carter',
    role: 'agent',
    photoURL: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    phoneNumber: '+1 (555) 987-6543',
    agencyId: 'agency-999',
    bio: 'Premier listing agent at Horizon Realty, specializing in modern homes and smart home properties.',
    stats: {
      listingsCount: 8,
      leadsCount: 34,
      viewsCount: 1240,
      dealsClosed: 15
    }
  },
  agency: {
    uid: 'agency-999',
    email: 'contact@horizonrealty.com',
    displayName: 'Horizon Realty Group',
    role: 'agency',
    photoURL: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=120',
    phoneNumber: '+1 (555) 500-1000',
    bio: 'Top-producing agency specializing in residential estates and multi-family developments.',
    stats: {
      listingsCount: 42,
      leadsCount: 198,
      viewsCount: 8520,
      dealsClosed: 89
    }
  },
  admin: {
    uid: 'admin-000',
    email: 'admin@estatehub.com',
    displayName: 'Devon Miller (Super Admin)',
    role: 'admin',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    bio: 'Platform Manager & Chief Moderator.',
    stats: {
      listingsCount: 384, // total active on platform
      leadsCount: 1450,
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage if present
    const savedUser = localStorage.getItem('eh_active_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Default to buyer for a clean first-time experience
      setUser(DEFAULT_PROFILES.buyer);
      localStorage.setItem('eh_active_user', JSON.stringify(DEFAULT_PROFILES.buyer));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    setLoading(true);
    const profile = DEFAULT_PROFILES[role];
    const customizedProfile = { ...profile, email };
    setUser(customizedProfile);
    localStorage.setItem('eh_active_user', JSON.stringify(customizedProfile));
    setLoading(false);
  };

  const signup = async (name: string, email: string, role: UserRole) => {
    setLoading(true);
    const profile = DEFAULT_PROFILES[role];
    const customizedProfile = {
      ...profile,
      uid: `user-${Date.now()}`,
      displayName: name,
      email,
    };
    setUser(customizedProfile);
    localStorage.setItem('eh_active_user', JSON.stringify(customizedProfile));
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem('eh_active_user');
    setLoading(false);
  };

  const switchRole = (role: UserRole) => {
    const profile = DEFAULT_PROFILES[role];
    setUser(profile);
    localStorage.setItem('eh_active_user', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
