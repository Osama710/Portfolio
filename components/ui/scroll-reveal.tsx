"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  y = 24,
  once = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
