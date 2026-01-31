# Admin Classes Page - Creative Redesign

> **Concept**: "The Classroom Grid"
> **Aesthetic**: Premium, Organized, vibrant, and approachable. Not a spreadsheet.
> **Core Principle**: A "Class Section" (e.g., Grade 1-A) is the atomic unit of the school. It deserves its own identity.

## 1. Visual Strategy: The "Class Card"

Instead of rows, we use highly visual **Class Cards**. Each card represents ONE section (e.g., 5-A).

### Card Anatomy

- **Header**:
  - **Big Typography**: "5-A" (Grade 5, Section A) displayed in a large, custom font.
  - **Color Strip**: Each Grade level gets a unique pastel color accent (Grade 1 = Blue, Grade 2 = Green, etc.) to visually group them.
- **Teacher Spotlight**:
  - A large, friendly Avatar of the Class Teacher right in the center or top-right.
  - Name below: "Mrs. Sarah"
- **Vital Stats (Micro-Dashboard)**:
  - **Students**: "24/30" (with a circular progress ring for capacity).
  - **Room**: "Room 102" (with a door icon).
  - **Gender Split**: Small icons of Boy/Girl counts (e.g., 12B / 12G).
- **Actions (Hover Reveal)**:
  - "View Students" (Primary Action)
  - "Attendance"
  - "Edit"

## 2. Page Layout

- **Grid**: Responsive Grid (3 columns on desktop, 1 on mobile).
- **Grouping**: Cards are grouped by Grade Level with a soft header: "Primary Years (1-5)", "Middle Years (6-8)".
- **Filters**: A sleek pill-bar at the top to filter by Grade or search for a specific teacher.

## 3. Interaction Design

- **Hover**: Card lifts slightly, shadow deepens. The "View Students" button slides up from the bottom.
- **Click**: Opens a "Class Detail" drawer or modal (or navigates to detail page).

## 4. Why this matches "Student Portal" Vibe

- It's friendly and graphical, not bureaucratic.
- It focuses on _people_ (Teacher, Students) rather than data rows.
- It makes the school look "active" and "alive".

## 5. Mock Data Structure (Flattened)

```typescript
type ClassSection = {
  id: string; // "1-a"
  grade: string; // "Grade 1"
  section: string; // "A"
  classTeacher: { name: string; avatar: string; id: string };
  room: string;
  stats: {
    current: number;
    capacity: number;
    boys: number;
    girls: number;
  };
  colorTheme: string; // e.g., "bg-blue-50 text-blue-600"
};
```

## 6. Implementation Plan

1.  **Refactor Mock Data**: Convert hierarchical data to a flat `getAllClassSections()` list.
2.  **Component**: Build `ClassSectionCard.tsx`.
3.  **Component**: Build `ClassGrid.tsx`.
4.  **Page**: Update `app/admin/classes/page.tsx` to use the Grid.
