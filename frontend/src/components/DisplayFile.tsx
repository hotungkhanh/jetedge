import { Box } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";

interface DisplayFileProps {
  fileChosen: File | null;
}

export default function DisplayFile({fileChosen}: DisplayFileProps) {
    if (fileChosen === null) {
      return <Box/>;
    } else {
      return (
        <Box>
          <FilePresentIcon />
          {fileChosen?.name}
        </Box>
      );
    }
}