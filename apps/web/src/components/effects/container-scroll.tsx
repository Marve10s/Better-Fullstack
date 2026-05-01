import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  titleClassName?: string;
}

export function ContainerScroll({
  children,
  className,
  title,
  titleClassName,
}: ContainerScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleTranslate = useTransform(scrollYProgress, [0, 0.5], [80, -40]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -8]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.86, 1]);
  const cardTranslate = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{ perspective: "1200px" }}
    >
      {title ? (
        <motion.div
          style={{ translateY: titleTranslate }}
          className={cn("relative z-10", titleClassName)}
        >
          {title}
        </motion.div>
      ) : null}
      <motion.div
        style={{
          rotateX: cardRotateX,
          scale: cardScale,
          translateY: cardTranslate,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
