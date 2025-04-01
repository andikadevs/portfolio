"use client";

import {
  AnimatedText,
  Button,
  // ParallaxImage
} from "@/components/ui";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-4 sm:pt-20"
    >
      {/* <ParallaxImage
        speed={-0.2}
        className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-[var(--dark)] blur-[80px] sm:blur-[120px]"
      />
      <ParallaxImage
        speed={0.1}
        className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full bg-[var(--dark)] blur-[60px] sm:blur-[100px]"
      /> */}

      <div className="container border border-red-500 mx-auto px-4 lg:px-[34px] z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 sm:mb-20 relative"
        >
          {/* Animated introduction with character-by-character reveal */}
          <div className="mb-6 sm:mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl font-light text-accent mb-1 sm:mb-2"
            >
              Hello, I&apos;m a
            </motion.p>

            <AnimatedText
              text="Full Stack Developer"
              className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight relative"
            />

            <div className="h-1 w-24 sm:w-32 bg-accent mt-4 sm:mt-6 mb-6 sm:mb-8"></div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl max-w-2xl font-light"
            >
              Creating elegant, high-performance applications with modern web
              technologies.
            </motion.p>
          </div>

          {/* Call to action - matching navbar button styles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 sm:mt-10"
          >
            <Button
              variant="primary"
              href="/portfolio"
              icon={<ArrowRight size={16} />}
            >
              View My Projects
            </Button>

            <Button
              variant="secondary"
              href="https://wa.me/6285743699909"
              icon={<MessageSquare size={16} />}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-text/30 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-text/40 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};
