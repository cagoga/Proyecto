import { sql } from '@vercel/postgres';
import {
  PlayerField,
  PlayersTableType,
  SheetForm,
  SheetsTable,
  LatestSheetRaw,
  User,
  Hours,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {

  try {
   
    await new Promise((resolve) => setTimeout(resolve, 3000));//lo uso para hacer una simulación y que se vea el skeleton

    const data = await sql<Hours>`SELECT * FROM hours`;

    //console.log(data);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch hours data.');
  }
}

export async function fetchLatestSheets() {
  try {
    const data = await sql<LatestSheetRaw>`
      SELECT sheets.amount, players.name, players.image_url, players.email, sheets.id
      FROM sheets
      JOIN players ON sheets.player_id = players.id
      ORDER BY sheets.date DESC
      LIMIT 5`;
    //console.log(data);
    const latestSheets = data.rows.map((Sheet) => ({
      ...Sheet,
      amount: formatCurrency(Sheet.amount),
    }));
    return latestSheets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest Sheets.');
  }
}

export async function fetchCardData() {
  try {
    const SheetCountPromise = sql`SELECT COUNT(*) FROM Sheets`;
    const playerCountPromise = sql`SELECT COUNT(*) FROM players`;
    const SheetStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM Sheets`;

    const data = await Promise.all([
      SheetCountPromise,
      playerCountPromise,
      SheetStatusPromise,
    ]);

    const numberOfSheets = Number(data[0].rows[0].count ?? '0');
    const numberOfPlayers = Number(data[1].rows[0].count ?? '0');
    const totalPaidSheets = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingSheets = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfPlayers,
      numberOfSheets,
      totalPaidSheets,
      totalPendingSheets,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredSheets(
  search: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const Sheets = await sql<SheetsTable>`
      SELECT
        sheets.id,
        sheets.amount,
        sheets.date,
        players.status,
        players.name,
        players.email,
        players.image_url
      FROM sheets
      JOIN players ON sheets.player_id = players.id
      WHERE
        players.name ILIKE ${`%${search}%`} OR
        players.email ILIKE ${`%${search}%`} OR
        sheets.amount::text ILIKE ${`%${search}%`} OR
        sheets.date::text ILIKE ${`%${search}%`} OR
        players.status ILIKE ${`%${search}%`}
      ORDER BY sheets.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return Sheets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Sheets.');
  }
}

export async function fetchSheetsPages(search: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM sheets
    JOIN players ON sheets.player_id = players.id
    WHERE
      players.name ILIKE ${`%${search}%`} OR
      players.email ILIKE ${`%${search}%`} OR
      sheets.amount::text ILIKE ${`%${search}%`} OR
      sheets.date::text ILIKE ${`%${search}%`} OR
      players.status ILIKE ${`%${search}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of Sheets.');
  }
}

export async function fetchSheetById(id: string) {
  try {

    const data = await sql<SheetForm>`
      SELECT
        sheets.id,
        sheets.player_id,
        sheets.amount
        
      FROM sheets
      WHERE sheets.id = ${id};
    `;

    console.log(data);
    
    const sheets = data.rows.map((sheets) => ({
      ...sheets,
      amount: sheets.amount / 10,
    }));

    return sheets[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Sheet.');
  }
}

export async function fetchPlayers() {
  try {
    const data = await sql<PlayerField>`
      SELECT
        id,
        name
      FROM players
      ORDER BY name ASC
    `;

    const players = data.rows;
    return players;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all players.');
  }
}

export async function fetchFilteredPlayers(search: string) {
  try {
    const data = await sql<PlayersTableType>`
		SELECT
		  players.id,
		  players.name,
		  players.email,
		  players.image_url,
		  COUNT(Sheets.id) AS total_Sheets,
		  SUM(CASE WHEN Sheets.status = 'pending' THEN Sheets.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN Sheets.status = 'paid' THEN Sheets.amount ELSE 0 END) AS total_paid
		FROM players
		LEFT JOIN Sheets ON players.id = Sheets.player_id
		WHERE
		  players.name ILIKE ${`%${search}%`} OR
        players.email ILIKE ${`%${search}%`}
		GROUP BY players.id, players.name, players.email, players.image_url
		ORDER BY players.name ASC
	  `;

    const players = data.rows.map((player) => ({
      ...player,
      total_pending: formatCurrency(player.total_jugador),
      total_paid: formatCurrency(player.total_master),
    }));

    return players;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch player table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
