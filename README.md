# EstateHub — Real Estate Marketplace

A premium full-stack real estate marketplace built with React + Vite + TypeScript, featuring TikTok-style property video feeds, automated lead routing, multi-role dashboards, and a moderation system.

## 🔗 Live Demo
> Deploy to GitHub Pages using the guide below.

## 🚀 Features
- 🏠 Property listings with advanced search & filters
- 📱 TikTok-style vertical video feed (Shorts)
- 🤖 Automated lead capture & agent routing with SLA timers
- 👥 Role-based dashboards: Buyer, Seller, Agent, Agency, Admin
- 🎥 Multi-image & video upload support for listings
- 🛡️ Moderation queue for flagged content
- 💳 Subscription plans & boost credit system

## ⚡ Quick Start (Local)

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

## 🧭 Tech Stack
- **Frontend**: React 19 + TypeScript
- **Router**: React Router v7
- **Icons**: Lucide React
- **Bundler**: Vite 8
- **Styling**: Custom CSS (Glassmorphism dark theme)
- **Backend (Phase 2+)**: Firebase (Firestore, Auth, Storage)

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── ListingCard.tsx
│   ├── VideoPlayer.tsx
│   └── RoleSwitcher.tsx
├── context/
│   └── AuthContext.tsx  # Mock auth + role management
├── pages/
│   ├── Home.tsx
│   ├── Listings.tsx
│   ├── ListingDetail.tsx
│   ├── SubmitListing.tsx
│   ├── Feed.tsx
│   ├── AgentProfile.tsx
│   ├── AgencyProfile.tsx
│   ├── Dashboard.tsx
│   ├── BuyerDashboard.tsx
│   ├── AgentDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── ModerationQueue.tsx
│   └── Billing.tsx
├── mockData.ts         # Mock data (replaces Firebase in Phase 1)
├── App.tsx             # Routes + layout
└── index.css           # Global design system
```
