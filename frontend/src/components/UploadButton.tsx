import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getFile, storeFile } from "../scripts/persistence";
import { getUnitsList, prefillUnitSpreadsheet } from "../scripts/handleInput";

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
export default function UploadButton ({ setFileChosen }: InputFileUploadProps) {

  // Handler for file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
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
      })
      .catch((error) => {
        alert("Upload failed. Please try again. " + error);
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
      startIcon={<UploadFileIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}
