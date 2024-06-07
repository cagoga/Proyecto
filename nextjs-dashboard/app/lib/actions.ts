'use server' //Marcamos que aquí va todo lo referente con crear, borrar, cambiar datos. Todo lo relacionado con el servidor

export async function createInvoice(formData : FormData){
   const createData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
   } 
   console.log(createData)
}