import { Routes, Route } from "react-router-dom";

// Layout & Route Guards
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";

// Public Pages
import Home from "../pages/public/Home";
import Pricing from "../pages/public/Pricing";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Videos Pages
import Videos from "../pages/videos/Videos";
import VideoDetails from "../pages/videos/VideoDetails";
import WatchVideo from "../pages/videos/WatchVideo";
import SearchResults from "../pages/videos/SearchResults";

// Subscriptions & Billing
import SubscriptionPlans from "../pages/subscriptions/SubscriptionPlans";
import MySubscription from "../pages/subscriptions/MySubscription";
import Checkout from "../pages/subscriptions/Checkout";
import PaymentSuccess from "../pages/subscriptions/PaymentSuccess";
import PaymentFailed from "../pages/subscriptions/PaymentFailed";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard";
import ContinueWatching from "../pages/dashboard/ContinueWatching";
import WatchHistory from "../pages/dashboard/WatchHistory";
import MyCourses from "../pages/dashboard/MyCourses";

// Downloads Pages
import Downloads from "../pages/downloads/Downloads";

// Meetings & Live Room Pages
import MeetingLobbyPage from "../pages/meetings/MeetingLobby";
import MeetingRoomPage from "../pages/meetings/MeetingRoom";
import CreateMeeting from "../pages/meetings/CreateMeeting";
import JoinMeeting from "../pages/meetings/JoinMeeting";

// User Profile & Security Pages
import Profile from "../pages/profile/Profile";
import Security from "../pages/profile/Security";
import Sessions from "../pages/profile/Sessions";
import Notifications from "../pages/profile/Notifications";

// Admin Portal Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/Users";
import AdminVideos from "../pages/admin/Videos";
import AdminSubscriptions from "../pages/admin/Subscriptions";
import AdminPayments from "../pages/admin/Payments";
import AdminDownloads from "../pages/admin/Downloads";
import AdminMeetings from "../pages/admin/Meetings";
import AdminComments from "../pages/admin/Comments";
import AdminReports from "../pages/admin/Reports";
import AdminAuditLogs from "../pages/admin/AuditLogs";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/plans" element={<SubscriptionPlans />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:id" element={<VideoDetails />} />
      <Route path="/watch/:id" element={<WatchVideo />} />
      <Route path="/search" element={<SearchResults />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Authenticated / Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/continue" element={<ContinueWatching />} />
        <Route path="/history" element={<WatchHistory />} />
        <Route path="/courses" element={<MyCourses />} />

        {/* Subscriptions & Payments */}
        <Route path="/subscription" element={<MySubscription />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* Downloads */}
        <Route path="/downloads" element={<Downloads />} />

        {/* Meetings */}
        <Route path="/meetings" element={<MeetingLobbyPage />} />
        <Route path="/meetings/create" element={<CreateMeeting />} />
        <Route path="/meetings/join" element={<JoinMeeting />} />
        <Route path="/meetings/:roomId" element={<MeetingRoomPage />} />

        {/* Profile & Account Settings */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<RoleRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/videos" element={<AdminVideos />} />
        <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/downloads" element={<AdminDownloads />} />
        <Route path="/admin/meetings" element={<AdminMeetings />} />
        <Route path="/admin/comments" element={<AdminComments />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
