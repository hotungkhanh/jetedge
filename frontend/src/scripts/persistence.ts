import Dexie, { EntityTable } from "dexie";
import { CellValue } from "jspreadsheet-ce";

/* Define storage keys */
const DB_NAME = 'TimetableInput';
const DB_BUILDINGS = 'buildings';
const DB_ROOMS = 'rooms';
const DB_UNITS = 'units';

/* Define record type of `file` objectStore */
interface FileRecord {
  id: number;
  file: File;
}

/* Define record type of each spreadsheets objectStore */
interface SpreadsheetRecord {
  id?: number;
  record: Record<string, CellValue>;
}

/* Initialise Dexie (indexedDB wrapper) */
const db = new Dexie(DB_NAME) as Dexie & {
  files: EntityTable<FileRecord, 'id'>;
  buildings: EntityTable<SpreadsheetRecord, 'id'>;
  rooms: EntityTable<SpreadsheetRecord, 'id'>;
  units: EntityTable<SpreadsheetRecord, 'id'>;
};

/* Initialise indexedDB objectStores */
db.version(1).stores({
  files: '++id, file',
  buildings: '++id, record',
  rooms: '++id, record',
  units: '++id, record'
});

/**
 * Save 1 file to the first row of the file table.
 * Delete all other files.
 * Intend for storing enrolment data Excel file.
 * 
 * @param file any file
 * @returns id of saved row
 */
export async function storeFile(file: File): Promise<number> {
  await db.files.clear();
  const id = await db.files.add({
    id: 0,
    file: file
  });
  return id;
}

/**
 * Get first file saved to the `file` objectStore.
 * Intend for getting saved enrolment data Excel file.
 * 
 * @returns file saved 
 */
export async function getFile(): Promise<File> {
  const file = await db.files.orderBy('id').first();

  if (file === undefined) {
    throw new Error(
      "getFile() failed"
    );
  }
  return file.file;
}

/**
 * Store data of an input spreadsheet to the corresponding objectStore in indexedDB.
 * 
 * @param data data in one spreadsheet page
 * @param storageObject the key of the objectStore (table) of the database we want to store data into
 * @returns void
 */
export async function storeSpreadsheetData(data: Record<string, CellValue>[], storageObject: string) {
  if (!data) {
    return;
  }

  const records: SpreadsheetRecord[] = data.map((obj, idx) => {
    return {
      id: idx,
      record: obj
    }
  });

  try {
    if (storageObject === DB_BUILDINGS) {
      await db.buildings.clear();
      await db.buildings.bulkPut(records);
    }
    else if (storageObject === DB_ROOMS) {
      await db.rooms.clear();
      await db.rooms.bulkPut(records);
    }
    else if (storageObject === DB_UNITS) {
      await db.units.clear();
      await db.units.bulkPut(records);
    }
    else {
      throw new Error(
        "storeSpreadsheetData: storageObject does not exist"
      )
    }
  }
  catch (error) {
    console.log(error);
  }
}

/**
 * Get data from a specified indexedDB objectStore.
 * 
 * @param storageObject the key of the objectStore (table) that we want to get data out of
 * @returns spreadsheet data
 */
export async function getSpreadsheetData(storageObject: string): Promise<Record<string, CellValue>[] | null> {
  try {
    if (storageObject === "buildings") {
      const data = await db.buildings.toArray();
      return data.map((obj) => obj.record);
    }
    else if (storageObject === "rooms") {
      const data = await db.rooms.toArray();
      return data.map((obj) => obj.record);
    }
    else if (storageObject === "units") {
      const data = await db.units.toArray();
      return data.map((obj) => obj.record);
    }
    else {
      throw new Error(
        "getSpreadsheetData: storageObject does not exist"
      )
    }
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export { DB_BUILDINGS, DB_ROOMS, DB_UNITS }