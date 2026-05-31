import { Property } from './components/ListingCard';

export interface FeedPost {
  id: string;
  propertyId: string;
  type: 'video' | 'photo';
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  agentName: string;
  agentPhoto: string;
  likes: number;
  commentsCount: number;
  saves: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  location: string;
  comments: {
    id: string;
    userName: string;
    userPhoto: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  status: 'new' | 'assigned' | 'contacted' | 'negotiating' | 'closed_won' | 'closed_lost';
  assignedAgentId: string;
  assignedAgentName: string;
  score: number; // calculated lead score
  slaDeadline: string; // ISO standard date
  createdDate: string;
  interactions: {
    id: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    notes: string;
    date: string;
    operator: string;
  }[];
}

export interface ModerationItem {
  id: string;
  type: 'listing' | 'post' | 'comment';
  targetId: string;
  title: string;
  reporterName?: string;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  flagCount: number;
  imageUrl?: string;
  createdDate: string;
}

// 1. Mock Properties
export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: 'Ultra-Modern Glass Villa',
    price: 3850000,
    location: 'Beverly Hills, CA 90210',
    beds: 5,
    baths: 6.5,
    area: 6800,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-minimalist-design-41718-large.mp4',
    type: 'sale',
    category: 'house',
    isBoosted: true,
    agentId: 'agent-789',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'This architectural masterpiece boasts floor-to-ceiling glass walls, an infinity edge pool, state-of-the-art automated home automation, and panoramic views of the Los Angeles basin. Completely private double gated entry.',
    createdDate: '2 days ago'
  },
  {
    id: 'prop-102',
    title: 'Sleek SkyLoft Penthouse',
    price: 18500,
    location: 'Tribeca, New York City, NY',
    beds: 3,
    baths: 3,
    area: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bright-and-modern-living-room-interior-39981-large.mp4',
    type: 'rent',
    category: 'apartment',
    isBoosted: false,
    agentId: 'agent-789',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'An expansive Tribeca loft featuring soaring 14-foot ceilings, exposed brick walls, premium Gaggenau chef kitchen, and private direct-elevator entry leading to a massive 1,200 sqft rooftop terrace with breathtaking city views.',
    createdDate: '5 days ago'
  },
  {
    id: 'prop-103',
    title: 'Pacific Rim Coastal Estate',
    price: 8400000,
    location: 'Malibu, CA 90265',
    beds: 6,
    baths: 7.5,
    area: 9100,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-large-house-with-modern-architecture-and-garden-40251-large.mp4',
    type: 'sale',
    category: 'house',
    isBoosted: true,
    agentId: 'agent-111',
    agentName: 'Brooke Sterling',
    agentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'Breathtaking oceanfront estate sitting right on Malibu’s Carbon Beach. Boasting spectacular sunrise-to-sunset views, a private beach deck, automated screening room, private tennis courts, and custom wine cellar.',
    createdDate: '1 week ago'
  },
  {
    id: 'prop-104',
    title: 'Emerald Luxury Woodlands Villa',
    price: 1650000,
    location: 'Lake Oswego, OR 97034',
    beds: 4,
    baths: 4.5,
    area: 4950,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-cozy-furniture-41719-large.mp4',
    type: 'sale',
    category: 'condo',
    isBoosted: false,
    agentId: 'agent-789',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'An architectural marvel nestled inside absolute forestry. Stunning local natural stone detailing, custom white oak flooring, floating staircase, heated outdoor lounge terrace, and automated wellness spa cabin.',
    createdDate: 'Just now'
  },
  {
    id: 'prop-105',
    title: 'Smart Tech Downtown Condo',
    price: 4800,
    location: 'Downtown Austin, TX 78701',
    beds: 2,
    baths: 2,
    area: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-bright-minimalist-decor-41724-large.mp4',
    type: 'rent',
    category: 'condo',
    isBoosted: false,
    agentId: 'agent-222',
    agentName: 'Tyler Vance',
    agentPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'Smart tech home featuring integrated automation controls, motorized roller shades, built-in sound systems, customized RGB halo lighting, and smart mirror bathrooms. Premium central downtown location near top restaurants.',
    createdDate: '3 days ago'
  },
  {
    id: 'prop-106',
    title: 'Acreage Hilltop Estate Site',
    price: 890000,
    location: 'Saddleback Ridge, CO 80111',
    beds: 0,
    baths: 0,
    area: 217800, // 5 acres
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
    type: 'sale',
    category: 'land',
    isBoosted: false,
    agentId: 'agent-789',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    agencyId: 'agency-999',
    description: 'Fabulous hilltop 5-acre lot with panoramic views of the Rocky Mountains. Soil tests, survey, architectural renders for a 7,500 sqft estate, and all utility links already pre-secured. Build your dream castle immediately!',
    createdDate: '2 weeks ago'
  }
];

// 2. Mock Feed Posts (TikTok style shorts)
export const MOCK_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    propertyId: 'prop-101',
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-minimalist-design-41718-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300',
    caption: 'Showing you around this $3.8M modern marvel in Beverly Hills! Wait for the bathroom reveal! 🔥✨ #luxury #realestate #housetour #fyp',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
    likes: 1284,
    commentsCount: 142,
    saves: 432,
    shares: 201,
    isLiked: false,
    isSaved: false,
    location: 'Beverly Hills, CA',
    comments: [
      { id: 'c1', userName: 'John Doe', userPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60', text: 'This house is absolute goals! That master bedroom is unreal.', timeAgo: '2h ago' },
      { id: 'c2', userName: 'Kelly S.', userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60', text: 'Wait, does the pool have built-in speakers?', timeAgo: '5h ago' }
    ]
  },
  {
    id: 'post-2',
    propertyId: 'prop-102',
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bright-and-modern-living-room-interior-39981-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300',
    caption: 'Best NYC Tribeca Loft Penthouse view? I think yes! Rate this rooftop 1-10!🏙️🗽 #newyorkloft #tribeca #penthouse #nyc #realestate',
    agentName: 'Alex Carter',
    agentPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
    likes: 894,
    commentsCount: 65,
    saves: 184,
    shares: 98,
    isLiked: true,
    isSaved: true,
    location: 'Tribeca, New York',
    comments: [
      { id: 'c3', userName: 'Marcus B', userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60', text: 'Solid 10/10. Tribeca never disappoints.', timeAgo: '1d ago' }
    ]
  },
  {
    id: 'post-3',
    propertyId: 'prop-103',
    type: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-large-house-with-modern-architecture-and-garden-40251-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300',
    caption: 'Waking up on Malibu Carbon beach! 🌅 $8.4M beachfront tour. Watch to see the private tennis court! #malibu #oceanfront #estate #luxuryhomes',
    agentName: 'Brooke Sterling',
    agentPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    likes: 2450,
    commentsCount: 298,
    saves: 874,
    shares: 412,
    isLiked: false,
    isSaved: false,
    location: 'Malibu, CA',
    comments: [
      { id: 'c4', userName: 'Dave R.', userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60', text: 'Imagine walking directly into the sand. Speechless.', timeAgo: '4h ago' }
    ]
  }
];

// 3. Mock Lead Queues
export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-01',
    propertyId: 'prop-101',
    propertyTitle: 'Ultra-Modern Glass Villa',
    buyerName: 'David H. Miller',
    buyerEmail: 'david.miller@gmail.com',
    buyerPhone: '+1 (555) 234-5678',
    message: 'Hello, I am a fully pre-approved cash buyer and would love to schedule an exclusive viewing this upcoming Saturday morning. Please contact me.',
    status: 'new',
    assignedAgentId: 'agent-789',
    assignedAgentName: 'Alex Carter',
    score: 95, // high budget + cash + immediate timing
    slaDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours SLA
    createdDate: '10 mins ago',
    interactions: []
  },
  {
    id: 'lead-02',
    propertyId: 'prop-102',
    propertyTitle: 'Sleek SkyLoft Penthouse',
    buyerName: 'Clara Oswald',
    buyerEmail: 'clara.o@outlook.com',
    buyerPhone: '+1 (555) 765-4321',
    message: 'I am looking to relocate to NYC next month. Is this penthouse fully furnished and available for sub-leasing as well?',
    status: 'assigned',
    assignedAgentId: 'agent-789',
    assignedAgentName: 'Alex Carter',
    score: 72,
    slaDeadline: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // overdue by 1 hr
    createdDate: '3 hours ago',
    interactions: [
      { id: 'int-1', type: 'note', notes: 'Lead assigned automatically to Alex Carter based on active NY licenses and Tribeca coverage.', date: '3 hours ago', operator: 'SLA Engine' }
    ]
  },
  {
    id: 'lead-03',
    propertyId: 'prop-105',
    propertyTitle: 'Smart Tech Downtown Condo',
    buyerName: 'Robert Dow',
    buyerEmail: 'robert@dowtech.io',
    buyerPhone: '+1 (555) 303-9090',
    message: 'Sent an inquiry regarding tech connectivity speed. Let me know.',
    status: 'contacted',
    assignedAgentId: 'agent-222',
    assignedAgentName: 'Tyler Vance',
    score: 65,
    slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdDate: 'Yesterday',
    interactions: [
      { id: 'int-2', type: 'email', notes: 'Sent initial spec sheet containing fiber broadband providers details.', date: 'Yesterday', operator: 'Tyler Vance' }
    ]
  }
];

// 4. Mock Moderation Items
export const MOCK_MODERATION_QUEUE: ModerationItem[] = [
  {
    id: 'mod-1',
    type: 'listing',
    targetId: 'prop-104',
    title: 'Emerald Luxury Woodlands Villa',
    reporterName: 'Automated Image Mod',
    reason: 'Suspicious duplicate image detected from another site.',
    status: 'pending',
    flagCount: 1,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100',
    createdDate: '1 hour ago'
  },
  {
    id: 'mod-2',
    type: 'post',
    targetId: 'post-1',
    title: 'Showing you around this $3.8M Beverly Hills House Tour',
    reporterName: 'User Report (SteveG)',
    reason: 'Spam keywords and excessive marketing tags in caption.',
    status: 'pending',
    flagCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100',
    createdDate: '4 hours ago'
  }
];

// 5. Subscription Tiers
export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'tier-free',
    name: 'Standard Agent',
    price: 0,
    period: 'month',
    features: [
      'Up to 3 active listings',
      'Basic search appearance',
      'Standard lead email delivery',
      '1 photo upload per listing'
    ]
  },
  {
    id: 'tier-pro',
    name: 'Pro Agent Growth',
    price: 49,
    period: 'month',
    features: [
      'Unlimited active listings',
      'Full media uploads (10+ photos & Video)',
      'Automated Lead Scoring and Assignment',
      '2 free boost credits per month',
      'Priority verification badge',
      'Detailed analytical dashboard'
    ],
    recommended: true
  },
  {
    id: 'tier-agency',
    name: 'Agency Scale Pack',
    price: 199,
    period: 'month',
    features: [
      'All Pro features for up to 15 agents',
      'Centralized Lead Routing console',
      'Direct CRM integration options',
      '10 free boost credits per month',
      'Dedicated success account manager',
      'Custom agency branding on active listings'
    ]
  }
];
