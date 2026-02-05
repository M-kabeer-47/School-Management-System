import { Icons } from "@/utils/admin/icons";
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
    subItems: [
      {
        label: "Fee Management",
        href: "/admin/finance/fee-management",
        icon: Icons.Receipt,
      },
      {
        label: "Salary Management",
        href: "/admin/finance/salary",
        icon: Icons.DollarSign,
      },
      {
        label: "Other Expenses",
        href: "/admin/finance/expenses",
        icon: Icons.BookMarked,
      },
    ],
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
    subItems: [
      {
        label: "Announcements",
        href: "/admin/communication/announcements",
        icon: Icons.Megaphone,
      },
      {
        label: "Messages (SMS / Email)",
        href: "/admin/communication/messages",
        icon: Icons.MessageSquare,
      }
    ],
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
