import Page from "src/components/Page";
import {
  Container,
  Grid,
  Card,
  Box,
  TextField,
  Button,
  FormGroup,
  Stack,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

import { useForm, useFieldArray } from "react-hook-form";
import { useReducer } from "react";
import reducer, { initState } from "./Reducer";
import Chart from "react-apexcharts";
import {
  openDialogAdd,
  openDialogEdit,
  setInputDialogAdd,
  setInputDialogEdit,
  addTitle,
  editTitle,
  submitChart,
  delCollumn,
  disableDelete,
} from "./Actions";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";

// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// hooks
import useSettings from "../../../../../hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

const PieChart = () => {
  const { themeStretch } = useSettings();

  //react form hooks
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  //reducer
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    stateDialogAdd,
    stateDialogEdit,
    inputCollumnAdd,
    inputCollumnEdit,
    titleCollumn,
    series,
    options,
    indexOfCollumn,
    isDisabledBtnDelete,
  } = state;
  //submit form
  const onSubmit = (data) => {
    dispatch(submitChart(data.items));
  };

  //xoa field va cot
  const handleRemove = (index) => {
    if (titleCollumn.length <= 1) {
      dispatch(disableDelete(true));
    } else {
      remove(index);
      dispatch(delCollumn(index));
      dispatch(disableDelete(false));
    }
  };
  //phan dialog them cot, Add
  const handleClickOpen = () => {
    dispatch(openDialogAdd(true));
  };
  const handleInputAdd = (e) => {
    dispatch(setInputDialogAdd(e.target.value));
    dispatch(disableDelete(false));
  };
  const handleCloseAdd = () => {
    dispatch(openDialogAdd(false));
  };
  //nut xac nhan
  const hanldleSubmitLiaLogAdd = () => {
    if (inputCollumnAdd.length >= 1) {
      dispatch(addTitle(inputCollumnAdd));

      append({
        value: "",
      });
      dispatch(openDialogAdd(false));
      dispatch(setInputDialogAdd(""));
    } else {
      return;
    }
  };

  //Ddit
  const handleEditButton = (index) => {
    const value = {
      val: true,
      index: index,
    };
    dispatch(openDialogEdit(value));
  };
  const handleCloseEdit = () => {
    dispatch(openDialogEdit(false));
  };
  const handleInputEdit = (e) => {
    dispatch(setInputDialogEdit(e.target.value));
  };
  const handleSubmitDiaLogEdit = () => {
    const objData = {
      index: indexOfCollumn,
      value: inputCollumnEdit,
    };
    dispatch(editTitle(objData));
    dispatch(openDialogEdit(false));
    dispatch(setInputDialogEdit(""));
  };

  //nhan phim enter de submit
  const handleKeyPressAdd = (e) => {
    if (e.key === "Enter") {
      hanldleSubmitLiaLogAdd();
    }
  };
  const handleKeyPressEdit = (e) => {
    if (e.key === "Enter") {
      handleSubmitDiaLogEdit();
    }
  };

  return (
    <Page title="Biểu đồ Quạt">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Biểu đồ Quạt"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Biểu đồ",
              href: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
            },
            { name: "Biểu đồ Quạt" },
          ]}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  columnGap: 1,
                  rowGap: 1,
                }}
              >
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Thêm Cột
                  </Button>
                </Stack>
                {/* dialog them cot */}
                <AddDialog
                  stateDialogAdd={stateDialogAdd}
                  handleCloseAdd={handleCloseAdd}
                  inputCollumnAdd={inputCollumnAdd}
                  handleInputAdd={(e) => handleInputAdd(e)}
                  handleKeyPressAdd={(e) => handleKeyPressAdd(e)}
                  hanldleSubmitLiaLogAdd={() => hanldleSubmitLiaLogAdd()}
                />
                {/*dialog dedit cot*/}
                <EditDialog
                  stateDialogEdit={stateDialogEdit}
                  handleCloseEdit={handleCloseEdit}
                  inputCollumnEdit={inputCollumnEdit}
                  handleInputEdit={(e) => handleInputEdit(e)}
                  handleKeyPressEdit={(e) => handleKeyPressEdit(e)}
                  handleSubmitDiaLogEdit={() => handleSubmitDiaLogEdit()}
                />

                <FormGroup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    margin: "10px 0",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {fields.map(({ id }, index) => (
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      key={id}
                    >
                      <TextField
                        {...register(`items.${index}.value`, {
                          required: true,
                        })}
                        label={titleCollumn[index]}
                        type="number"
                        autoComplete="false"
                        focused
                        autoFocus
                        size="small"
                        // onChange={(e) => setInputVal4(e.target.value)}
                        style={{ flex: 5 }}
                      />
                      <ButtonGroup orientation="horizontal" variant="text">
                        <IconButton
                          onClick={() => handleRemove(index)}
                          style={{ cursor: "pointer", flex: 1 }}
                          disabled={isDisabledBtnDelete}
                        >
                          <CloseIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditButton(index)}
                          style={{ cursor: "pointer", flex: 1 }}
                        >
                          <SettingsIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Stack>
                  ))}
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                  Xác nhận
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8} style={{ width: 500 }}>
            <Card sx={{ p: 3 }}>
              <Chart type="pie" series={series} options={options} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PieChart;
