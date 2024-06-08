'use server' //Marcamos que aquí va todo lo referente con crear, borrar, cambiar datos. Todo lo relacionado con el servidor

import { z } from 'zod'//Esta libreria sirve para hacer valizaciones de datos
import { Invoice } from './definitions'
import { sql } from '@vercel/postgres'
import { stat } from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/* Creamos un "esquema" de validación de datos que vamos a mandar a la BBDD
 */
const Schema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoiceSchema = Schema.omit({
    id: true,
    date: true
})

export async function createInvoice(formData: FormData) {
    //Vamos a recoger todos los datos que tenemos del formulario y los vamos a validar
    const { customerId, amount, status } = CreateInvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    const [date] = new Date().toISOString().split('T')

    //Este sql es un metodo concreto de Vercel que le estamos pasando parametros. Es a prueba de inyección de código ya que automaticamente lo limpia.
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amount}, ${status}, ${date})
    `

    //Tras todo el proceso querremos que se actualice el cache de los datos para mostrar los datos nuevos
    revalidatePath('/dashboard/invoices')
    //Por ultimo mandamos al usuario a la pagina anterior para que vea que ha creado los datos
    redirect('/dashboard/invoices')
}

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;
    
    const data: any = await sql`
    SELECT COUNT(*) FROM users WHERE email = ${email} and password = ${pass}
    `

    data.rows[0].count == 0 ? redirect('/login/invalidLogin') : redirect('/dashboard') 
}

export async function signUp(formData: FormData) {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;
    
    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name},${email},${pass})
    `
    redirect('/dashboard')
}