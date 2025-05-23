import { cn } from "@/lib/utils";
import { useEffect, useRef, ReactNode } from "react";

export function FitText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const resize = () => {
      container.style.setProperty("--scale", "1"); // reset

      const containerWidth = container.offsetWidth;
      const textWidth = text.offsetWidth;

      if (textWidth === 0) return;

      const scale = containerWidth / textWidth;
      container.style.setProperty("--scale", scale.toString());
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "inline-block",
        fontSize: "calc(var(--scale, 1) * 1rem)",
        overflow: "hidden",
      }}
      className={cn("text-center leading-none", className)}
    >
      <span
        ref={textRef}
        className="inline-block font-thunder uppercase text-black/5 whitespace-nowrap"
        style={{ lineHeight: "1", marginBottom: "-20rem" }}
      >
        {children}
      </span>
    </div>
  );
}
