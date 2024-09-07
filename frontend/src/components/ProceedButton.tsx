import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";
import { parseEnrolmentData } from "../scripts/parseExcel";

interface ProceedButtonProps {
  fileChosen: File | null;
}

export default function ProceedButton({ fileChosen }: ProceedButtonProps) {
  const navigate = useNavigate();

  function handleProceed() {
    parseEnrolmentData(fileChosen);
    navigate("/seminfo/campus");
  }

  if (fileChosen === null) {
    return <Button disabled> Proceed </Button>
  } else {
    return <Button onClick={handleProceed}> Proceed</Button>;
  }
}