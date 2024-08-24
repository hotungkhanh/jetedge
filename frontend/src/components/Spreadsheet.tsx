import { useRef, useEffect } from "react";
import jspreadsheet, { CellValue, JspreadsheetInstance, JspreadsheetInstanceElement, JSpreadsheetOptions } from "jspreadsheet-ce";
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import "../styles/spreadsheet.css"
import Button from "@mui/material/Button";

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

  // spreadsheet init options: contextMenu property
  const contextMenu = (instance: JspreadsheetInstance, _col: string | null, row: string | null, _evn: PointerEvent) => {

    var items: object[] = [];
    if (row === null) {
      return items;
    }

    if (!instance.options.text) {
      return items;
    }

    // insert row before
    items.push({
      title: instance.options.text.insertANewRowBefore,
      onclick: function () {
        instance.insertRow(1, parseInt(row), 1);
      }
    });

    // insert row after
    items.push({
      title: instance.options.text.insertANewRowAfter,
      onclick: function () {
        instance.insertRow(1, parseInt(row));
      }
    });

    // delete selected rows
    items.push({
      title: instance.options.text.deleteSelectedRows,
      onclick: function () {
        instance.deleteRow(instance.getSelectedRows().length ? undefined : parseInt(row));
      }
    });

    // clear value of selected cells
    items.push({
      title: "Clear selected cells",
      onclick: function () {
        const selectedCols = instance.getSelectedColumns();
        const selectedRows = instance.getSelectedRows(true) as number[];
        for (let i of selectedCols) {
          for (let j of selectedRows) {
            instance.setValueFromCoords(i, j, "", false);
          }
        }
      }
    });
    
    return items;
  };

  // spreadsheet init: options
  const options: jspreadsheet.JSpreadsheetOptions = {
    columns: columns,
    data: [[]],
    minDimensions: [headers.length, 10],
    minSpareRows: 1,
    allowManualInsertColumn: false,
    allowInsertColumn: false,
    includeHeadersOnDownload: true,
    tableOverflow: true,
    tableWidth: '1150px',
    tableHeight: '400px',
    contextMenu: contextMenu,
    // toolbar:[
    //   {
    //       type: 'i',
    //       id: 'undo',
    //       content: 'undo',
    //       onclick: function() {
    //           undo();
    //       }
    //   },
    //   {
    //     type: 'i',
    //     id: 'redo',
    //     content: 'redo',
    //     onclick: function() {
    //         redo();
    //     }
    //   },
    // ],
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

  // const undo = () => {
  //   if (jRef.current && jRef.current.jexcel) {
  //     jRef.current.jexcel.undo();
  //   }
  // }

  // const redo = () => {
  //   if (jRef.current && jRef.current.jexcel) {
  //     jRef.current.jexcel.redo();
  //   }
  // }

  return (
    <div>
      <div ref={jRef} />
      <br />
      <Button
        variant="outlined"
        size="small"
        onClick={addRow}
        sx={{
          color: "black",
          borderColor: "black",
          '&:hover': {
            color: "#f05a22",
            borderColor: "#f05a22",
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          borderRadius: "3px",
          marginTop: "5px",
        }}>
        Add new row
      </Button>
    </div >
  );
}