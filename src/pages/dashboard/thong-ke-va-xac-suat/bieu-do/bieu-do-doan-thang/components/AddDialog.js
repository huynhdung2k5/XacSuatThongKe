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

const AddDialog = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.handleDialogAdd}
        onClose={props.handleCloseAdd}
        aria-labelledby="alert-dialog-add"
        aria-describedby="alert-dialog-add"
      >
        <DialogTitle>thêm tên cột</DialogTitle>
        <DialogContent style={{ alignItems: "center" }}>
          <Stack mt={5}>
            <TextField
              label={`Tên cột`}
              focused
              value={props.inputCollumnAdd}
              onChange={(e) => props.dispatchDialogAdd(e)}
              onKeyPress={(e) => props.handleKeyPressAdd(e)}
              autoFocus
              autoComplete="false"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAdd}>Thoát</Button>
          <Button id="add" onClick={props.hanldleSubmitLiaLogAdd}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDialog;
