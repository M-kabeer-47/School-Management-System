import { SidebarItem, User } from "@/lib/admin/types/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  MessageSquare, 
  FileText, 
  Settings 
} from "lucide-react";

export const adminMenuItems: SidebarItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/students",
    label: "Students",
    icon: Users,
  },
  {
    href: "/admin/teachers",
    label: "Teachers",
    icon: GraduationCap,
  },
  {
    href: "/admin/classes",
    label: "Classes",
    icon: BookOpen,
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    icon: Calendar,
  },
  {
    href: "/admin/finance",
    label: "Finance",
    icon: DollarSign,
  },
  {
    href: "/admin/communication",
    label: "Communication",
    icon: MessageSquare,
    badge: true,
  },
  {
    href: "/admin/reports",
    label: "Reports",
    icon: FileText,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const adminUser: User = {
  name: "Admin User",
  email: "admin@school.edu",
  role: "System Administrator",
  avatarUrl: undefined,
};
