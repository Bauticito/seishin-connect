# Portal Cliente Seishin — Prototipo para Lovable

## Resumen

Construir en Lovable un **prototipo standalone**, no embebido en Odoo, para **un solo cliente fijo** y **sin login**. La app debe verse como un portal real, pero su objetivo es **demo comercial / validación visual**, no integración productiva.

La experiencia será **Dashboard + tabs**, con dos capas:

1. **Resumen comercial del servicio contratado**

2. **Resumen operativo de ejecución** con tabs de `QC`, `Asistencias` y `Órdenes`

El portal debe usar **datos semi-reales**: hardcodeados o mockeados, pero con forma cercana a los datos reales de Odoo para facilitar una integración futura.

## Cambios / Construcción

### 1. Alcance funcional del prototipo

- Hacer una sola app de una pantalla principal, sin routing complejo.

- Header con:

  - nombre del cliente

  - nombre del servicio contratado

  - estado general del servicio

  - fecha de última actualización

- Bloque superior “Resumen del servicio” con:

  - cliente

  - servicio contratado

  - planta o sitio atendido

  - vigencia

  - frecuencia de reporte

  - objetivo de yield o meta operativa

  - contacto Seishin

  - estado general

- No mostrar precios, montos ni facturación en esta versión.

### 2. Navegación y estructura visual

- Usar **dashboard principal** con **tabs**, no sidebar ni multipágina.

- Tabs:

  - `QC`

  - `Asistencias`

  - `Órdenes`

- Mantener la home como la vista principal; al abrir el portal ya debe verse el resumen comercial y debajo las tabs.

- Visualmente debe sentirse **B2B industrial**, limpio, serio y entendible para cliente externo. Evitar look de admin panel genérico.

### 3. Contenido de cada tab

- `QC`

  - cards con `Yield`, `Piezas inspeccionadas`, `NG`, `Último reporte`

  - tabla simple de defectos o inspecciones recientes

  - gráfica pequeña de tendencia o distribución por defecto

- `Asistencias`

  - tabla semanal con `Empleado`, `Entrada`, `Salida`, `Horas`, `Origen`

  - badge simple para origen: `face`, `kiosk`, `manual`

  - no usar lenguaje de auditoría ni “identidad verificada”

- `Órdenes`

  - tabla de órdenes activas o recientes con `Referencia`, `Operación`, `Responsable/Empleado`, `Estado`, `Inicio`, `Fin`

  - estados con badges de color

  - filtro mínimo por estado

- Mantener filtros muy ligeros:

  - `QC`: periodo simple `7 días`, `30 días`, `mes actual`)

  - `Asistencias`: semana actual / anterior

  - `Órdenes`: estado

### 4. Decisiones técnicas para evitar sobrecomplejidad

- No implementar:

  - login

  - sesiones

  - JSON-RPC real

  - proxy/Nginx

  - guards

  - router complejo

  - tema dark/light

  - exports

  - uploads

  - polling

- Sí implementar:

  - una sola fuente de datos local, por ejemplo `portalData`

  - objetos mock con forma consistente y nombres cercanos a Odoo

  - pequeños delays simulados opcionales para que no se vea “demasiado estático”

  - estados de `loading`, `empty` y `error` simples

- Pedirle a Lovable que deje un único archivo o módulo para los datos mock, para poder reemplazarlo luego por consultas reales.

### 5. Contratos de datos esperados

Definir cinco estructuras simples para que Lovable no improvise:

- `clientProfile`

  - `clientName`

  - `serviceName`

  - `site`

  - `status`

  - `startDate`

  - `endDate`

  - `reportFrequency`

  - `yieldTarget`

  - `seishinContact`

  - `lastUpdated`

- `qcSummary`

  - `yieldPct`

  - `inspectedPieces`

  - `rejectedPieces`

  - `lastReportDate`

  - `defects[]`

  - `recentChecks[]`

- `attendanceRows[]`

  - `employeeName`

  - `checkIn`

  - `checkOut`

  - `workedHours`

  - `source`

- `workOrderRows[]`

  - `reference`

  - `operation`

  - `employeeName`

  - `state`

  - `plannedStart`

  - `plannedEnd`

- `portalMeta`

  - `clientId`

  - `demoMode`

  - `dataPeriod`

## Plan de integración futura

- Dejar documentado que, cuando se conecte a Odoo real:

  - la capa comercial debería venir primero de `sale.order` y/o `seishin.client.config`

  - `QC` debería alinearse a `quality.check` y `seishin.production.log`

  - `Asistencias` a `hr.attendance`

  - `Órdenes` a `mrp.workorder` o `mrp.production`, según la disponibilidad real del cliente

- No construir esa integración ahora; solo dejar la interfaz de datos preparada para reemplazo.

## Pruebas y criterios de aceptación

- Al abrir la app se ve inmediatamente:

  - resumen del servicio

  - estado general

  - tabs operativas

- La experiencia funciona sin login y sin pasos extra.

- El cliente puede entender en menos de 30 segundos:

  - qué servicio tiene contratado

  - cómo va la ejecución

  - si hay alertas visibles

- Las tabs cargan con datos semi-reales consistentes entre sí.

- No aparece ningún detalle comercial sensible.

- La app se ve bien en desktop y degrada correctamente en móvil.

- No hay lenguaje técnico innecesario de Odoo expuesto al cliente.

## Supuestos y defaults

- Cliente único fijo en esta versión.

- Prototipo orientado a demo, no a operación real.

- “Información del servicio contratado” significa:

  - una capa comercial resumida

  - una capa operativa visible

- Visual recomendado:

  - industrial

  - confiable

  - claro

  - sobrio

- Si Lovable duda entre “hacer producto” y “hacer demo”, debe elegir siempre **demo convincente y simple**.

&nbsp;