import { Icons } from "@/utils/sidebar/icons";
import { SidebarItem, User } from "@/lib/student/types/sidebar";

// Mock current user for Instructor Portal
export const currentInstructor: User = {
  name: "Sarah Johnson",
  role: "Senior Math Instructor",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
};

export const instructorMenuItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/instructor",
    icon: Icons.Dashboard,
  },
  {
    label: "My Profile",
    href: "/instructor/profile",
    icon: Icons.User,
  },
  {
    label: "Classes",
    href: "/instructor/classes",
    icon: Icons.BookOpen,
  },
  {
    label: "Exams",
    href: "/instructor/exams",
    icon: Icons.Exams,
  },
  {
    label: "Timetable",
    href: "/instructor/timetable",
    icon: Icons.Calendar,
  },
  {
    label: "Reports",
    href: "/instructor/reports",
    icon: Icons.ClipboardList,
  },
  {
    label: "Contact School",
    href: "/instructor/contact-school",
    icon: Icons.MessageSquare,
  },
  {
    label: "Settings",
    href: "/instructor/settings",
    icon: Icons.Settings,
  },
];
