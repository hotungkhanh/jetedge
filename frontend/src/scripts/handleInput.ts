import readXlsxFile, { Row } from 'read-excel-file';
import { CellValue } from 'jspreadsheet-ce';
import { TimetableProblem, Unit, Room } from './api';
import { DB_UNITS, storeSpreadsheetData } from './persistence';

/**
 * Function to validate uploaded enrolment data file.
 * 
 * @param file enrolment data Excel file
 * @returns true if uploaded file is an Excel file
 */
function isExcelFile(file: File) {
  const fileExtension = file.name.split('.').pop();
  if (fileExtension === undefined || !['xlsx', 'xls'].includes(fileExtension)) {
    alert("Wrong file type, file type must be .xlsx or .xls");
    return false;
  }
  return true;
}

/**
 * Function to validate uploaded enrolment data file.
 * 
 * @param inputHeader header row of enrolment data Excel file
 * @returns true if header row matches expected format for parsing.
 */
function validateEnrolmentHeader(inputHeader: Row) {
  const header = ['StudentID', 'Student Name', 'Personal Email', 'University Email',
    'Student Type', 'Offer Type', 'Course Name', 'Campus', 'Original COE Start Date',
    'Course Start Date', 'Course End Date', 'COE Status', 'Specialisation', 'Pathway Indicator'];

  if (inputHeader.length >= header.length && JSON.stringify(header) === JSON.stringify(inputHeader.slice(0, header.length))) {
    return true;
  }
  else {
    alert("Enrolment data header row is invalid");
    return false;
  }
}

/**
 * Deprecated.
 * Extract list of units from enrolment data and prefill spreadsheet input page.
 * 
 * @param enrolmentExcel enrolment data Excel file
 * @returns enrolment data Excel file
 */
export async function getUnitsList(enrolmentExcel: File) {
  if (!isExcelFile(enrolmentExcel)) {
    throw new Error(
      "File is not .xlsx or .xls"
    )
  }

  const [header] = await readXlsxFile(enrolmentExcel);

  if (!validateEnrolmentHeader(header)) {
    throw new Error(
      "Enrolment data has wrong headers"
    )
  }

  // console.log(header.slice(14));
  const unitsList = header.slice(14).map(elem => elem.toString());
  const unitsData: Record<string, CellValue>[] = unitsList.map((u) => {
    return { 0: u, 1: '', 2: '', 3: '' };
  });

  storeSpreadsheetData(unitsData, DB_UNITS);

  return enrolmentExcel;
}

export async function prefillUnitSpreadsheet(enrolmentExcel: File) {
  if (!isExcelFile(enrolmentExcel)) {
    throw new Error(
      "File is not .xlsx or .xls"
    )
  }

  const [header, ...body] = await readXlsxFile(enrolmentExcel);

  if (!validateEnrolmentHeader(header)) {
    throw new Error(
      "Enrolment data has wrong headers"
    )
  }

  type UnitMapRecord = {
    0: CellValue,
    1: CellValue,
    2: CellValue,
    3: CellValue,
    4: CellValue,
    5: CellValue,
    enrolment: string[]
  }
  type UnitMap = Map<string, UnitMapRecord>;

  // array of maps, each map correspond to 1 unit
  // each map maps the campus-course pair to a record that stores student enrolment
  const unitsMaps: UnitMap[] = [];

  for (let i = 14; i < header.length; i++) {
    unitsMaps.push(new Map());
    const currentMap = unitsMaps[unitsMaps.length - 1];
    const unitCode = header[i] as CellValue;

    for (let j = 0; j < body.length; j++) {
      const row = body[j];
      const campus = row[7] as CellValue;
      const course = row[6] as CellValue;
      const student = row[0] as CellValue;
      const enrolment = row[i] as CellValue;
      const key = campus.toString() + course.toString();

      if (!currentMap.has(key)) {
        currentMap.set(key, { 0: campus, 1: course, 2: unitCode, 3: '', 4: '', 5: '', enrolment: [] });
      }

      if (enrolment === "ENRL") {
        currentMap.get(key)?.enrolment.push(student.toString());
      }
    }
  }

  const units = unitsMaps.map(m => {
    const unitsData = Array.from(m.values());
    const transformed = unitsData.map(ud => { return { ...ud, enrolment: JSON.stringify(ud.enrolment) } });
    return transformed;
  }).flat();

  storeSpreadsheetData(units, DB_UNITS);
  return enrolmentExcel;
}

/**
 * Parse user input to create the timetabling problems split by campus.
 * 
 * @param roomSpreadsheet information of all rooms (spreadsheet input from user)
 * @param unitSpreadsheet information of all units (spreadsheet input from user)
 * @returns a TimetableProblem, which includes all available rooms, start times and unallocated units
 */
export async function getTimetableProblems(roomSpreadsheet: Record<string, CellValue>[], unitSpreadsheet: Record<string, CellValue>[]) {
  const units: Unit[] = unitSpreadsheet.map((record, index) => {
    const totalDuration = (Number(record['3']) + Number(record['4']) + Number(record['5'])) * 60;
    const wantsLab = Number(record['5']) > 0;

    return {
      campus: record['0'] as string,
      course: record['1'] as string,
      unitId: index,
      name: record['2'] as string,
      duration: totalDuration,
      students: JSON.parse(record.enrolment as string),
      wantsLab: wantsLab
    }
  });

  const rooms: Room[] = roomSpreadsheet
    .filter((record) => record['5'] as boolean)
    .map((record) => {
      return {
        campus: record['0'] as string,
        buildingId: record['1'] as string,
        roomCode: record['2'] as string,
        capacity: record['3'] as number,
        lab: record['4'] as boolean
      }
    });

  const unitsByCampus = units.reduce((acc: Record<string, Unit[]>, unit) => {
    if (!acc[unit.campus]) {
      acc[unit.campus] = [];
    }

    acc[unit.campus].push(unit);
    return acc;
  }, {});

  const roomsByCampus = rooms.reduce((acc: Record<string, Room[]>, room) => {
    if (!acc[room.campus]) {
      acc[room.campus] = [];
    }

    acc[room.campus].push(room);
    return acc;
  }, {});

  const problemsByCampus: TimetableProblem[] = [];

  for (const campus in unitsByCampus) {
    if (roomsByCampus[campus]) {
      problemsByCampus.push({
        campusName: campus,
        units: unitsByCampus[campus],
        daysOfWeek: [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY"
        ],
        startTimes: [
          "08:00:00",
          "09:00:00",
          "10:00:00",
          "11:00:00",
          "12:00:00",
          "13:00:00",
        ],
        rooms: roomsByCampus[campus]

      })
    }
    else {
      alert("This campus don't have any rooms: " + campus);
    }
  }
  console.log(problemsByCampus);
  return problemsByCampus;
}
