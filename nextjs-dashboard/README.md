## Next.js App Router Course - Starter

TODO: 
-Cargar otra fuente más optima?
-Usar modulos.css?
-Con node.js hacer el server
-Conectar con Vercel para base de datos
-¿?

Es necesario tipar los elementos para un mejor funcionamiento

la etiqueta Image tiene un cupo maximo gratuioto de renderizado(segun el sitio).Se utiliza en "serverside" Solo usar en imagenes fijas, avatares y/u otros menesteres usar img normal

Layout y paginas es el sistema de enrutado por archivos, clave de nextjs. Ej: app->dhasboard->index => https:...app/dashboard/index Esto esta llamado fileRoutingSystem

Link es el componente que nos permite actualizar, renderizar y optimizar los enlaces

En el archivo env pondremos las variables de entorno para hacer la conexión a la base de datos de Vercel

con un npm instal @vercel/postgres instalaremos la dependencia que nos conectara automaticamente, junto con los datos provisto en el .env, a la base de datos

en package.json hemos añadido el script seed que al ejecutarlo nos creara la base de datos de prueba para la pagina web