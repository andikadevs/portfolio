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
    const distance = "30px";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}, 0)`;
      case "down":
        return `translate3d(0, -${distance}, 0)`;
      case "left":
        return `translate3d(-${distance}, 0, 0)`;
      case "right":
        return `translate3d(${distance}, 0, 0)`;
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
        transform: "translate3d(0, 0, 0)",
      },
      config: {
        mass: 0.5,
        tension: 200,
        friction: 26,
      },
      delay,
    }),
    {
      amount: 0.1,
      once: true,
      rootMargin: "-50px 0px"
    }
  );

  return (
    <animated.div ref={ref} style={springs} className={className}>
      {children}
    </animated.div>
  );
};
