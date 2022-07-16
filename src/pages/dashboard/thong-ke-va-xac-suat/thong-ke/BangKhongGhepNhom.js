import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// mui
import {
  Stack,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
// components
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Scrollbar from "src/components/Scrollbar";
import HistogramPlot from "src/sections/@dashboard/blog/HistogramPlot";
// hooks
import useSettings from "src/hooks/useSettings";
// routes
import { PATH_DASHBOARD } from "src/routes/paths";

class FrequencyTableData {
  static sum(data) {
    let sum = 0;
    for (const { frequency } of data) {
      sum += parseInt(frequency);
    }
    return sum;
  }

  static chartData(data) {
    const N = this.sum(data);
    const chart = {
      labels: data.map(({ value }) => value),
      datasets: [
        {
          id: 1,
          label: "Tần số",
          type: "bar",
          data: data.map(({ frequency }) => frequency),
          backgroundColor: "rgba(255, 87, 51, 0.5)",
        },
        {
          id: 2,
          label: "Tần số tương đối",
          type: "line",
          data: data.map(({ frequency }) => (frequency / N) * 100),
          backgroundColor: "rgba(153, 102, 255, 1)",
        },
      ],
    };
    return chart;
  }
}

// Default value
const defaultTableData = [
  { value: "20", frequency: "5" },
  { value: "21", frequency: "8" },
  { value: "22", frequency: "11" },
  { value: "23", frequency: "10" },
  { value: "24", frequency: "6" },
];
// const defaultTableData = [12.1, 12.9, 13.2, 13.4, 13.7].map((el) => ({
//   value: el,
//   frequency: 1,
// }));

export default function BangKhongGhepNhom() {
  const [tableData, setTableData] = useState(defaultTableData);
  const { themeStretch } = useSettings();

  // For Preview
  const [open, setOpen] = useState(false);
  const handleOpenPreview = () => setOpen(true);
  const handleClosePreview = () => setOpen(false);

  // Hook form
  const FormSchema = Yup.object().shape({
    title: Yup.string(),
    value: Yup.string().required(""),
    frequency: Yup.number().typeError("").integer("").min(1, "").required(""),
  });
  const defaultValues = {
    title: "Ví dụ về tiêu đề",
    value: "",
    frequency: "1",
  };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { reset, getValues, handleSubmit } = methods;
  const onSubmit = async ({ value, frequency }) => {
    setTableData([...tableData, { value, frequency }]);
    reset();
  };

  // Handle Delete
  const handleDeleteRow = (indexOf) =>
    setTableData(tableData.filter((_el, index) => index !== indexOf));

  return (
    <Page title="Biểu đồ: Tần số">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HistogramPlot
          title={getValues("title")}
          dataForM3={tableData}
          data={FrequencyTableData.chartData(tableData)}
          isOpen={open}
          onClose={handleClosePreview}
        />
        <HeaderBreadcrumbs
          heading="Bảng Tần Số"
          links={[
            { name: "Xác Suất Thống Kê", href: PATH_DASHBOARD.root },
            { name: "Bảng Tần Số" },
          ]}
          action={
            tableData.length ? (
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleOpenPreview}
              >
                Các đặc trưng và biểu đồ
              </Button>
            ) : null
          }
        />
        <Card>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              sx={{ py: 2.5, px: 3 }}
            >
              <RHFTextField
                name="title"
                size="small"
                label="Tiêu đề"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  maxWidth: { sm: 200 },
                }}
              />
              <Divider orientation="vertical" flexItem />
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
              <RHFTextField
                name="value"
                size="small"
                label="Giá trị *"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RHFTextField
                name="frequency"
                type="number"
                size="small"
                label="Tần số *"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  maxWidth: { sm: 160 },
                }}
              />
              <Button
                fullWidth
                variant="text"
                sx={{
                  maxWidth: { sm: 100 },
                  textTransform: "capitalize",
                }}
              >
                {/** Tong tan so */}N = {FrequencyTableData.sum(tableData)}
              </Button>
            </Stack>
          </FormProvider>
          <Divider />
          <Scrollbar>
            <TableContainer
              sx={{ maxHeight: 500, minWidth: 800, position: "relative" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width={30} />
                    <TableCell align="left">Giá trị</TableCell>
                    <TableCell align="center" width={200}>
                      Tần số
                    </TableCell>
                    <TableCell align="center" width={300}>
                      Tần số tương đối
                    </TableCell>
                    <TableCell align="center" width={100}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="center" width={30} />
                      <TableCell align="left">{row.value}</TableCell>
                      <TableCell align="center" width={200}>
                        {row.frequency}
                      </TableCell>
                      <TableCell align="center" width={300}>
                        {parseFloat(
                          (
                            (row.frequency /
                              FrequencyTableData.sum(tableData)) *
                            100
                          ).toFixed(4)
                        )}
                        %
                      </TableCell>
                      <TableCell
                        align="center"
                        width={100}
                        onClick={() => handleDeleteRow(index)}
                      >
                        <IconButton size="small" color="error">
                          <Iconify icon={"eva:trash-2-outline"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
