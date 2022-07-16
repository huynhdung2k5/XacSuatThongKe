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
  IconButton,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm, useFieldArray } from "react-hook-form";

import { useReducer } from "react";
import reducer, { initState } from "./Reducer";
// import Chart from "react-apexcharts";
import { Line as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  setHandleDialogAdd,
  setInputTitleAdd,
  setInputTitleEdit,
  setTitleAdd,
  setTitleEdit,
  submitChart,
  deleteCollumn,
  setHandleDialogEdit,
} from "./Actions";
import AddDialog from "./components/AddDialog";
import EditDiaLog from "./components/EditDiaLog";

// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// hooks
import useSettings from "../../../../../hooks/useSettings";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

const LineChart = () => {
  const { themeStretch } = useSettings();

  //reducer
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    handleDialogAdd,
    handleDialogEdit,
    inputCollumnAdd,
    inputCollumnEdit,
    titleCollumn,
    dataOfChart,
    indexOfCollumn,
  } = state;

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleClickOpen = () => {
    dispatch(setHandleDialogAdd(true));
  };
  const handleCloseAdd = () => {
    dispatch(setHandleDialogAdd(false));
  };
  const hanldleSubmitLiaLogAdd = () => {
    dispatch(setTitleAdd(inputCollumnAdd));

    append({
      value: "",
    });
    dispatch(setHandleDialogAdd(false));
    dispatch(setInputTitleAdd(""));
  };

  const handleRemove = (index) => {
    remove(index);
    dispatch(deleteCollumn(index));
  };

  const onSubmit = (data) => {
    dispatch(submitChart(data.items));
  };

  //edit
  const handleEditButton = (index) => {
    const value = {
      val: true,
      index: index,
    };
    dispatch(setHandleDialogEdit(value));
  };
  const handleCloseEditButton = () => {
    dispatch(setHandleDialogEdit(false));
  };

  const handleSubmitDiaLogEdit = () => {
    const objData = {
      index: indexOfCollumn,
      value: inputCollumnEdit,
    };
    dispatch(setTitleEdit(objData));
    dispatch(setHandleDialogEdit(false));
    dispatch(setInputTitleEdit(""));
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

  const dispatchDialogAdd = (e) => {
    dispatch(setInputTitleAdd(e.target.value));
  };
  const dispatchDialogEdit = (e) => {
    dispatch(setInputTitleEdit(e.target.value));
  };
  return (
    <Page title="Biểu đồ Đoạn thẳng">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Biểu đồ Đoạn thẳng"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Biểu đồ",
              href: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
            },
            { name: "Biểu đồ Đoạn thẳng" },
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
                <AddDialog
                  handleDialogAdd={handleDialogAdd}
                  handleCloseAdd={handleCloseAdd}
                  hanldleSubmitLiaLogAdd={hanldleSubmitLiaLogAdd}
                  dispatchDialogAdd={(e) => dispatchDialogAdd(e)}
                  handleKeyPressAdd={(e) => handleKeyPressAdd(e)}
                />

                <EditDiaLog
                  handleDialogEdit={handleDialogEdit}
                  handleCloseEditButton={handleCloseEditButton}
                  inputCollumnEdit={inputCollumnEdit}
                  handleSubmitDiaLogEdit={handleSubmitDiaLogEdit}
                  dispatchDiaLogEdit={(e) => dispatchDialogEdit(e)}
                  handleKeyPressEdit={(e) => handleKeyPressEdit(e)}
                />

                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Thêm Cột
                  </Button>
                </Stack>

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
              <Line data={dataOfChart} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default LineChart;
