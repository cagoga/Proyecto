import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { vampiro } from '@/app/ui/fonts';
import { LatestSheet } from '@/app/lib/definitions';
import { fetchLatestSheets } from '@/app/lib/data';

export default async function LatestSheets() {
  
  const lastestSheets = await fetchLatestSheets()

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${vampiro.className} mb-4 text-xl md:text-2xl`}>
        Ultimos usuarios
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {lastestSheets.map((sheet, i) => {
            return (
              <div
                key={sheet.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {<Image
                    src={sheet.image_url}
                    alt={`${sheet.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {sheet.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {sheet.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${vampiro.className} truncate text-sm font-medium md:text-base`}
                >
                   {sheet.amount}
               </p>
              </div>
            );
          })}
        </div> 
      </div>
    </div>
  );
}
