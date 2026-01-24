import { SidebarItem, User } from "@/lib/types/sidebar";
import { Icons } from "@/utils/sidebar/icons";

export const currentUser: User = {
  name: "Ali Khan",
  role: "Class 8-A",
  avatarUrl: "", // Initials fallback
};

export const menuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: Icons.Dashboard },
  { label: "My Profile", href: "/profile", icon: Icons.User },
  {
    label: "Attendance",
    href: "/attendance",
    icon: Icons.Calendar,
    badge: "92%",
  },
  { label: "Subjects", href: "/subjects", icon: Icons.BookOpen },
  { label: "Homework", href: "/homework", icon: Icons.ClipboardList },
  { label: "Books List", href: "/books", icon: Icons.Library },
  { label: "Report Card", href: "/reports", icon: Icons.GraduationCap },
  { label: "Fees", href: "/fees", icon: Icons.Receipt },
  { label: "Timetable", href: "/pdf-viewer", icon: Icons.CalendarClock },
  { label: "Announcements", href: "/announcements", icon: Icons.Megaphone },
  { label: "Contact School", href: "/contact-school", icon: Icons.MessageSquare },
  { label: "Exams", href: "/exams", icon: Icons.Exams },
];
