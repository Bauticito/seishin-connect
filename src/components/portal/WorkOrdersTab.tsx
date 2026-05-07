import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { workOrders, type WorkOrderState } from "@/data/portalData";

const stateMeta: Record<WorkOrderState, { tone: "neutral" | "warn" | "info" | "ok" | "bad"; label: string }> = {
  draft:    { tone: "neutral", label: "Borrador" },
  ready:    { tone: "warn",    label: "Lista" },
  progress: { tone: "info",    label: "En progreso" },
  done:     { tone: "ok",      label: "Completada" },
  blocked:  { tone: "bad",     label: "Bloqueada" },
};

type Filter = "all" | WorkOrderState;

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("es-MX", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export function WorkOrdersTab() {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(
    () =>
      workOrders.filter(
        (w) => w.employeeName !== null && (filter === "all" || w.state === filter),
      ),
    [filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Órdenes de producción</h2>
          <p className="text-sm text-muted-foreground">
            Operaciones planificadas y en ejecución para su línea de servicio.
          </p>
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="progress">En progreso</SelectItem>
            <SelectItem value="ready">Lista</SelectItem>
            <SelectItem value="draft">Borrador</SelectItem>
            <SelectItem value="done">Completada</SelectItem>
            <SelectItem value="blocked">Bloqueada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Listado ({rows.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <p className="text-sm font-medium text-foreground">Sin órdenes para este filtro</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Cambie el estado seleccionado para ver más resultados.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referencia</TableHead>
                  <TableHead>Operación</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Inicio planificado</TableHead>
                  <TableHead>Fin planificado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((w) => {
                  const meta = stateMeta[w.state];
                  return (
                    <TableRow key={w.id}>
                      <TableCell className="font-medium">{w.reference}</TableCell>
                      <TableCell>{w.operation}</TableCell>
                      <TableCell className="text-muted-foreground">{w.employeeName}</TableCell>
                      <TableCell>
                        <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{fmtDateTime(w.date_planned_start)}</TableCell>
                      <TableCell className="text-muted-foreground">{fmtDateTime(w.date_planned_finished)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
