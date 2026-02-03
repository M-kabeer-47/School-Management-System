import { KPIIcons } from "@/utils/admin/icons";
import { StatCard } from "@/components/common/StatCard";

interface ClassKPICardsProps {
  totalStudents: number;
  totalBoys: number;
  totalGirls: number;
  avgAttendance: number;
}

export function ClassKPICards({
  totalStudents,
  totalBoys,
  totalGirls,
  avgAttendance,
}: ClassKPICardsProps) {
  const cards = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: KPIIcons.TotalStudents,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Boys",
      value: totalBoys,
      icon: KPIIcons.Boy,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Girls",
      value: totalGirls,
      icon: KPIIcons.Girl,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      label: "Avg. Attendance",
      value: `${avgAttendance}%`,
      icon: KPIIcons.AttendanceRate,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <StatCard key={card.label} {...card} delay={idx * 0.1} />
      ))}
    </div>
  );
}
