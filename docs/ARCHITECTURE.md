# StreamHub Architecture Documentation

## 1. System Overview

StreamHub is an enterprise-grade full-stack video streaming, learning, WebRTC real-time meetings, offline download, and subscription platform.

```
┌─────────────────────────────────────────────────────────────┐
│                     React 19 Frontend                       │
│  - SPA with React Router 7                                  │
│  - Custom HTML5 Video Player Engine (Theater, PiP, Seek)    │
│  - WebRTC Peer-to-Peer Video/Audio + Screen Share           │
│  - Socket.io Client for Instant Chat & Room Presence        │
│  - Theme Engine (Light/Dark) + Responsive Design System     │
└──────────────┬──────────────────────────────┬───────────────┘
               │ HTTP / REST                  │ WebSocket
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Express.js Backend Server                   │
│  - REST API Routes & Middlewares                            │
│  - JWT Bearer Authentication & Session Token Refresh        │
│  - Rate Limiter & Security Shields (Helmet, MongoSanitize)  │
│  - Socket.io Hub (Signaling, Rooms, Chat, Heartbeat)        │
│  - Automated Cron Jobs (Session cleanup, Quota reset)       │
└──────────────┬──────────────┬───────────────┬───────────────┘
               │              │               │
               ▼              ▼               ▼
        ┌─────────────┐ ┌───────────┐ ┌──────────────┐
        │   MongoDB   │ │   Redis   │ │ Razorpay API │
        │   (Atlas)   │ │  (Cache)  │ │ (Webhooks)   │
        └─────────────┘ └───────────┘ └──────────────┘
```

## 2. Key Modules

### A. Video Streaming Engine
- Dynamic range requests (`bytes=start-end`) supported for chunked audio/video streaming.
- Multi-bitrate selection, custom playback rate (0.5x to 2x), theater mode, and picture-in-picture.
- Watch progress auto-sync with resume capability (`WatchProgress` model).

### B. WebRTC Peer-to-Peer Meetings
- Mesh architecture WebRTC signaling powered by Socket.io.
- Full camera/mic toggling, screen-sharing using `getDisplayMedia`, hand-raising, in-meeting chat, and participant grid.

### C. Quota-Controlled Offline Downloads
- Encrypted one-time download URLs generated with cryptographic tokens (`DownloadLock`).
- Plan-based quota enforcement (daily limits and file size caps).

### D. Subscriptions & Payments
- Tiered subscription model (Free, Pro, Premium) integrated with Razorpay payment orders, signature verification, and automated invoice PDF generation.

### E. Security & Auditing
- Tamper-proof audit logs recording IP address, User-Agent, action name, and status.
- Device fingerprinting and trusted device verification with multi-factor OTP fallbacks.
