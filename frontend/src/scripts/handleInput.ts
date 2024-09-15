import readXlsxFile, { Row } from 'read-excel-file';
import { CellValue } from 'jspreadsheet-ce';
import { TimetableProblem, Unit, Room, Student, Weekday } from './api';
import { DB_UNITS, storeSpreadsheetData } from './persistence';
import { duration } from '@mui/material';

function isExcelFile(file: File) {
  const fileExtension = file.name.split('.').pop();
  if (fileExtension === undefined || !['xlsx', 'xls'].includes(fileExtension)) {
    alert("Wrong file type, file type must be .xlsx or .xls");
    return false;
  }
  return true;
}

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
    return { 0: u };
  });

  storeSpreadsheetData(unitsData, DB_UNITS);

  return enrolmentExcel;
}

export async function getTimetableProblem(enrolmentExcel: File, roomSpreadsheet: Record<string, CellValue>[], unitSpreadsheet: Record<string, CellValue>[]) {
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

  const unitsList = header.slice(14);
  const units: Unit[] = unitsList.map((value, index) => {
    return {
      unitID: index,
      name: value.toString(),
      duration: 0,
      students: [],
      wantsLab: false
    }
  });

  unitSpreadsheet.map((record, index) => {
    const totalDuration = (parseInt(record['1'].toString()) + parseInt(record['2'].toString()) + parseInt(record['3'].toString())) * 60;
    const wantsLab = parseInt(record['3'].toString()) > 0;
    units[index].duration = totalDuration;
    units[index].wantsLab = wantsLab;
  })

  // check each row and add students to each unit they're enrolled in
  for (let i = 0; i < body.length; i++) {
    const enrolments = body[i].slice(14);
    for (let j = 0; j < enrolments.length; j++) {
      if (enrolments[j] === "ENRL") {
        units[j].students.push({
          name: body[i][0].toString()
        })
      }
    }
  }

  const rooms: Room[] = roomSpreadsheet
    .filter((record) => record['5'] as boolean)
    .map((record) => {
      return {
        id: record['2'] as string,
        capacity: record['3'] as number,
        lab: record['4'] as boolean
      }
    });


  const problem: TimetableProblem = {
    units: units,
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
    rooms: rooms
  }

  console.log(problem);

  return problem;
}
