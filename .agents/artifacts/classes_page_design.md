# Admin Portal - Classes Page Design

This page allows admins to manage the academic structure of the school (Classes and Sections).

## 1. Core Data & hierarchy

- **Class (Grade)**: The top-level entity (e.g., "Grade 5").
- **Section**: Sub-entity (e.g., "Section A", "Section Blue").
- **Class Teacher**: The instructor assigned to a specific Section.

## 2. Page Layout & Features

### A. Header

- **Title**: "Classes & Sections"
- **Stats**: Total Classes, Total Sections, Unassigned Class Teachers.
- **Action**: `+ Add New Class` button.

### B. The Main View (Accordion / Hierarchical List)

Instead of a flat table, we use a collapsible list to show hierarchy clearly.

- **Row (Class Level)**:
  - **Grade Name** (e.g., "Grade 10")
  - **Total Students**: Aggregate count from all sections.
  - **Total Sections**: "3 Sections (A, B, C)"
  - **Actions**: Edit Class Name, Delete Class.

- **Expanded View (Section Level) - Inside Class Row**:
  - A table showing sections for that class.
  - **Columns**:
    - **Section Name** ("Section A")
    - **Class Teacher** (Dropdown to assign/change)
    - **Room Number**
    - **Students Count** (Link to filtered student list: `admin/students?class=10&section=A`)
    - **Capacity** (e.g., 25/30)
    - **Actions**: Edit Section, Delete Section.
  - **Footer**: `+ Add Section to Grade 10`

## 3. Key Functionalities to Handle

1.  **Add Class/Section**:
    - Modal to create a new Grade (e.g., "Grade 11").
    - Modal to add a Section to an existing Grade.
2.  **Assign Class Teacher**:
    - Critical administrative task.
    - Logic: One teacher can be a class teacher for only ONE section (usually). Warning if re-assigning.
3.  **Delete Protection**:
    - Cannot delete a Section if it has active Students.
    - Cannot delete a Class if it has Sections.
4.  **Room Management** (Optional but good):
    - Assigning a physical room number to a section.

## 4. Mock Data Structure

```typescript
type ClassGrade = {
  id: string; // "class-10"
  name: string; // "Grade 10"
  order: number; // For sorting (1, 2, ... 10)
  sections: Section[];
};

type Section = {
  id: string; // "sec-10-a"
  name: string; // "A"
  classTeacherId?: string; // Link to Instructor
  roomNo?: string;
  studentCount: number;
  capacity: number;
};
```

## 5. Summary of View options

- **Accordion List**: Best for hierarchy.
- **Grid Cards**: Use if you want a visual overview (one card per Grade).

I recommend the **Accordion List** details view for better management density.
