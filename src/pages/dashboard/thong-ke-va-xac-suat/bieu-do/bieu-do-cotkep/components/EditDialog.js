import React from "react";
import {
  TextField,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const EditDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.stateDialogEdit}
        onClose={props.handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>thêm tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5} gap={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumnEdit}
              onChange={(e) => props.handleSetInputDialogEdit(e)}
              onKeyPress={(e) => props.handleKeyPressEdit(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseEdit}>Thoát</Button>
          <Button onClick={props.onSubmitDialogEdit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditDialog;
