import Spreadsheet from '../../components/Spreadsheet.tsx'
import { DB_BUILDINGS } from '../../scripts/persistence.ts';

export default function Building() {

  return (
    <>
      <h3>Building</h3>
      <Spreadsheet 
        headers={["Campus", "Building Name"]}
        storageKey={DB_BUILDINGS} 
      />
    </>
  );
};