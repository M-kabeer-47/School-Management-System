export interface SidebarItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  subItems?: SidebarItem[];
}

export interface User {
  name: string;
  role: string;
  avatarUrl?: string; // Optional, fallback to initials
}

export interface SidebarProps {
  className?: string;
  items: SidebarItem[];
  user: User;
}

