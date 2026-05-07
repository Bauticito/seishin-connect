import { Building2, Calendar, Mail, Phone, Target, User2, Repeat } from "lucide-react";
import { Card } from "@/components/ui/card";
import { clientProfile } from "@/data/portalData";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}

export function ServiceSummary() {
  const items = [
    { icon: Building2, label: "Planta / Sitio", value: clientProfile.site },
    {
      icon: Calendar,
      label: "Vigencia",
      value: `${fmtDate(clientProfile.startDate)} → ${fmtDate(clientProfile.endDate)}`,
    },
    { icon: Repeat, label: "Frecuencia de reporte", value: clientProfile.reportFrequency },
    {
      icon: Target,
      label: "Meta de yield",
      value: `${clientProfile.yieldTarget.toFixed(1)}%`,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 bg-card p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-0.5 truncate text-sm font-medium text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <User2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Contacto Seishin:</span>
          <span className="font-medium text-foreground">{clientProfile.seishinContact.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <a href={`mailto:${clientProfile.seishinContact.email}`} className="inline-flex items-center gap-1.5 hover:text-brand">
            <Mail className="h-3.5 w-3.5" />
            {clientProfile.seishinContact.email}
          </a>
          <a href={`tel:${clientProfile.seishinContact.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand">
            <Phone className="h-3.5 w-3.5" />
            {clientProfile.seishinContact.phone}
          </a>
        </div>
      </div>
    </Card>
  );
}
