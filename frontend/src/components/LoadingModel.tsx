import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
};

interface LoadingModalProp {
  open: boolean;
}

export default function LoadingModal({open}: LoadingModalProp) {

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress
            size="80px"
            sx={{ color: "#f05a22", position: "absolute" }}
          />
        </Box>
      </Modal>
    </div>
  );
}
