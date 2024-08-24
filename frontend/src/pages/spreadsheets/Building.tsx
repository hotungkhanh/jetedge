import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Building() {

  return (
    <>
      <h3>Building</h3>
      <Spreadsheet headers={["Building Name"]} storageKey='building' />
    </>
  );
};