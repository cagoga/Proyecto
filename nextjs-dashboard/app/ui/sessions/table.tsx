import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/sessions/buttons';
import SheetsStatus from '@/app/ui/sessions/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredSheets } from '@/app/lib/data';

export default async function InvoicesTable({
  search,
  currentPage,
}: {
  search: string;
  currentPage: number;
}) {
  const sheets = await fetchFilteredSheets(search, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sheets?.map((sheet) => (
              <div
                key={sheet.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={sheet.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${sheet.name}'s profile picture`}
                      />
                      <p>{sheet.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{sheet.email}</p>
                  </div>
                  <SheetsStatus status={sheet.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(sheet.amount)}
                    </p>
                    <p>{formatDateToLocal(sheet.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={sheet.id} />
                    <DeleteInvoice id={sheet.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Jugador
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tiempo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sheets?.map((sheet) => (
                <tr
                  key={sheet.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={sheet.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${sheet.name}'s profile picture`}
                      />
                      <p>{sheet.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sheet.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(sheet.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sheet.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={sheet.id} />
                      <DeleteInvoice id={sheet.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
