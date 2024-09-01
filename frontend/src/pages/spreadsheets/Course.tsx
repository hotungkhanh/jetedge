import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Course() {

  return (
    <>
      <h3>Course</h3>
      <Spreadsheet headers={["Course Name"]} storageKey='course' />
    </>
  );
};