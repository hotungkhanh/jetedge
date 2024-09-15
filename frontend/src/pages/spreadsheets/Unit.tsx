import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Unit() {

  return (
    <>
      <h3>Unit</h3>
      <Spreadsheet headers={["Unit Code ", "Duration (Lecture)", "Duration (Tutorial)", "Duration (Lab)"]} storageKey='units' />
    </>
  );
};