import Form from '@/app/ui/sessions/edit-form';
import Breadcrumbs from '@/app/ui/sessions/breadcrumbs';
import { fetchPlayers, fetchSheetById } from '@/app/lib/data';
import { log } from 'console';

export default async function PageEdit({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log(id);

    const [sheets, players] = await Promise.all([
        fetchSheetById(id),
        fetchPlayers()
    ]);


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/sessions' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/sessions/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form sheets={sheets} players={players} />
        </main>
    );
}