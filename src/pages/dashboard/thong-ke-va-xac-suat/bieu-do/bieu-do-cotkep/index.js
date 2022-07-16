import Page from "src/components/Page";
import {
  Container,
  Grid,
  Card,
  TextField,
  FormGroup,
  Stack,
  IconButton,
  ButtonGroup,
  Box,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm, useFieldArray } from "react-hook-form";
import { useReducer } from "react";
import Chart from "react-apexcharts";

import reducer, { initState } from "./Reducer";
import {
  setStateDialogAdd,
  setStateDialogEdit,
  setInputTitleCollumn,
  setInputCollumnEdit,
  setTitleCollumn,
  deleteCollumn,
  submitChart,
  editCollumn,
} from "./Actions";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";

// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// hooks
import useSettings from "../../../../../hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { remove } from "lodash";

const GroupBarChart = () => {
  const { themeStretch } = useSettings();

  //reducer
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    stateDialogAdd,
    stateDialogEdit,
    inputCollumn,
    inputCollumnEdit,
    titleCollumn,
    series,
    options,
    indexCol,
  } = state;

  //react-form-hook
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items1: [{ value: "" }],
      items2: [{ value: "" }],
    },
  });

  const {
    fields: fields1,
    append: append1,
    remove: remove1,
  } = useFieldArray({
    control,
    name: "items1",
  });
  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control,
    name: "items2",
  });

  //submit form group
  const onSubmit = (data) => {
    dispatch(submitChart(data));
  };

  //xoa cot
  const handleRemove = (index) => {
    remove1(index);
    remove2(index);
    dispatch(deleteCollumn(index));
  };

  const handleClickOpen = () => {
    dispatch(setStateDialogAdd(true));
  };
  //dialogAdd
  const handleClose = () => {
    dispatch(setStateDialogAdd(false));
  };
  const onSubmitDialog = () => {
    dispatch(setTitleCollumn(inputCollumn));
    dispatch(setInputTitleCollumn(""));
    handleClose();
  };
  const handleSetInputDialog = (e) => {
    dispatch(setInputTitleCollumn(e.target.value));
  };

  //nhan phim enter de submit
  const handleKeyPressAdd = (e) => {
    if (e.key === "Enter") {
      onSubmitDialog();
    }
  };

  //dialog edit
  const handleOpenEdit = (index) => {
    const dataReducer = { index: index, value: true };
    dispatch(setStateDialogEdit(dataReducer));
  };
  const handleSetInputDialogEdit = (e) => {
    dispatch(setInputCollumnEdit(e.target.value));
  };
  const onSubmitDialogEdit = () => {
    const dataReducer = {
      index: indexCol,
      value: inputCollumnEdit,
    };
    dispatch(editCollumn(dataReducer));
    dispatch(setInputCollumnEdit(""));
    handleCloseEdit();
  };
  const handleCloseEdit = () => {
    dispatch(setStateDialogEdit(false));
  };
  const handleKeyPressEdit = (e) => {
    if (e.key === "Enter") {
      onSubmitDialogEdit();
    }
  };

  return (
    <Page title="Biểu đồ Cột kép">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Biểu đồ Cột kép"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Biểu đồ",
              href: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
            },
            { name: "Biểu đồ Cột kép" },
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

                <AddDialog
                  stateDialogAdd={stateDialogAdd}
                  handleClose={handleClose}
                  inputCollumn={inputCollumn}
                  onSubmitDialog={onSubmitDialog}
                  handleSetInputDialog={(e) => handleSetInputDialog(e)}
                  handleKeyPressAdd={(e) => handleKeyPressAdd(e)}
                />
                <EditDialog
                  stateDialogEdit={stateDialogEdit}
                  handleCloseEdit={handleCloseEdit}
                  inputCollumnEdit={inputCollumnEdit}
                  onSubmitDialogEdit={onSubmitDialogEdit}
                  handleSetInputDialogEdit={(e) => handleSetInputDialogEdit(e)}
                  handleKeyPressEdit={(e) => handleKeyPressEdit(e)}
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
                  {titleCollumn.map((item, index) => (
                    <Box key={index}>
                      <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h5">{item}</Typography>
                        <ButtonGroup orientation="horizontal" variant="text">
                          <IconButton onClick={() => handleRemove(index)}>
                            <CloseIcon />
                          </IconButton>
                          <IconButton onClick={() => handleOpenEdit(index)}>
                            <SettingsIcon />
                          </IconButton>
                        </ButtonGroup>
                      </Stack>

                      <Stack spacing={2}>
                        <TextField
                          {...register(`items1.${index}.value`, {
                            required: true,
                          })}
                          label={state.series[0].name}
                          type="number"
                          autoComplete="false"
                          focused
                          autoFocus
                          size="small"
                        />
                        <TextField
                          {...register(`items2.${index}.value`, {
                            required: true,
                          })}
                          label={state.series[1].name}
                          type="number"
                          autoComplete="false"
                          focused
                          autoFocus
                          size="small"
                        />
                      </Stack>
                    </Box>
                  ))}
                  <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Xác nhận
                  </Button>
                </FormGroup>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8} style={{ width: 500 }}>
            <Card sx={{ p: 3 }}>
              {/* <BarchartComponent chartData={dataChart} /> */}
              <Chart type="bar" series={series} options={options} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default GroupBarChart;
