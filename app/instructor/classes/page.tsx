import { ClassCard } from "@/components/instructor/classes/ClassCard";
import { classes } from "@/lib/instructor/mock-data/classes";
import { Icons, PageHeaderIcons } from "@/utils/instructor/icons";
// Mock Data

export default function ClassesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-heading font-bold tracking-tight text-text-primary flex items-center gap-2 md:gap-3">
            My Classes
            <PageHeaderIcons.Classes className="w-8 h-8 md:w-12 md:h-12" />
          </h1>
          <p className="text-text-muted mt-1 text-lg">
            Manage your assigned classes and students.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <ClassCard key={cls.id} {...cls} />
        ))}
      </div>
    </div>
  );
}
