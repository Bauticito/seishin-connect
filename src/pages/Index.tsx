import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalHeader } from "@/components/portal/PortalHeader";
import { ServiceSummary } from "@/components/portal/ServiceSummary";
import { QCTab } from "@/components/portal/QCTab";
import { AttendancesTab } from "@/components/portal/AttendancesTab";
import { WorkOrdersTab } from "@/components/portal/WorkOrdersTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <section aria-labelledby="service-heading">
          <h2 id="service-heading" className="sr-only">
            Resumen del servicio
          </h2>
          <ServiceSummary />
        </section>

        <section aria-labelledby="ops-heading">
          <h2 id="ops-heading" className="sr-only">
            Operación
          </h2>
          <Tabs defaultValue="qc" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="qc">QC</TabsTrigger>
              <TabsTrigger value="attendances">Asistencias</TabsTrigger>
              <TabsTrigger value="workorders">Órdenes</TabsTrigger>
            </TabsList>

            <TabsContent value="qc" className="mt-0">
              <QCTab />
            </TabsContent>
            <TabsContent value="attendances" className="mt-0">
              <AttendancesTab />
            </TabsContent>
            <TabsContent value="workorders" className="mt-0">
              <WorkOrdersTab />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Index;
