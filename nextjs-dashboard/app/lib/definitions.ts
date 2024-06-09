// This file contains type definitions for your data. En este archivo vamos a crear las definiciones de nuestros datos
// Cada tipo de dato tendra unas variables y en estas estaran definida su timpado

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Player = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  status: 'jugador' | 'master';
};

export type Sheet = {
  id: string;
  player_id: string;
  amount: number;
  date: string;
};

export type Hours = {
  month: string;
  hours: number;
};

export type LatestSheet = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: number;
};

export type LatestSheetRaw = Omit<LatestSheet, 'amount'> & {
  amount: number;
};

export type SheetsTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'jugador' | 'master';
};

export type PlayersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_Sheets: number;
  total_jugador: number;
  total_master: number;
};

export type FormattedPlayersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_Sheets: number;
  total_jugador: string;
  total_master: string;
};

export type PlayerField = {
  id: string;
  name: string;
};

export type SheetForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'jugador' | 'master';
};
