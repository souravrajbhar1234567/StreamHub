import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Video,
  CreditCard,
  Receipt,
  MessageSquare,
  Flag,
  Calendar,
  Download,
  ShieldAlert,
} from "lucide-react";

export default function AdminSidebar() {
  const links = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/videos", label: "Videos", icon: Video },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
    { to: "/admin/payments", label: "Payments", icon: Receipt },
    { to: "/admin/comments", label: "Comments", icon: MessageSquare },
    { to: "/admin/reports", label: "Reports", icon: Flag },
    { to: "/admin/meetings", label: "Meetings", icon: Calendar },
    { to: "/admin/downloads", label: "Downloads", icon: Download },
    { to: "/admin/audit-logs", label: "Audit Logs", icon: ShieldAlert },
  ];

  return (
    <aside className="admin-side-navigation">
      <div className="admin-nav-header">ADMIN CONSOLE</div>
      <nav className="admin-nav-menu">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
