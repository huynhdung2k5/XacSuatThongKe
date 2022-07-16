import React from "react";
import {
  Stack,
  TextField,
  Button,
  Dialog,
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
        <DialogTitle>Sửa tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumnEdit}
              onChange={(e) => props.handleInputEdit(e)}
              onKeyPress={(e) => props.handleKeyPressEdit(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseEdit}>Thoát</Button>
          <Button
            id="Edit"
            ref={props.btnEdit}
            onClick={props.handleSubmitDiaLogEdit}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditDialog;
