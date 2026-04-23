// HARDCODED MOCK DATA — reemplazar por consultas Odoo JSON-RPC en integración futura.
// Las formas de los objetos se mantienen cercanas a los modelos reales de Odoo:
//   - quality.check, hr.attendance, mrp.workorder, res.partner
//
// Punto único de cambio: este archivo. Importar siempre desde "@/data/portalData".

export type ServiceStatus = "active" | "paused" | "review";

export interface ClientProfile {
  clientName: string;
  serviceName: string;
  site: string;
  status: ServiceStatus;
  startDate: string;        // ISO
  endDate: string;          // ISO
  reportFrequency: string;  // p.ej. "Semanal"
  yieldTarget: number;      // %
  seishinContact: { name: string; email: string; phone: string };
  lastUpdated: string;      // ISO datetime
}

export interface QCDefect {
  defect_type: string;
  count: number;
  pct: number;              // % del total de NG
}

export interface QCRecentCheck {
  id: number;
  part_reference: string;
  defect_type: string | null;
  piece_qty: number;
  is_ng: boolean;
  create_date: string;      // ISO datetime
}

export interface QCSummary {
  yieldPct: number;
  inspectedPieces: number;
  rejectedPieces: number;
  lastReportDate: string;
  defects: QCDefect[];
  recentChecks: QCRecentCheck[];
  trend: { date: string; yieldPct: number }[]; // últimos 14 días
}

export type AttendanceSource = "face" | "kiosk" | "manual" | "qr_pin_fallback" | "apieimport";

export interface AttendanceRow {
  id: number;
  employeeName: string;
  date: string;             // ISO date
  checkIn: string;          // HH:mm
  checkOut: string | null;  // HH:mm | null si en curso
  workedHours: number;
  source: AttendanceSource;
}

export type WorkOrderState = "draft" | "ready" | "progress" | "done" | "blocked";

export interface WorkOrder {
  id: number;
  reference: string;        // p.ej. WH/MO/00123
  operation: string;        // name
  employeeName: string | null;
  state: WorkOrderState;
  date_planned_start: string;
  date_planned_finished: string;
}

// ──────────────────────────────────────────────────────────────────────────
// Datos
// ──────────────────────────────────────────────────────────────────────────

export const clientProfile: ClientProfile = {
  clientName: "Industrias Vega del Norte",
  serviceName: "Inspección de calidad y staffing operativo",
  site: "Planta Apodaca — Línea de ensamble 2",
  status: "active",
  startDate: "2025-09-01",
  endDate: "2026-08-31",
  reportFrequency: "Semanal",
  yieldTarget: 98.5,
  seishinContact: {
    name: "Ana Robles",
    email: "ana.robles@seishin.com.mx",
    phone: "+52 81 1234 5678",
  },
  lastUpdated: "2026-04-23T09:42:00",
};

export const qcSummary: QCSummary = {
  yieldPct: 97.8,
  inspectedPieces: 12480,
  rejectedPieces: 274,
  lastReportDate: "2026-04-22T18:30:00",
  defects: [
    { defect_type: "Rebaba en borde", count: 92, pct: 33.6 },
    { defect_type: "Pintura corrida", count: 64, pct: 23.4 },
    { defect_type: "Tornillo flojo", count: 48, pct: 17.5 },
    { defect_type: "Marca cosmética", count: 41, pct: 15.0 },
    { defect_type: "Desalineación", count: 29, pct: 10.5 },
  ],
  recentChecks: [
    { id: 1041, part_reference: "VEG-A12-0334", defect_type: "Rebaba en borde", piece_qty: 120, is_ng: true,  create_date: "2026-04-22T17:14:00" },
    { id: 1040, part_reference: "VEG-A12-0333", defect_type: null,               piece_qty: 240, is_ng: false, create_date: "2026-04-22T16:48:00" },
    { id: 1039, part_reference: "VEG-B07-1102", defect_type: "Pintura corrida",  piece_qty: 80,  is_ng: true,  create_date: "2026-04-22T15:22:00" },
    { id: 1038, part_reference: "VEG-A12-0332", defect_type: null,               piece_qty: 300, is_ng: false, create_date: "2026-04-22T14:05:00" },
    { id: 1037, part_reference: "VEG-C03-0089", defect_type: "Tornillo flojo",   piece_qty: 60,  is_ng: true,  create_date: "2026-04-22T12:40:00" },
    { id: 1036, part_reference: "VEG-A12-0331", defect_type: null,               piece_qty: 280, is_ng: false, create_date: "2026-04-22T11:18:00" },
    { id: 1035, part_reference: "VEG-B07-1101", defect_type: "Marca cosmética",  piece_qty: 45,  is_ng: true,  create_date: "2026-04-22T10:02:00" },
    { id: 1034, part_reference: "VEG-A12-0330", defect_type: null,               piece_qty: 320, is_ng: false, create_date: "2026-04-21T18:55:00" },
  ],
  trend: [
    { date: "2026-04-09", yieldPct: 96.4 },
    { date: "2026-04-10", yieldPct: 97.1 },
    { date: "2026-04-11", yieldPct: 97.5 },
    { date: "2026-04-14", yieldPct: 97.9 },
    { date: "2026-04-15", yieldPct: 98.2 },
    { date: "2026-04-16", yieldPct: 97.6 },
    { date: "2026-04-17", yieldPct: 97.8 },
    { date: "2026-04-18", yieldPct: 98.0 },
    { date: "2026-04-21", yieldPct: 97.4 },
    { date: "2026-04-22", yieldPct: 97.8 },
  ],
};

export const attendanceRows: AttendanceRow[] = [
  { id: 501, employeeName: "Carlos Méndez",   date: "2026-04-21", checkIn: "06:58", checkOut: "15:04", workedHours: 8.1, source: "face" },
  { id: 502, employeeName: "Lucía Hernández", date: "2026-04-21", checkIn: "07:02", checkOut: "15:10", workedHours: 8.1, source: "kiosk" },
  { id: 503, employeeName: "Jorge Ramírez",   date: "2026-04-21", checkIn: "07:11", checkOut: "15:00", workedHours: 7.8, source: "face" },
  { id: 504, employeeName: "María Solís",     date: "2026-04-21", checkIn: "07:05", checkOut: "15:08", workedHours: 8.0, source: "manual" },
  { id: 505, employeeName: "Carlos Méndez",   date: "2026-04-22", checkIn: "06:55", checkOut: "15:02", workedHours: 8.1, source: "face" },
  { id: 506, employeeName: "Lucía Hernández", date: "2026-04-22", checkIn: "07:01", checkOut: "15:05", workedHours: 8.1, source: "kiosk" },
  { id: 507, employeeName: "Jorge Ramírez",   date: "2026-04-22", checkIn: "07:18", checkOut: "15:10", workedHours: 7.9, source: "qr_pin_fallback" },
  { id: 508, employeeName: "María Solís",     date: "2026-04-22", checkIn: "07:06", checkOut: "15:11", workedHours: 8.1, source: "face" },
  { id: 509, employeeName: "Pedro Vargas",    date: "2026-04-22", checkIn: "07:00", checkOut: "15:00", workedHours: 8.0, source: "kiosk" },
  { id: 510, employeeName: "Carlos Méndez",   date: "2026-04-23", checkIn: "06:59", checkOut: null,    workedHours: 0,   source: "face" },
  { id: 511, employeeName: "Lucía Hernández", date: "2026-04-23", checkIn: "07:00", checkOut: null,    workedHours: 0,   source: "kiosk" },
  { id: 512, employeeName: "Jorge Ramírez",   date: "2026-04-23", checkIn: "07:14", checkOut: null,    workedHours: 0,   source: "manual" },
];

export const workOrders: WorkOrder[] = [
  { id: 9001, reference: "WH/MO/00231", operation: "Ensamble subconjunto A", employeeName: "Carlos Méndez",   state: "progress", date_planned_start: "2026-04-22T07:00:00", date_planned_finished: "2026-04-23T15:00:00" },
  { id: 9002, reference: "WH/MO/00232", operation: "Pintura y secado",        employeeName: "Lucía Hernández", state: "progress", date_planned_start: "2026-04-22T08:00:00", date_planned_finished: "2026-04-23T16:00:00" },
  { id: 9003, reference: "WH/MO/00233", operation: "Inspección final",        employeeName: "Jorge Ramírez",   state: "ready",    date_planned_start: "2026-04-23T09:00:00", date_planned_finished: "2026-04-24T13:00:00" },
  { id: 9004, reference: "WH/MO/00234", operation: "Empaque y etiquetado",    employeeName: "María Solís",     state: "draft",    date_planned_start: "2026-04-24T07:00:00", date_planned_finished: "2026-04-24T15:00:00" },
  { id: 9005, reference: "WH/MO/00229", operation: "Ensamble subconjunto B",  employeeName: "Pedro Vargas",    state: "blocked",  date_planned_start: "2026-04-21T07:00:00", date_planned_finished: "2026-04-22T15:00:00" },
  { id: 9006, reference: "WH/MO/00228", operation: "Pintura y secado",        employeeName: "Lucía Hernández", state: "done",     date_planned_start: "2026-04-20T07:00:00", date_planned_finished: "2026-04-21T15:00:00" },
  { id: 9007, reference: "WH/MO/00227", operation: "Inspección final",        employeeName: "Jorge Ramírez",   state: "done",     date_planned_start: "2026-04-19T07:00:00", date_planned_finished: "2026-04-20T15:00:00" },
];
