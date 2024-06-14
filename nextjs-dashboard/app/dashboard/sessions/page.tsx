import Pagination from '@/app/ui/sessions/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/sessions/table';
import { CreateInvoice } from '@/app/ui/sessions/buttons';
import { aladin } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { SheetsTableSkeleton } from '@/app/ui/skeletons';
import { fetchSheetsPages } from '@/app/lib/data';

 
export default async function PageInvoices({
  searchParams //Las paginas de nxtjs reciben la información de los searchParams
}:{
  searchParams?:{
    search?: string,
    page?:string  
  }
}) {
  const search =searchParams?.search || ''
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchSheetsPages(search)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${aladin.className} text-2xl`}>Registro de sesiones</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Introduzca el nombre del jugador" />
        <CreateInvoice />
      </div>
      <Suspense key={search + currentPage} fallback={<SheetsTableSkeleton />}>
        <Table search={search} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
    </div>
  );
}