import { useRef, useEffect } from "react";
import jspreadsheet, { JspreadsheetInstance, JspreadsheetInstanceElement } from "jspreadsheet-ce";
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import "../styles/spreadsheet.css"
import Button from "@mui/material/Button";
import { getSpreadsheetData, storeSpreadsheetData } from "../scripts/persistence";

interface SpreadsheetProps {
  headers: string[];
  storageKey: string;
  columns?: jspreadsheet.Column[]
}

export default function Spreadsheet({ headers, storageKey, ...other }: SpreadsheetProps) {
  const jRef = useRef<null | JspreadsheetInstanceElement>(null);

  // spreadsheet init options: columns property
  const columns: jspreadsheet.Column[] = headers.map((headerName, idx) => {
    if (other.columns && other.columns.length > idx) {
      return { title: headerName, width: 200, ...other.columns[idx] };
    }
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
    // minSpareRows: 1,
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

  // mount: create spreadsheet using data from indexedDB (if exist),
  //        otherwise create a blank default.
  useEffect(() => {
    // console.log(`Mount ${storageKey}`);
    getSpreadsheetData(storageKey)
      .then((data) => {
        if (data && jRef.current && !jRef.current.jspreadsheet) {
          options.data = data;
          jspreadsheet(jRef.current, options);
        }
    });
  });

  // unmount: save spreadsheet data to indexedDB
  useEffect(() => {
    const instanceElem: JspreadsheetInstanceElement | null = jRef.current;

    function cleanup() {
      // console.log(`Unmount ${storageKey}`);
      if (instanceElem && instanceElem.jspreadsheet) {
        const data = instanceElem.jspreadsheet.getJson(false);
        storeSpreadsheetData(data, storageKey);
      }
    }
    return cleanup;
  })

  // page refresh: save spreadsheet data to indexedDB
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      const instanceElem: JspreadsheetInstanceElement | null = jRef.current;
      if (instanceElem && instanceElem.jspreadsheet) {
        const data = instanceElem.jspreadsheet.getJson(false);
        storeSpreadsheetData(data, storageKey);
      }
    });
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