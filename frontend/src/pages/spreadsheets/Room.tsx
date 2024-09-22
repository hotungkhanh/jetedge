import Spreadsheet from '../../components/Spreadsheet.tsx'
import { DB_ROOMS } from '../../scripts/persistence.ts';

/**
 * 
 * @returns Spreadsheet input page for rooms information.
 */
export default function Room() {

  return (
    <>
      <h3>Room</h3>
      <Spreadsheet 
        headers={["Campus Name", "Building Name", "Room Code", "Room Capacity", "Is Lab", "Is Available"]}
        storageKey={DB_ROOMS}
        columns={[{},{},{},{}, { type: 'checkbox' }, { type: 'checkbox' }]}
      />
    </>
  );
};