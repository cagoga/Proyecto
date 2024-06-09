// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const players = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/players/delba-de-oliveira.png',
    status:'player'
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/players/lee-robinson.png',
    status:'player'
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/players/hector-simpson.png',
    status:'player'
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/players/steven-tey.png',
    status:'player'
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/players/steph-dietz.png',
    status:'player'
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/players/michael-novotny.png',
    status:'player'
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/players/evil-rabbit.png',
    status:'player'
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/players/emil-kowalski.png',
    status:'player'
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/players/amy-burns.png',
    status:'player'
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/players/balazs-orban.png',
    status:'master'
  },
];

const sheets = [
  {
    player_id: players[0].id,
    amount: 15795,
    date: '2022-12-06',
  },
  {
    player_id: players[1].id,
    amount: 20348,
    date: '2022-11-14',
  },
  {
    player_id: players[4].id,
    amount: 3040,
    date: '2022-10-29',
  },
  {
    player_id: players[3].id,
    amount: 44800,
    date: '2023-09-10',
  },
  {
    player_id: players[5].id,
    amount: 34577,
    date: '2023-08-05',
  },
  {
    player_id: players[7].id,
    amount: 54246,
    date: '2023-07-16',
  },
  {
    player_id: players[6].id,
    amount: 666,
    date: '2023-06-27',
  },
  {
    player_id: players[3].id,
    amount: 32545,
    date: '2023-06-09',
  },
  {
    player_id: players[4].id,
    amount: 1250,
    date: '2023-06-17',
  },
  {
    player_id: players[5].id,
    amount: 8546,
    date: '2023-06-07',
  },
  {
    player_id: players[1].id,
    amount: 500,
    date: '2023-08-19',
  },
  {
    player_id: players[5].id,
    amount: 8945,
    date: '2023-06-03',
  },
  {
    player_id: players[2].id,
    amount: 8945,
    date: '2023-06-18',
  },
  {
    player_id: players[0].id,
    amount: 8945,
    date: '2023-10-04',
  },
  {
    player_id: players[2].id,
    amount: 1000,
    date: '2022-06-05',
  },
];

const hours= [
  { month: 'Jan', hours: 2000 },
  { month: 'Feb', hours: 1800 },
  { month: 'Mar', hours: 2200 },
  { month: 'Apr', hours: 2500 },
  { month: 'May', hours: 2300 },
  { month: 'Jun', hours: 3200 },
  { month: 'Jul', hours: 3500 },
  { month: 'Aug', hours: 3700 },
  { month: 'Sep', hours: 2500 },
  { month: 'Oct', hours: 2800 },
  { month: 'Nov', hours: 3000 },
  { month: 'Dec', hours: 4800 },
];

module.exports = {
  users,
  players,
  sheets,
  hours,
};
