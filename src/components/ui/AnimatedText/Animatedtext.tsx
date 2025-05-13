/** @format */

import { motion } from "motion/react";
import { PointerHighlight } from "@/components/ui/PointerHighlight";

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

  const renderText = () => {
    const parts = text.split(/(\[.*?\])/);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const content = part.slice(1, -1);
        return (
          <span key={index} className="inline-block">
            <PointerHighlight>
              {content.split("").map((char: string, charIndex: number) => (
                <motion.span
                  key={charIndex}
                  custom={charIndex}
                  variants={letterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </PointerHighlight>
          </span>
        );
      }
      return part.split("").map((char: string, charIndex: number) => (
        <motion.span
          key={`${index}-${charIndex}`}
          custom={charIndex}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    });
  };

  return <h1 className={className}>{renderText()}</h1>;
};
