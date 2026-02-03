// DEPRECATED: This file is kept for backward compatibility.
// Please import icons from their respective portal-specific utility files:
// - @/utils/admin/icons
// - @/utils/student/icons
// - @/utils/common/icons

import {
  AdminIcons as AdminIconsSource,
  KPIIcons as KPIIconsSource,
} from "@/utils/admin/icons";
import { PageHeaderIcons as PageHeaderIconsSource } from "@/utils/student/icons";
import {
  SubjectIcons as SubjectIconsSource,
  NavbarIcons as NavbarIconsSource,
  Icons as CommonIconsSource,
} from "@/utils/common/icons";

export const AdminIcons = AdminIconsSource;
export const KPIIcons = KPIIconsSource;
export const PageHeaderIcons = PageHeaderIconsSource;
export const SubjectIcons = SubjectIconsSource;
export const NavbarIcons = NavbarIconsSource;
export const Icons = {
  ...CommonIconsSource,
  ...PageHeaderIconsSource,
  ...SubjectIconsSource,
};
