import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { attendanceRows, type AttendanceSource } from "@/data/portalData";

type Week = "current" | "previous";

const weekLabel: Record<Week, string> = {
  current: "Semana actual",
  previous: "Semana anterior",
};

const sourceMeta: Record<AttendanceSource, { tone: "info" | "ok" | "neutral" | "warn"; label: string }> = {
  face: { tone: "info", label: "Reconocimiento" },
  kiosk: { tone: "ok", label: "Kiosco" },
  manual: { tone: "neutral", label: "Manual" },
  qr_pin_fallback: { tone: "warn", label: "QR / PIN" },
  apieimport: { tone: "warn", label: "Importado" },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", { weekday: "short", day: "2-digit", month: "short" });
}

export function AttendancesTab() {
  const [week, setWeek] = useState<Week>("current");

  // Filtro decorativo: en mock todas las filas pertenecen a "current".
  const rows = useMemo(() => {
    if (week === "current") return attendanceRows;
    return attendanceRows.slice(0, 6);
  }, [week]);

  const totalHours = rows.reduce((acc, r) => acc + r.workedHours, 0);
  const uniqueEmployees = new Set(rows.map((r) => r.employeeName)).size;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Asistencias</h2>
          <p className="text-sm text-muted-foreground">
            Registros de entrada y salida del personal asignado a su servicio.
          </p>
        </div>
        <Select value={week} onValueChange={(v) => setWeek(v as Week)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(weekLabel) as Week[]).map((k) => (
              <SelectItem key={k} value={k}>{weekLabel[k]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Empleados activos</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{uniqueEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Registros</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{rows.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Horas trabajadas</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{totalHours.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalle</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead className="text-right">Horas</TableHead>
                <TableHead>Origen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const meta = sourceMeta[r.source];
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.employeeName}</TableCell>
                    <TableCell className="text-muted-foreground">{fmtDate(r.date)}</TableCell>
                    <TableCell className="tabular-nums">{r.checkIn}</TableCell>
                    <TableCell className="tabular-nums">
                      {r.checkOut ?? <span className="text-muted-foreground italic">en curso</span>}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.workedHours > 0 ? r.workedHours.toFixed(1) : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
