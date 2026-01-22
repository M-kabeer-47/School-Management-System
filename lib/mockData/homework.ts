import { Homework } from "@/lib/types/homework";

export const homeworkList: Homework[] = [
  // Recent homework (last 7 days)
  {
    id: "hw-001",
    subject: "Mathematics",
    description:
      "<p>Complete <strong>Exercise 5.2</strong> from your textbook: Questions 1 to 10.</p><ul><li>Show all working steps clearly</li><li>Remember to write the formula before solving each problem</li></ul>",
    givenOn: "Jan 20, 2026",
    toBeCheckedOn: "Jan 22, 2026",
    status: "Not checked",
  },
  {
    id: "hw-002",
    subject: "English",
    description:
      "<p>Write a descriptive essay on <strong>'My Favorite Season'</strong> in 200-250 words.</p><p><em>Requirements:</em></p><ul><li>Use proper paragraphs, grammar, and punctuation</li><li>Include at least 5 adjectives</li><li>Include at least 3 similes in your essay</li></ul>",
    givenOn: "Jan 20, 2026",
    toBeCheckedOn: "Jan 24, 2026",
    status: "Not checked",
  },
  {
    id: "hw-003",
    subject: "General Science",
    description:
      "<p>Draw and label the diagram of a <strong>plant cell</strong>. Color it neatly using colored pencils.</p><p>Write 3 differences between plant and animal cells below the diagram.</p>",
    givenOn: "Jan 18, 2026",
    toBeCheckedOn: "Jan 21, 2026",
    status: "Checked",
  },

  // Older homework (for View All)
  {
    id: "hw-004",
    subject: "Urdu",
    description:
      "Learn the poem 'Bachon ki Dunya' and practice writing it 5 times in your Urdu notebook with proper calligraphy.",
    givenOn: "Jan 15, 2026",
    toBeCheckedOn: "Jan 17, 2026",
    status: "Checked",
  },
  {
    id: "hw-005",
    subject: "Islamiat",
    description:
      "Memorize Surah Al-Asr with translation. Write the Arabic text and its Urdu translation in your notebook.",
    givenOn: "Jan 14, 2026",
    toBeCheckedOn: "Jan 16, 2026",
    status: "Checked",
  },
  {
    id: "hw-006",
    subject: "Mathematics",
    description:
      "Practice multiplication tables from 12 to 15. Write each table 3 times and solve the worksheet given in class. Complete Exercise 5.2 from your textbook: Questions 1 to 10. Show all working steps clearly. Remember to write the formula before solving each problem.",
    givenOn: "Jan 13, 2026",
    toBeCheckedOn: "Jan 15, 2026",
    status: "Checked",
  },
  {
    id: "hw-007",
    subject: "Pakistan Studies",
    description:
      "Read Chapter 3: 'Geography of Pakistan' and answer questions A, B, and C from the exercise section on page 45.",
    givenOn: "Jan 12, 2026",
    toBeCheckedOn: "Jan 14, 2026",
    status: "Checked",
  },
  {
    id: "hw-008",
    subject: "Computer Science",
    description:
      "Research and write a short paragraph (100 words) about input and output devices. Bring pictures or drawings of 3 examples of each.",
    givenOn: "Jan 11, 2026",
    toBeCheckedOn: "Jan 13, 2026",
    status: "Checked",
  },
];

// Helper to get recent homework (last 7 days)
export const getRecentHomework = () => {
  return homeworkList.slice(0, 3);
};

// Helper to get all homework
export const getAllHomework = () => {
  return homeworkList;
};
