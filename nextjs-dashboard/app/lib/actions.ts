'use server' //Marcamos que aquí va todo lo referente con crear, borrar, cambiar datos. Todo lo relacionado con el servidor

import { z } from 'zod'//Esta libreria sirve para hacer valizaciones de datos
import { Sheet } from './definitions'
import { sql } from '@vercel/postgres'
import { stat } from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import bcrypt from 'bcrypt'

/* Creamos un "esquema" de validación de datos que vamos a mandar a la BBDD
 */
const Schema = z.object({
    id: z.string(),
    playerId: z.string(),
    amount: z.coerce.number(),
    status: z.string(),
    date: z.string()
})

//Modificamos el esquema anterior para cada caso de Creación, Update...
const CreateSheetSchema = Schema.omit({
    id: true,
    date: true,
    status: true
})

const UpdateInvoice = Schema.omit({
    id: true,
    date: true,
    status: true
});



//Funciones CRUD

//Create
export async function createSheet(formData: FormData) {
    console.log(formData);

    //Vamos a recoger todos los datos que tenemos del formulario y los vamos a validar
    const { playerId, amount } = CreateSheetSchema.parse({
        playerId: formData.get('playerId'),
        amount: formData.get('amount'),
    })

    //Creamos la fecha actual
    const [date] = new Date().toISOString().split('T')

    //Este sql es un metodo concreto de Vercel que le estamos pasando parametros. Es a prueba de inyección de código ya que automaticamente lo limpia.
    await sql`
        INSERT INTO sheets (player_id, amount, date)
        VALUES (${playerId}, ${amount}, ${date})
    `

    //Tras todo el proceso querremos que se actualice el cache de los datos para mostrar los datos nuevos
    revalidatePath('/dashboard/sessions')
    //Por ultimo mandamos al usuario a la pagina anterior para que vea que ha creado los datos
    redirect('/dashboard/sessions')
}

//Update
export async function updateSheets(id: string, formData: FormData) {
    const { playerId, amount } = UpdateInvoice.parse({
        playerId: formData.get('playerId'),
        amount: formData.get('amount'),
    });

    const amountConvert = amount * 3600;

    await sql`
      UPDATE sheets
      SET player_id = ${playerId}, amount = ${amountConvert}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/sessions');
    redirect('/dashboard/sessions');
}

//Delete
export async function deleteSheets(id: string) {
    await sql`DELETE FROM sheets WHERE id = ${id}`;
    revalidatePath('/dashboard/sessions');
}



//Parte del login y singUP
export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;
    const hashedPassword = await bcrypt.hash(pass, 10);

    const data: any = await sql`
    SELECT COUNT(*) FROM users WHERE email = ${email} and password = ${hashedPassword}
    `
    console.log(hashedPassword);

    //data.rows[0].count == 0 ? redirect('/login/invalidLogin') : redirect('/dashboard') 
}

export async function signUp(formData: FormData) {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;
    const hashedPassword = await bcrypt.hash(pass, 10);


    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name},${email},${hashedPassword})
    `
    redirect('/dashboard')
}