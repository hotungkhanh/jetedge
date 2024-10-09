import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function SkipButton() {
  const navigate = useNavigate();
  if (sessionStorage.getItem("campusSolutions") === undefined) {
    return (
      <Button
        disabled
        variant="contained"
        sx={{
          Color: "grey",
        }}
      >
        Modify Timetable
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => navigate("/timetablemod")}
        variant="contained"
        sx={{
          backgroundColor: "#f05a22",
          "&:hover": {
            backgroundColor: "#f05a22", 
          },
          marginTop: "20px"
        }}
      >
        Modify Timetable
      </Button>
    );
  }
}
