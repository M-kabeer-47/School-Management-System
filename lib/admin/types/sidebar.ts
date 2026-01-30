export interface SidebarItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: boolean;
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  user: User;
}
