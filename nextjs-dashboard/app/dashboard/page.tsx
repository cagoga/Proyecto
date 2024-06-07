import { Suspense } from "react";
import { fetchLatestInvoices, fetchRevenue } from "../lib/data"
import HoursChart from "../ui/dashboard/hours-chart";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import { vampiro } from "../ui/fonts";
import { RevenueChartSkeleton } from "../ui/skeletons";

export default async function PageDashboard() {//Como este componente pertenece a la parte del servidor podemos crear una función async con la que poder hacer fetching de datos y mostrarlos, tratarlos o enviarlos a donde sea necesario


  return (
    <main>
      <h1 className={`${vampiro.className} mb-4 text-xl md:text-2xl`}>
        Agregar aquí botón de crear grupo/sesión y unirse a grupo/sesión
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
              title="Total Customers"
              value={numberOfCustomers}
              type="customers"
            /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <HoursChart />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}