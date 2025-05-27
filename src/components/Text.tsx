import { cn } from "@/lib/utils";

export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl text-center font-bold text-gray-900 mb-2",
        className
      )}
    >
      {children}
    </h1>
  );
}
