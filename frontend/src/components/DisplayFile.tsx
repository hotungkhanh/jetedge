import { Box } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";

interface DisplayFileProps {
  fileChosen: File | null;
}

/**
 * Renders the file chosen for display.
 * 
 * @param {DisplayFileProps} fileChosen - The file object to be displayed.
 * @returns The component displaying the chosen file or an empty 
 * Box if no file is chosen.
 */
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