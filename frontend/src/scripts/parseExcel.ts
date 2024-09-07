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

//
export function parseEnrolmentData(file: File | null) {
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
    const data = sessionStorage.getItem("enrolmentData");

    if (data) {
      console.log(JSON.parse(data));
    }

  });
}