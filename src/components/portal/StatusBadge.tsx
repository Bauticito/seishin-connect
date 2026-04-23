import { cn } from "@/lib/utils";

type Tone = "ok" | "warn" | "bad" | "info" | "neutral";

const toneClasses: Record<Tone, string> = {
  ok: "bg-status-ok-bg text-status-ok ring-status-ok/20",
  warn: "bg-status-warn-bg text-status-warn ring-status-warn/20",
  bad: "bg-status-bad-bg text-status-bad ring-status-bad/20",
  info: "bg-status-info-bg text-status-info ring-status-info/20",
  neutral: "bg-status-neutral-bg text-status-neutral ring-status-neutral/20",
};

interface StatusBadgeProps {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        toneClasses[tone],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", `bg-status-${tone}`)} />
      {children}
    </span>
  );
}
