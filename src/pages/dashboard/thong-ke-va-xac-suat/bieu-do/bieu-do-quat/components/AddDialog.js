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

const AddDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.stateDialogAdd}
        onClose={props.handleCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>thêm tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumnAdd}
              onChange={(e) => props.handleInputAdd(e)}
              onKeyPress={(e) => props.handleKeyPressAdd(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAdd}>Thoát</Button>
          <Button
            id="add"
            ref={props.btnAdd}
            onClick={props.hanldleSubmitLiaLogAdd}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDialog;
