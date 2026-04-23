import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { qcSummary, clientProfile } from "@/data/portalData";
import { CheckCircle2, FileText, PackageCheck, ShieldAlert } from "lucide-react";

type Period = "7d" | "30d" | "month";

const periodLabel: Record<Period, string> = {
  "7d": "Últimos 7 días",
  "30d": "Últimos 30 días",
  month: "Mes actual",
};

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("es-MX", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

function MetricCard({
  icon: Icon, label, value, sub, tone = "neutral",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  tone?: "ok" | "warn" | "bad" | "info" | "neutral";
}) {
  const toneRing: Record<string, string> = {
    ok: "text-status-ok bg-status-ok-bg",
    warn: "text-status-warn bg-status-warn-bg",
    bad: "text-status-bad bg-status-bad-bg",
    info: "text-status-info bg-status-info-bg",
    neutral: "text-foreground bg-muted",
  };
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${toneRing[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function QCTab() {
  const [period, setPeriod] = useState<Period>("7d");

  // El periodo es decorativo en este prototipo (datos mock fijos), pero
  // mantenemos el control para que la UI sea representativa.
  const summary = useMemo(() => qcSummary, []);

  const yieldTone: "ok" | "warn" | "bad" =
    summary.yieldPct >= clientProfile.yieldTarget ? "ok"
    : summary.yieldPct >= clientProfile.yieldTarget - 1.5 ? "warn"
    : "bad";

  const maxDefect = Math.max(...summary.defects.map((d) => d.count));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Control de calidad</h2>
          <p className="text-sm text-muted-foreground">
            Resultados de inspección reportados por el equipo en planta.
          </p>
        </div>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(periodLabel) as Period[]).map((k) => (
              <SelectItem key={k} value={k}>{periodLabel[k]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={CheckCircle2}
          label="Yield"
          value={`${summary.yieldPct.toFixed(1)}%`}
          sub={`Meta ${clientProfile.yieldTarget.toFixed(1)}%`}
          tone={yieldTone}
        />
        <MetricCard
          icon={PackageCheck}
          label="Piezas inspeccionadas"
          value={summary.inspectedPieces.toLocaleString("es-MX")}
        />
        <MetricCard
          icon={ShieldAlert}
          label="Rechazos (NG)"
          value={summary.rejectedPieces.toLocaleString("es-MX")}
          tone="bad"
        />
        <MetricCard
          icon={FileText}
          label="Último reporte"
          value={fmtDateTime(summary.lastReportDate)}
          tone="info"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Inspecciones recientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referencia</TableHead>
                  <TableHead>Defecto</TableHead>
                  <TableHead className="text-right">Piezas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.recentChecks.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.part_reference}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.defect_type ?? <span className="italic text-muted-foreground/70">—</span>}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{c.piece_qty}</TableCell>
                    <TableCell>
                      <StatusBadge tone={c.is_ng ? "bad" : "ok"}>
                        {c.is_ng ? "NG" : "OK"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{fmtDateTime(c.create_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribución de defectos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {summary.defects.map((d) => (
              <div key={d.defect_type}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{d.defect_type}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {d.count} <span className="text-xs">({d.pct.toFixed(1)}%)</span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${(d.count / maxDefect) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
