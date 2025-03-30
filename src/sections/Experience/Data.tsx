import { ExperienceCard } from "./Child/ExperienceCard/ExperienceCard";

export const experienceData = [
  {
    title: "Fullstack Developer",
    content: (
      <ExperienceCard
        title="Toploker.com"
        date="May 2024 - Present"
        content="I work at Toploker.com as a Fullstack Developer. My job involves building management systems for the company. I also look for ways to improve our team and develop better algorithms to save time or increase company's value."
        technologies={[
          "Web Development",
          "Algorithm Design",
          "System Architecture",
          "Team Collaboration",
        ]}
      />
    ),
  },
  {
    title: "Web Technology Competition",
    content: (
      <ExperienceCard
        title="LKS Web Technology"
        date="February 2024"
        content="I won the LKS Web Technology Competition in Banjarnegara, where I competed by building a full-stack web app with payment gateway integration. The stack used in this competition was Laravel."
        technologies={[
          "Laravel",
          "Full-stack Development",
          "Payment Gateway",
          "Competition",
        ]}
      />
    ),
  },
  {
    title: "Junior Software Engineer",
    content: (
      <ExperienceCard
        title="Akastra Toyota"
        date="March 2023 - March 2024"
        content="I started my programming journey here at Akastra Toyota as an Intern Junior Software Engineer. I've built and participated in many incredible projects here. This is the place that I prepared myself to be a future-ready programmer."
        technologies={[
          "Laravel",
          "NodeJS",
          "Software Development",
          "Team Projects",
          "Databases",
        ]}
      />
    ),
  },
  {
    title: "IT Software Solution Competition",
    content: (
      <ExperienceCard
        title="IT Software Solution For Business"
        date="March 2023"
        content="I participated in LKS IT Software Solution For Business and became the champion in Banjarnegara. I made my way through the provincial competition. Even though I didn't win in the provincial stage, I'm highly proud to made it this far."
        technologies={[
          "C#",
          "Software Development",
          "Business Solutions",
          "Competition",
          "Databases",
        ]}
      />
    ),
  },
  {
    title: "English Certification",
    content: (
      <ExperienceCard
        title="TOEIC Test"
        date="August 2022"
        content="I took the TOEIC Test, which is a benchmark for assessing someone's English skills. I scored 800 points out of 1000, which placed me in the 'advanced' level in terms of English proficiency."
        technologies={[
          "English Proficiency",
          "Advanced Level",
          "International Communication",
          "Score: 800/1000",
        ]}
      />
    ),
  },
];
