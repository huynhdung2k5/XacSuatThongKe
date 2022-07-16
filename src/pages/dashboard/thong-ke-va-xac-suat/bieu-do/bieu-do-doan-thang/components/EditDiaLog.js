import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Stack,
} from "@mui/material";

const EditDiaLog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.handleDialogEdit}
        onClose={props.handleCloseEditButton}
        aria-labelledby="alert-dialog-edit"
        aria-describedby="alert-dialog-edit"
      >
        <DialogTitle>Sửa tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumnEdit}
              onChange={(e) => props.dispatchDiaLogEdit(e)}
              onKeyPress={(e) => props.handleKeyPressEdit(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseEditButton}>Thoát</Button>
          <Button onClick={props.handleSubmitDiaLogEdit}>Sửa</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditDiaLog;
