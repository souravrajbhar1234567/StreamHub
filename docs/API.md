# StreamHub API Reference

All requests to protected endpoints require an `Authorization: Bearer <token>` header.

## 1. Authentication & Security (`/api/v1/auth`, `/api/v1/security`)
- `POST /api/v1/auth/register` - Create a new user account.
- `POST /api/v1/auth/login` - Authenticate user credentials and return JWT & Refresh tokens.
- `POST /api/v1/auth/logout` - Invalidate current session.
- `POST /api/v1/auth/refresh-token` - Renew access token using refresh token.
- `POST /api/v1/auth/verify-otp` - Verify email OTP code.
- `POST /api/v1/auth/forgot-password` - Request password reset link.
- `POST /api/v1/auth/reset-password` - Update password with reset token.
- `GET  /api/v1/security/sessions` - List active user login sessions.
- `DELETE /api/v1/security/sessions/:id` - Terminate a specific session.
- `GET  /api/v1/security/trusted-devices` - List registered trusted hardware.

## 2. Videos & Streaming (`/api/v1/videos`, `/api/v1/watch`)
- `GET  /api/v1/videos` - Search & filter video catalog (pagination, category, sort).
- `GET  /api/v1/videos/:id` - Get metadata for a specific video.
- `GET  /api/v1/videos/stream/:id` - Stream video file with HTTP 206 Partial Content range requests.
- `POST /api/v1/videos` - Upload a new video (Admin/Creator).
- `POST /api/v1/watch/progress/:id` - Save playback timestamp and completion percentage.
- `GET  /api/v1/watch/history` - Retrieve user watch history.

## 3. Subscriptions & Billing (`/api/v1/subscriptions`, `/api/v1/payments`)
- `GET  /api/v1/subscriptions/plans` - List available subscription plans.
- `GET  /api/v1/subscriptions/my` - Fetch current user subscription status and expiry.
- `POST /api/v1/payments/create-order` - Create a Razorpay checkout order.
- `POST /api/v1/payments/verify` - Verify Razorpay payment signature & activate subscription.
- `GET  /api/v1/payments/history` - User transaction history and downloadable receipts.

## 4. WebRTC Meetings (`/api/v1/meetings`)
- `POST /api/v1/meetings/create` - Generate a new meeting room.
- `GET  /api/v1/meetings/:roomId` - Verify room status and retrieve metadata.
- `POST /api/v1/meetings/:roomId/end` - Host termination of meeting room.

## 5. Downloads (`/api/v1/downloads`)
- `GET  /api/v1/downloads/quota` - Check remaining daily download limit.
- `POST /api/v1/downloads/:videoId` - Generate secure temporary download link.
- `GET  /api/v1/downloads` - List active and historical offline downloads.

## 6. Admin Portal (`/api/v1/admin`)
- `GET  /api/v1/admin/stats` - Platform metrics (Revenue, Users, Active Subscriptions, Stream Bandwidth).
- `GET  /api/v1/admin/users` - Manage user accounts and permission roles.
- `GET  /api/v1/admin/subscriptions` - View all subscription lifecycles.
- `GET  /api/v1/admin/payments` - Global transaction ledger.
- `GET  /api/v1/admin/downloads` - System-wide download metrics.
- `GET  /api/v1/admin/audit-logs` - Immutable security logs.
