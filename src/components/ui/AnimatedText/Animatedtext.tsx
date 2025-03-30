import { motion } from "motion/react";

export const AnimatedText = ({
  text,
  className = "",
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <h1 className={className}>
      {text.split("").map((char: string, index: number) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};
