"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  duration = 0.75,
  triggerOnce = true,
  alwaysAnimate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  triggerOnce?: boolean;
  alwaysAnimate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: triggerOnce, margin: "-50px" });
  const shouldAnimate = alwaysAnimate || inView;

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ lineHeight: 1, paddingBottom: "0.15em" }}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={shouldAnimate ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
            className="inline-block"
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
