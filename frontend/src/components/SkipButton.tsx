import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";

export default function SkipButton() {
  const navigate = useNavigate();
  const [hasSolution, setHasSolution] = useState(false);

  useEffect(() => {
    const checkHasSolution = () => {
      const campusSolutions = sessionStorage.getItem("campusSolutions");
      setHasSolution(campusSolutions !== null);
    };

    checkHasSolution();
    window.addEventListener("fetchSolutionFinished", checkHasSolution);

    return () => {
      window.removeEventListener("fetchSolutionFinished", checkHasSolution);
    };

  }, []);


  if (!hasSolution) {
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
        variant="outlined"
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: "white",
          borderColor: "white",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        Modify Timetable
      </Button>
    );
  }
}
