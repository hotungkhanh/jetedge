import { useRef, useEffect } from "react";
import jspreadsheet, { CellValue, JspreadsheetInstanceElement } from "jspreadsheet-ce";
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import "../styles/spreadsheet.css"

interface SpreadsheetProps {
  headers: string[];
  storageKey: string;
}

type SavedSpreadsheetOpt = {
  cellvalues: CellValue[][];
}

export default function Spreadsheet({ headers, storageKey }: SpreadsheetProps) {
  const jRef = useRef<null | JspreadsheetInstanceElement>(null);

  // spreadsheet init options: columns property
  const columns = headers.map((headerName) => {
    return { title: headerName, width: 200 };
  });
  
  // spreadsheet init: options
  const options: jspreadsheet.JSpreadsheetOptions = {
    columns: columns,
    data: [[]],
    minDimensions: [headers.length, 10],
    minSpareRows: 1,
    allowManualInsertColumn: false,
    includeHeadersOnDownload: true,
  };

  // mount: create spreadsheet using data from sessionStorage (if exist),
  //        otherwise create a blank default.
  useEffect(() => {
    // console.log(`Mount ${storageKey}`);
    if (jRef.current && !jRef.current.jspreadsheet) {
      const savedSpreadsheetData = sessionStorage.getItem(storageKey);
      
      if (savedSpreadsheetData) {
        const ssd: SavedSpreadsheetOpt = JSON.parse(savedSpreadsheetData);
        options.data = ssd.cellvalues;
      }

      jspreadsheet(jRef.current, options);
    }
  });

  // unmount: save spreadsheet data to sessionStorage
  useEffect(() => {
    const instanceElem: JspreadsheetInstanceElement | null = jRef.current;

    function cleanup() {
      // console.log(`Unmount ${storageKey}`);
      if (instanceElem) {
        const newOpts: SavedSpreadsheetOpt = {
          cellvalues: instanceElem.jspreadsheet.getData(),
        };
        sessionStorage.setItem(storageKey, JSON.stringify(newOpts));
      }
      else {
        throw new Error(
          "JspreadsheetInstanceElement is null"
        )
      }
    }

    return cleanup;
  })

  const addRow = () => {
    if (jRef.current && jRef.current.jexcel) {
      jRef.current.jexcel.insertRow();
    }
  };
  
  return (
    <div>
      <div ref={jRef} />
      <br />
      <input type="button" onClick={addRow} value="Add new row" />
    </div>
  );
}