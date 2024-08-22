import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Campus() {

  return (
    <>
      <h3>Campus</h3>
      <Spreadsheet headers={["Campus Name"]} storageKey='campus' />
    </>
  );
};