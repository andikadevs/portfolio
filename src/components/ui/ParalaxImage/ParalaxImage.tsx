import { motion, useScroll } from "motion/react";
import { useRef } from "react";

export const ParallaxImage = ({
  speed = 0.5,
  className,
}: {
  speed?: number;
  className: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        translateY: `calc(${speed * 100}px * ${scrollYProgress})`,
      }}
    />
  );
};
