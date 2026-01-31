import { Icons } from "@/utils/sidebar/icons";
import { SidebarItem, User } from "@/lib/student/types/sidebar";

// Mock current user for Admin Portal
export const currentAdmin: User = {
  name: "Principal Anderson",
  role: "School Administrator",
  avatarUrl:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
};

export const adminMenuItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Icons.Dashboard,
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: Icons.GraduationCap,
  },
  {
    label: "Classes",
    href: "/admin/classes",
    icon: Icons.Users,
  },
  {
    label: "Staff",
    href: "/admin/staff",
    icon: Icons.User,
  },
  {
    label: "Academics",
    href: "/admin/academics",
    icon: Icons.BookOpen,
  },
  {
    label: "Finance",
    href: "/admin/finance",
    icon: Icons.Wallet,
  },
  {
    label: "Exams",
    href: "/admin/exams",
    icon: Icons.Exams,
  },
  {
    label: "Communication",
    href: "/admin/communication",
    icon: Icons.Megaphone,
  },
  {
    label: "Library",
    href: "/admin/library",
    icon: Icons.Library,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Icons.Settings,
  },
];
