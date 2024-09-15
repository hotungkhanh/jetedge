import Spreadsheet from '../../components/Spreadsheet.tsx'

export default function Room() {

  return (
    <>
      <h3>Room</h3>
      <Spreadsheet 
        headers={["Campus Name", "Building Name", "Room Code", "Room Capacity", "Is Available"]}
        storageKey='rooms'
      />
    </>
  );
};