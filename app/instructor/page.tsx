export default function InstructorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Instructor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, Teacher. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for features we discussed */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold leading-none tracking-tight">Classes</h3>
          <p className="text-sm text-muted-foreground mt-2">
            View and manage your assigned classes.
          </p>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold leading-none tracking-tight">
            Attendance
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Quickly mark attendance for today.
          </p>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="font-semibold leading-none tracking-tight">
            Assignments
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create and grade student work.
          </p>
        </div>
      </div>
    </div>
  );
}
