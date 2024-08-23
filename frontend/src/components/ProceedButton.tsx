import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom";

interface ProceedButtonProps {
  fileChosen: File | null;
}

export default function ProceedButton({ fileChosen }:ProceedButtonProps) {
    const navigate = useNavigate();
      if (fileChosen === null) {
        return <Button disabled> Proceed </Button>
      } else {
        return <Button onClick={() => navigate("/seminfo")}> Proceed</Button>;
      }
}`      `