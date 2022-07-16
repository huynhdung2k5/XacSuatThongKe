import Page from "src/components/Page";
import * as Yup from "yup";
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
  Divider,
  TableContainer,
} from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import AppleIcon from "@mui/icons-material/Apple";
import Scrollbar from "src/components/Scrollbar";
// hooks
import useSettings from "src/hooks/useSettings";
import { yupResolver } from "@hookform/resolvers/yup";
// routes
import { PATH_DASHBOARD } from "src/routes/paths";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
const columns = [
  { id: "name", label: "Tên", width: 100 },
  { id: "code", label: "Nội dung", width: 250 },
];
function createData(name, code) {
  return { name, code };
}

const rows = [
  createData(
    "Nội dung 1",
    <StyledRating
      name="customized-color"
      defaultValue={4.5}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      max={10}
      size="large"
      icon={<AppleIcon fontSize="inherit" />}
      emptyIcon={<AppleIcon fontSize="inherit" />}
    />
  ),
  createData(
    "Nội dung 2",
    <StyledRating
      name="customized-color"
      defaultValue={7.5}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      max={10}
      size="large"
      icon={<AppleIcon fontSize="inherit" />}
      emptyIcon={<AppleIcon fontSize="inherit" />}
    />
  ),
  createData(
    "Nội dung 3",
    <StyledRating
      name="customized-color"
      defaultValue={3}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      max={10}
      size="large"
      icon={<AppleIcon fontSize="inherit" />}
      emptyIcon={<AppleIcon fontSize="inherit" />}
    />
  ),
  createData(
    "Nội dung 4",
    <StyledRating
      name="customized-color"
      defaultValue={9.5}
      getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
      precision={0.5}
      max={10}
      size="large"
      icon={<AppleIcon fontSize="inherit" />}
      emptyIcon={<AppleIcon fontSize="inherit" />}
    />
  ),
];

// Default value
const defaultTableData = [
  {
    title: "Dữ liệu 1",
    value: 1,
  },
];

const ChartPictogram = () => {
  const { valueChart, setValueChart } = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [indexOfRow, setIndexOfRow] = useState(0);
  const [tableData, setTableData] = useState(defaultTableData);

  const AddFieldRef = useRef();
  const EditFieldRef = useRef();

  // Hook form
  const FormSchema = Yup.object().shape({
    title: Yup.string().required(""),
    edit: Yup.string(),
    value: Yup.number().typeError("").integer("").min(1, "").required(""),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      title: "",
      value: 1,
    },
  });
  const { reset, getValues, handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    if (openEdit) {
      const value = tableData.splice(indexOfRow, 1, data);
      setTableData(tableData);
      setOpenEdit(!openEdit);
    } else {
      setTableData([...tableData, data]);
    }

    reset();
  };
  const { themeStretch } = useSettings();

  // Handle Delete
  const handleDeleteRow = (indexOf) =>
    setTableData(tableData.filter((_el, index) => index !== indexOf));

  //nhan enter de submit
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit);
    }
  };
  //edit row
  const handleEditRow = (i) => {
    AddFieldRef.current.focus();
    setIndexOfRow(i);
    setValue("title", tableData[i].title);
    setOpenEdit(!openEdit);

    if (AddFieldRef.current.value.length > 0) {
      reset();
    }
  };

  return (
    <Page title="Chart: Pictogram">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Biểu đồ Tranh"
          links={[
            {
              name: "Thống kê và Xác suất",
              href: PATH_DASHBOARD.thongKeVaXacSuat.root,
            },
            {
              name: "Biểu đồ",
              href: PATH_DASHBOARD.thongKeVaXacSuat.bieuDo.root,
            },
            { name: "Biểu đồ Tranh" },
          ]}
        />
        <Card>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              sx={{ py: 2.5, px: 3 }}
            >
              <RHFTextField
                inputRef={AddFieldRef}
                name="title"
                size="small"
                label="Dữ liệu"
                fullWidth
                onKeyPress={(e) => onKeyPress(e)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  maxWidth: { sm: 200 },
                }}
              />
              <Divider orientation="vertical" flexItem />
              {openEdit ? (
                //sửa dữ liệu
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="contained"
                  startIcon={<Iconify icon={"oi:check"} />}
                  sx={{
                    maxWidth: { sm: 160 },
                    textTransform: "capitalize",
                  }}
                >
                  Sửa Dữ liệu
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<Iconify icon={"carbon:add"} />}
                  sx={{
                    maxWidth: { sm: 160 },
                    textTransform: "capitalize",
                  }}
                >
                  Thêm dữ liệu
                </Button>
              )}
            </Stack>
          </FormProvider>
          <Scrollbar>
            <TableContainer
              sx={{ maxHeight: 500, minWidth: 800, position: "relative" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={100}>
                      STT
                    </TableCell>
                    <TableCell align="left" width={200}>
                      TIÊU ĐỀ
                    </TableCell>
                    <TableCell align="left">Giá trị</TableCell>
                    <TableCell align="center" width={100}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        <TableCell align="center" width={100}>
                          {i + 1}
                        </TableCell>
                        <TableCell align="left" width={200}>
                          {row.title}
                        </TableCell>
                        <TableCell align="left" width={200}>
                          <StyledRating
                            name="customized-color"
                            // defaultValue={row.value}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            value={valueChart}
                            onChange={(event, newValue) => {
                              let newData = tableData[i];
                              newData.value = newValue;
                              const update = tableData.splice(i, 1, newData);
                              setTableData(tableData);
                            }}
                            precision={0.5}
                            max={10}
                            size="large"
                            icon={<AppleIcon fontSize="inherit" />}
                            emptyIcon={<AppleIcon fontSize="inherit" />}
                          />
                        </TableCell>

                        <TableCell align="center" width={100}>
                          <IconButton
                            size="medium"
                            color="secondary"
                            onClick={() => handleEditRow(i)}
                          >
                            <Iconify icon={"ant-design:edit-filled"} />
                          </IconButton>
                          <IconButton
                            size="medium"
                            color="error"
                            onClick={() => handleDeleteRow(i)}
                          >
                            <Iconify icon={"eva:trash-2-outline"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
};

export default ChartPictogram;
