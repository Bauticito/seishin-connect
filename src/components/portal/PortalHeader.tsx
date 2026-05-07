import { Activity } from "lucide-react";
import { clientProfile } from "@/data/portalData";
import { StatusBadge } from "./StatusBadge";
import { ThemeToggle } from "./ThemeToggle";

const statusLabel: Record<typeof clientProfile.status, { tone: "ok" | "warn" | "info"; label: string }> = {
  active: { tone: "ok", label: "Servicio activo" },
  paused: { tone: "warn", label: "Servicio en pausa" },
  review: { tone: "info", label: "En revisión" },
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PortalHeader() {
  const status = statusLabel[clientProfile.status];

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <Activity className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Portal Seishin
            </p>
            <h1 className="text-lg font-semibold leading-tight text-foreground">
              {clientProfile.clientName}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">Servicio</p>
            <p className="text-sm font-medium text-foreground">{clientProfile.serviceName}</p>
          </div>
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Última actualización</p>
            <p className="text-sm font-medium text-foreground">{formatDateTime(clientProfile.lastUpdated)}</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
