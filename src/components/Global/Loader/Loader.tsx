"use client";

import { useSpring, animated } from "@react-spring/web";

export const Loader = () => {
  // Fade in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  // Continuous rotation animation
  const spin = useSpring({
    loop: true,
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 1000 },
  });

  // Bouncing animation
  const bounce = useSpring({
    loop: true,
    from: { transform: "translateY(0px)" },
    to: [{ transform: "translateY(-10px)" }, { transform: "translateY(0px)" }],
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div
      style={fadeIn}
      className="h-screen w-full flex items-center justify-center bg-main"
    >
      <div className="flex flex-col items-center gap-6">
        <animated.div style={spin} className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary/30" />
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary" />
        </animated.div>

        <animated.p
          style={bounce}
          className="text-gray-600 text-lg font-medium"
        >
          Loading...
        </animated.p>
      </div>
    </animated.div>
  );
};
