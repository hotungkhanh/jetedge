import Dexie, { EntityTable } from "dexie";
import { CellValue, JspreadsheetInstanceElement } from "jspreadsheet-ce";

const DB_NAME = 'TimetableInput';


interface FileRecord {
  id: number;
  file: File;
}

interface SpreadsheetRecord {
  id?: number;
  record: Record<string, CellValue>;
}


const db = new Dexie(DB_NAME) as Dexie & {
  files: EntityTable<FileRecord, 'id'>;
  buildings: EntityTable<SpreadsheetRecord, 'id'>;
  rooms: EntityTable<SpreadsheetRecord, 'id'>;
  units: EntityTable<SpreadsheetRecord, 'id'>;
};

db.version(1).stores({
  files: '++id, file',
  buildings: '++id, record',
  rooms: '++id, record',
  units: '++id, record'
});

export async function storeFile(file: File): Promise<number> {
  try {
    await db.files.clear();
    const id = await db.files.add({
      id: 0,
      file: file
    });
    return id;
  }
  catch (error) {
    throw error;
  }
}

export async function getFile(): Promise<File | null> {
  try {
    const file = await db.files.orderBy('id').first();
    if (file === undefined) {
      return null;
    }
    return file.file;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

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
    if (storageObject === "buildings") {
      await db.buildings.bulkPut(records);
    }
    else if (storageObject === "rooms") {
      await db.rooms.bulkPut(records);
    }
    else if (storageObject === "units") {
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