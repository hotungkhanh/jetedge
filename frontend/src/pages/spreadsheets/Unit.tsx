import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Unit() {

  return (
    <>
      <h3>Unit</h3>
      <Spreadsheet headers={["Unit Name"]} storageKey='unit' />
    </>
  );
};