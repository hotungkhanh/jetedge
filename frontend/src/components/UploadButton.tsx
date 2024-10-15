import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getFile, storeFile } from "../scripts/persistence";
import { prefillUnitSpreadsheet } from "../scripts/handleInput";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface InputFileUploadProps {
  setFileChosen: (file: File | null) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

/**
 * Functional component for an upload button that allows users to select and 
 * upload a file.
 * 
 * @param {InputFileUploadProps.setFileChosen} setFileChosen - Callback function to set the chosen file.
 * @returns Upload button component with file selection and upload functionality.
 */
export default function UploadButton({ setFileChosen }: InputFileUploadProps) {

  const [loading, setLoading] = useState(false);

  // Handler for file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setLoading(true);
      storeFile(event.target.files[0])
        .then(() => {
          return getFile();
        })
        .then((file) => {
          return prefillUnitSpreadsheet(file);
          // return getUnitsList(file);
        })
        .then((file) => {
          setFileChosen(file);
          setLoading(false);
        })
        .catch((error) => {
          alert("Upload failed. Please try again. " + error);
          setLoading(false);
        })
      console.log("File selected:", event.target.files[0]);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{
        backgroundColor: '#f05a22',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d1491a',
        },
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 35+"%",
      }}
      disabled={loading}
      startIcon={!loading && <UploadFileIcon />}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: 'white', position: 'absolute' }} />
      ) : (
        "Upload File"
      )}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );

}
