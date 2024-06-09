import Form from '@/app/ui/sessions/create-form';
import Breadcrumbs from '@/app/ui/sessions/breadcrumbs';
import { fetchPlayers } from '@/app/lib/data';
 
export default async function PageCrate() {
  const players = await fetchPlayers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/sessions' },
          {
            label: 'Create Invoice',
            href: '/dashboard/sessions/create',
            active: true,
          },
        ]}
      />
      <Form players={players} />
    </main>
  );
}