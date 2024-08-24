import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

export default function UploadButton ({ setFileChosen }: InputFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  // Handler for file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileChosen(event.target.files[0]);
      console.log("File selected:", event.target.files[0]);
    }
  };

  // Example of sending the file to a server
  const handleUpload = () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://url.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
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
