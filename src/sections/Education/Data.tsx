import { EducationCard } from "./Child";

export const educationData = [
  {
    title: "Bachelor's Degree",
    content: (
      <EducationCard
        institution="STEKOM University"
        degree="Bachelor of Engineering"
        date="June 2024 - Present"
        description="I am an undergraduate at STEKOM University pursuing a Bachelor's Degree in Computer Engineering with a full scholarship."
      />
    ),
  },
  {
    title: "Vocational High School",
    content: (
      <EducationCard
        institution="SMKN 1 Punggelan"
        degree="Network & Application"
        date="June 2020 - April 2024"
        description="I'm a full-time student in the SIJA program, which stands for Sistem Informatika Jaringan dan Aplikasi (Network and Application Information System). This is the place that introduced me to networking and more."
      />
    ),
  },
];
