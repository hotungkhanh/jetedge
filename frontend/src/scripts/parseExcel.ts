import readXlsxFile, { Row } from 'read-excel-file';

// Return true if uploaded file is an Excel file
function validateUploadedFile(file: File | null): file is File {
  if (!file) {
    alert("Enrolment data file not uploaded");
    return false;
  }

  const fileExtension =  file.name.split('.').pop();
  if (fileExtension === undefined || !['xlsx', 'xls'].includes(fileExtension)) {
    alert("Wrong file type, file type must be .xlsx or .xls");
    return false;
  }
  return true;
}

// Return true if header row matches expected header row
function validateExcelHeader(inputHeader: Row) {
  const header = ['StudentID', 'Student Name', 'Personal Email', 'University Email', 
                  'Student Type', 'Offer Type', 'Course Name', 'Campus', 'Original COE Start Date', 
                  'Course Start Date', 'Course End Date', 'COE Status', 'Specialisation', 'Pathway Indicator'];

  if (inputHeader.length >= 14 && JSON.stringify(header) === JSON.stringify(inputHeader.slice(0, 14))) {
    return true;
  }
  else {
    alert("Enrolment data file header row is invalid");
    return false;
  }
}


export function parseEnrolmentData(file: File | null) {
  forStudentPrototypeBackend(file);
}

function testParsing(file: File | null) {
  if (!validateUploadedFile(file)) {
    return;
  }

  readXlsxFile(file).then((rows) => {
    const [header, ...body] = rows;

    if (!validateExcelHeader(header)) {
      return;
    }

    const enrolmentData = {
      "Campuses": [...new Set([...body.map((value, _) => { return value[7] })])],
      "Courses": [...new Set([...body.map((value, _) => { return value[6] })])],
      "Students": [...body.map((value, _) => { return value[0] })],
      "Units": [...header.slice(14)],
    }

    sessionStorage.setItem("enrolmentData", JSON.stringify(enrolmentData));
  });
}


/* WORKS WITH BACKEND: valid for commit a8c48da44dd17a0bdcb33db9d05f37ea1c4eb888 in branch student-prototype */

type Student = {
  name: string
}

export type Unit = {
  unitID: number,
  name: string,
  duration: string,
  students: Student[]
  start?: string,
  end?: string,
  room?: {
    id: string,
    capacity: number
  },
  studentSize?: number
}

// 1 hour, 1.5 hour, 2 hours, 3 hours
const durations = ["PT1H", "PT1H", "PT1H", "PT1H", "PT1H30M", "PT1H30M", "PT2H", "PT3H"];

function forStudentPrototypeBackend(file: File | null) {
  if (!validateUploadedFile(file)) {
    return;
  }

  readXlsxFile(file).then((rows) => {
    const [header, ...body] = rows;

    if (!validateExcelHeader(header)) {
      return;
    }

    const unitInfo = header.slice(14);
    const units: Unit[] = unitInfo.map((value, index) => ({
      unitID: index,
      name: value.toString(),
      duration: durations[Math.floor(Math.random()*durations.length)],   // randomise duration
      students: []
    }));

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

    sessionStorage.setItem("toBackend", JSON.stringify(units));

  });

}