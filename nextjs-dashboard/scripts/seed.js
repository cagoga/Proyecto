const { db } = require('@vercel/postgres');
const {
  sheets,
  players,
  hours,
  users,
} = require('../app/lib/placeholder-data.js');//Desde aquí vamos a traer los datos que queremos introducir en nuestra bbdd

const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Creamos la tabla "users" en caso de que no exista
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    // Insertamos datos en la tabla "users"
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    /*     console.log(`Seeded ${insertedUsers.length} users`);
     */
    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSheet(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Creamos la tabla "sheets" si no existe
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS sheets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player_id UUID NOT NULL,
    amount INT NOT NULL,
    date DATE NOT NULL
  );
`;

    //console.log(`Created "sheets" table`);

    // Insertamos datos a la tabla "sheets"
    const insertedInvoices = await Promise.all(
      sheets.map(
        (sheet) => client.sql`
        INSERT INTO sheets (player_id, amount, date)
        VALUES (${sheet.player_id}, ${sheet.amount}, ${sheet.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    //console.log(`Seeded ${insertedInvoices.length} sheets`);

    return {
      createTable,
      sheets: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding sheets:', error);
    throw error;
  }
}

async function seedPlayers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Creeamos la tabla "players" en caso de que no exista
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS players (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL
      );
    `;

    //console.log(`Created "players" table`);

    // Insertamos datos en la tabla "players"
    const insertedPlayers = await Promise.all(
      players.map(
        (player) => client.sql`
        INSERT INTO players (id, name, email, image_url, status)
        VALUES (${player.id}, ${player.name}, ${player.email}, ${player.image_url}, ${player.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    //console.log(`Seeded ${insertedPlayers.length} players`);

    return {
      createTable,
      players: insertedPlayers,
    };
  } catch (error) {
    console.error('Error seeding players:', error);
    throw error;
  }
}

async function seedHours(client) {//swap hours for hou
  try {
    // Creamos la base de datos de "hours" si no existe
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS hours (
        month VARCHAR(4) NOT NULL UNIQUE,
        hours INT NOT NULL
      );
    `;

    //console.log(`Created "hours" table`);

    // Introducimos los datos en la tabla "hours"
    const insertedHours = await Promise.all(
      hours.map(
        (hour) => client.sql`
        INSERT INTO hours (month, hours)
        VALUES (${hour.month}, ${hour.hours})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    //console.log(`Seeded ${insertedRevenue.length} hours`);

    return {
      createTable,
      hours: insertedHours,
    };
  } catch (error) {
    console.error('Error seeding hours:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPlayers(client);
  await seedSheet(client);
  await seedHours(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
