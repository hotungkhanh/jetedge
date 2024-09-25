import Spreadsheet from '../../components/Spreadsheet.tsx'
import { DB_UNITS } from '../../scripts/persistence.ts';

/**
 * 
 * @returns Spreadsheet input page for units information.
 */
export default function Unit() {

  return (
    <>
      <h3>Unit</h3>
      <Spreadsheet 
        headers={["Unit Code ", "Duration (Lecture)", "Duration (Tutorial)", "Duration (Lab)"]}
        storageKey={DB_UNITS}
        columns={[{readOnly: true}]}
      />
    </>
  );
};