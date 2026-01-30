# Universal Student Data Import Strategy

To win the trust of schools, we cannot force them to format their data to fit us. We must build a system that adapts to _their_ data. This requires a **"Universal Import Wizard"** with a powerful **Mapping Layer**.

## The Core Philosophy: "Upload First, Map Second"

Never ask the user to "download our template and copy-paste." That is friction. Let them upload their existing messy Excel sheet, and we provide a UI to make sense of it.

---

## 🚀 The 4-Step Workflow

### Phase 1: File Ingestion (The "Dump" Phase)

- **Action**: Admin uploads their existing `students.xlsx`, `enrollment_data.csv`, etc.
- **System**: Parses the file immediately (client-side using `xlsx` library or server-side) and reads just the **Header Row**.
- **Display**: Show a preview of the first 5 rows so they confirm it's the right file.

### Phase 2: The "Rosetta Stone" Mapping Layer (CRITICAL STEP)

This is where we solve the "different names" issue.

- **UI**: A Two-Column Mapping Interface.
  - **Left Column (Our System)**: Fixed list of our schema fields (e.g., `First Name`, `Last Name`, `DOB`, `Father CNIC`).
  - **Right Column (Their File)**: Dropdowns containing the headers from their uploaded file.
- **Intelligence**: The system uses "Fuzzy Matching" to auto-suggest mappings.
  - If they have a column `Student Name`, we map it to `fullName`.
  - If they have `Grade`, we map it to `class`.
  - If they have `Father's Mobile`, `Parent Ph`, `Contact #`, we map it to `fatherPhone`.
- **Correction**: The user manually corrects any wrong guesses (e.g., mapping `Adm #` to `admissionNumber`).

### Phase 3: Validation & Transformation Sandbox

Before saving a single record, we run a "Dry Run" import.

- **Data Type Checks**: "Row 45: `DOB` is 'Unknown' - Invalid Date Format".
- **Duplicate Checks**: "Row 12: CNIC `35202...` already exists in the system."
- **Transformation**:
  - _System_: "We see 'Male', 'M', 'Boy' in your Gender column. We will standardize all these to 'Male'."
  - _System_: "We see 'Grade 5', '5th', 'Five'. We will map these to Class ID: 5."
- **UI**: The user sees a "Health Report": "450 Rows Ready, 12 Rows Need Attention." They can fix data right there in a grid view or re-upload.

### Phase 4: The Intelligent Import

- The system processes the valid records.
- **Custom Fields**: If a school has a column `Bus Route` that we don't have, we ask: _"We noticed an extra column 'Bus Route'. Do you want to save this as a Custom Field?"_ If yes, we store it in a generic `metadata` JSON field or create a new Dynamic Attribute.
- **Outcome**: A trust-building success report. "Successfully imported 460 students. 2 duplicates skipped."

---

## Technical Architecture

### 1. The Schema Mapper

A JSON configuration that holds the mapping state.

```typescript
interface ImportMapping {
  // Our Field : Their Header
  firstName: "Std Name";
  dob: "Date of Birth";
  gender: "Sex";
  fatherPhone: "Emergency Contact";
}
```

### 2. The Transformer Engine

A set of utility functions that run on specific field types.

- `parseDate(value)`: Tries DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, and textual dates.
- `cleanPhone(value)`: Strips dashes, spaces, adds country code.

### 3. Dynamic Schema (for "Unknown Fields")

We add a `metadata` JSONB column to our `Student` table.

- If they import "Allergies" (which we don't have), we save it as `student.metadata.allergies`.
- This ensures **Zero Data Loss**. The school trusts us because we didn't throw away their data.

## UI Components to Build

1.  **`FileDropzone`**: For drag-and-drop Excel/CSV.
2.  **`ColumnMapper`**: A list of rows where user matches `Source Column` -> `Target Field`.
3.  **`DataReviewGrid`**: A spreadsheet-like view to correct errors before final commit.

this is the sophisticated, high-trust approach used by enterprise CRMs like HubSpot and Salesforce.
