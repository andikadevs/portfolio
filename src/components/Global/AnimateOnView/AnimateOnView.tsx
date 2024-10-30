"use client";

import React, { ReactNode } from "react";
import { animated, useInView } from "@react-spring/web";

type Direction = "up" | "down" | "left" | "right";

interface AnimateOnViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

export const AnimateOnView: React.FC<AnimateOnViewProps> = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) => {
  const getTransform = (direction: Direction) => {
    const distance = "100px";
    switch (direction) {
      case "up":
        return `translateY(${distance})`;
      case "down":
        return `translateY(-${distance})`;
      case "left":
        return `translateX(-${distance})`;
      case "right":
        return `translateX(${distance})`;
    }
  };

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: getTransform(direction),
      },
      to: {
        opacity: 1,
        transform: "translate(0px)",
      },
      config: {
        tension: 400,
        friction: 14,
        duration: 600,
      },
      delay,
    }),
    {
      amount: 0.2,
      once: true
    }
  );

  return (
    <animated.div ref={ref} style={springs} className={className}>
      {children}
    </animated.div>
  );
};
