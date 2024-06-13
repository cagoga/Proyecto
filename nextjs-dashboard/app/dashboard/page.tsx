import { Suspense } from "react";
import HoursChart from "../ui/dashboard/hours-chart";
import LatestInvoices from "../ui/dashboard/latest-sheets";
import { vampiro } from "../ui/fonts";
import { RevenueChartSkeleton } from "../ui/skeletons";
import { validateCookie } from "../lib/actions";
import { redirect } from 'next/navigation'

export default async function PageDashboard() {//Como este componente pertenece a la parte del servidor podemos crear una función async con la que poder hacer fetching de datos y mostrarlos, tratarlos o enviarlos a donde sea necesario
  
  const login = await validateCookie();

   if(login){
    return (    
    <main>
      <h1 className={`${vampiro.className} mb-4 text-xl md:text-2xl`}>
        Panel de control
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
  } else{
    return(
      redirect('/')
  )
  }

  
}