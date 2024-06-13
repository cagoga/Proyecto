'use server' //Marcamos que aquí va todo lo referente con crear, borrar, cambiar datos. Todo lo relacionado con el servidor

import { z } from 'zod'//Esta libreria sirve para hacer valizaciones de datos
import { Sheet } from './definitions'
import { sql } from '@vercel/postgres'
import { stat } from 'fs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import bcrypt from 'bcrypt'//falla

import { sha256, sha224 } from 'js-sha256'

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

const UpdateSheets = Schema.omit({
    id: true,
    date: true,
    status: true
});



//Funciones CRUD

//Create
export async function createSheet(formData: FormData) {
    //Vamos a recoger todos los datos que tenemos del formulario y los vamos a validar
    const { playerId, amount } = CreateSheetSchema.parse({
        playerId: formData.get('playerId'),
        amount: formData.get('amount'),
    })

    //Creamos la fecha actual
    const [date] = new Date().toISOString().split('T')

    //Este sql es un metodo concreto de Vercel que le estamos pasando parametros. Es a prueba de inyección de código ya que automaticamente lo limpia.
    try {
        await sql`
        INSERT INTO sheets (player_id, amount, date)
        VALUES (${playerId}, ${amount}, ${date})
    `
    } catch (error) {
        return { message: 'Database Error: Failed to Create Sheets' };
    }
    //Tras todo el proceso querremos que se actualice el cache de los datos para mostrar los datos nuevos
    revalidatePath('/dashboard/sessions')
    //Por ultimo mandamos al usuario a la pagina anterior para que vea que ha creado los datos
    redirect('/dashboard/sessions')
}

//Update
export async function updateSheets(id: string, formData: FormData) {

    const { playerId, amount } = UpdateSheets.parse({
        playerId: formData.get('playerId'),
        amount: formData.get('amount'),
    });

    const amountConvert = amount * 3600;

    try {
        await sql`
      UPDATE sheets
      SET player_id = ${playerId}, amount = ${amountConvert}
      WHERE id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Sheets' };
    }

    revalidatePath('/dashboard/sessions');
    redirect('/dashboard/sessions');
}

//Delete
export async function deleteSheets(id: string) {
    try {
        await sql`DELETE FROM sheets WHERE id = ${id}`;
        revalidatePath('/dashboard/sessions');
    } catch (error) {
        return { message: 'Database Error: Failed to Delet Sheets' };
    }

}



//Parte del login y singUP
export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;

    const hashedPassword = sha256(pass);
    var data: any = '';
    try {
        data = await sql`
    SELECT COUNT(*) FROM users WHERE email = ${email} and password = ${hashedPassword}
    `
    } catch (error) {
        return { message: 'Database Error: Failed to connect' };
    }

    createCookie(formData)
    data.rows[0].count == 0 ? redirect('/login/invalidLogin') : redirect('/dashboard')
}

export async function signUp(formData: FormData) {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const pass = formData.get('password') as string;

    const hashedPassword = sha256(pass);

    await sql`
    INSERT INTO users (name, email, password)
    VALUES (${name},${email},${hashedPassword})
    `

    //agregar insert to players y trycatch
    redirect('/dashboard')
}

export async function logOut() {
    deleteCookie()
    redirect('/')
}

//coockies

export async function createCookie(formData:FormData) {

    const name = 'Login'
    const value = formData.get('email') as string;

    cookies().set({
        name: name,
        value: value,
        secure: true
      })
    
}

export async function deleteCookie() {

    const name = 'Login'

    cookies().delete(name)
    
}

export async function validateCookie() {
    const cookieStore = cookies()
    const theme = cookieStore.get('Login') ? true : false

    return theme
  }