import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";

interface ProceedButtonProps {
  fileChosen: File | null;
}

/**
 * Functional component for rendering a Proceed Button based on whether a file 
 * is chosen or not.
 * 
 * @param {ProceedButtonProps} fileChosen - Props object containing the fileChosen 
 * boolean value
 * @returns A Button component that allows the user to proceed 
 * to a specific route when clicked
 */
export default function ProceedButton({ fileChosen }: ProceedButtonProps) {
  const navigate = useNavigate();
  if (fileChosen === null) {
    return <Button disabled> Proceed </Button>
  } else {
    return (
      <Button
        onClick={() => navigate("/seminfo/room")}
        sx={{
          color: "#f05a22",
          "&:hover": {
            backgroundColor: "#fef6f4",
          },
        }}
      >
        {" "}
        Proceed
      </Button>
    );
  }
}