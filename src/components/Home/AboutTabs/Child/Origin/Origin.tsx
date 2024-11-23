import { AnimateOnView, Clock } from "@/components/Global";
import { calculateAgeDetails } from "@/utils/Global";

export const Origin: React.FC = () => {
  const birthDate = new Date("2005-07-09");
  const { years, days } = calculateAgeDetails(birthDate);

  const personalDetails = [
    { label: "Fullname", value: "Andika Dwi Saputra" },
    { label: "Nationality", value: "Indonesia" },
    { label: "Origin", value: "Central Java, Indonesia" },
    { label: "Age", value: `${years} years ${days} days`, showClock: true },
  ];

  return (
    <AnimateOnView direction="left">
      <div className="space-y-6">
        <h3 className="text-text text-3xl">
          My <span className="text-accent">Origin</span>
        </h3>

        <p className="text-text">
          I was born in <span className="text-accent">Banjarnegara</span> on July
          9th, 2005, and I have lived there ever since. Computers were not really
          my thing, I had no access to computers back then. My first time handling
          a computer was when I was in Senior High School. I couldn`t even turn on
          a computer back then. However, I found my passion there. I have always
          studied hard ever since, working on building myself to become a
          future-ready <span className="text-accent">Programmer</span>.
        </p>

        <div className="space-y-2">
          {personalDetails.map(({ label, value, showClock }) => (
            <p key={label} className="text-text">
              <span className="text-accent">{label}:&nbsp;</span>
              {value} {showClock && <Clock />}
            </p>
          ))}
        </div>
      </div>
    </AnimateOnView>
  );
};
