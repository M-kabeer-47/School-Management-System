import { SidebarItem, User } from "@/lib/types/sidebar";
import { Icons } from "@/utils/sidebar/icons";

export const currentUser: User = {
  name: "Ali Khan",
  role: "Class 8-A",
  avatarUrl: "", // Initials fallback
};

export const menuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: Icons.Dashboard },
  { label: "My Child", href: "/profile", icon: Icons.User },
  {
    label: "Attendance",
    href: "/attendance",
    icon: Icons.Calendar,
    badge: "92%",
  },
  { label: "Subjects", href: "/subjects", icon: Icons.BookOpen },
  { label: "Books List", href: "/books", icon: Icons.Library },
  { label: "Report Card", href: "/reports", icon: Icons.GraduationCap },
  { label: "Fees", href: "/fees", icon: Icons.Wallet },
  { label: "Timetable", href: "/timetable", icon: Icons.CalendarClock },
  { label: "Announcements", href: "/announcements", icon: Icons.Megaphone },
  { label: "Help & Support", href: "/support", icon: Icons.MessageSquare },
  { label: "Settings", href: "/settings", icon: Icons.Settings },
];
