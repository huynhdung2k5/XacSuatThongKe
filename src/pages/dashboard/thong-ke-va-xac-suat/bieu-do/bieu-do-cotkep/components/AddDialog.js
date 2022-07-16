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

const AddDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.stateDialogAdd}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>thêm tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5} gap={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumn}
              onChange={(e) => props.handleSetInputDialog(e)}
              onKeyPress={(e) => props.handleKeyPressAdd(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Thoát</Button>
          <Button onClick={props.onSubmitDialog}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDialog;
