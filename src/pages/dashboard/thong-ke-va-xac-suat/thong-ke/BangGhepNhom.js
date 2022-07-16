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
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
// components
import Iconify from "../../../../components/Iconify";
import Page from "../../../../components/Page";
import {
  FormProvider,
  RHFTextField,
} from "../../../../components/hook-form";
import Scrollbar from "../../../../components/Scrollbar";
import HistogramPlotGroup from "../../../../sections/@dashboard/blog/HistogramPlotGroup";
// hooks
import useSettings from "../../../../hooks/useSettings";
// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
  { value: 10, valueLast: 20, frequency: 8 },
  { value: 20, valueLast: 30, frequency: 18 },
  { value: 30, valueLast: 40, frequency: 24 },
  { value: 40, valueLast: 50, frequency: 10 },
];

export default function BangGhepNhom() {
  const [typeSegment, setTypeSegment] = useState(0); // True: [a; b), False: (a; b]
  const [tableData, setTableData] = useState(defaultTableData);
  const { themeStretch } = useSettings();

  // For Preview
  const [open, setOpen] = useState(false);
  const handleOpenPreview = () => setOpen(true);
  const handleClosePreview = () => setOpen(false);

  // Hook form
  const FormSchema = Yup.object().shape({
    title: Yup.string(),
    value: Yup.number().typeError("").required(""),
    valueLast: Yup.number().typeError("").required(""),
    frequency: Yup.number().typeError("").integer("").min(1, "").required(""),
  });
  const defaultValues = {
    title: "Ví dụ về tiêu đề",
    value: "",
    valueLast: "",
    frequency: "1",
  };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { reset, getValues, handleSubmit } = methods;
  const onSubmit = async ({ value, valueLast, frequency }) => {
    setTableData([...tableData, { value, valueLast, frequency }]);
    reset();
  };

  // Handle Delete
  const handleDeleteRow = (indexOf) =>
    setTableData(tableData.filter((_el, index) => index !== indexOf));

  // Handle change type segment
  const handleChangeTypeSegment = (e) => {
    setTypeSegment(parseInt(e.target.value));
  }

  return (
    <Page title="Biểu đồ: Tần số">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HistogramPlotGroup
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
            <Stack spacing={2}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Khoảng giá trị</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={typeSegment}
                  onChange={handleChangeTypeSegment}
                >
                  <FormControlLabel value={0} control={<Radio />} label="[a; b)" />
                  <FormControlLabel value={1} control={<Radio />} label="(a; b]" />
                </RadioGroup>
              </FormControl>
              {tableData.length ? (
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={handleOpenPreview}
                >
                  Phương sai và độ lệch chuẩn
                </Button>
              ) : null}
            </Stack>
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
                  maxWidth: { sm: 300 },
                }}
              />
              <Divider orientation="vertical" flexItem />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<Iconify icon={"carbon:add"} />}
                sx={{
                  maxWidth: { sm: 100 },
                  textTransform: "capitalize",
                }}
              >
                Thêm
              </Button>
              <RHFTextField
                name="value"
                size="small"
                type="number"
                label="Giá trị đầu *"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RHFTextField
                name="valueLast"
                size="small"
                type="number"
                label="Giá trị cuối *"
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
                  maxWidth: { sm: 100 },
                }}
              />
              <Button
                fullWidth
                variant="text"
                sx={{
                  maxWidth: { sm: 80 },
                  textTransform: "capitalize",
                }}
              >
                N = {FrequencyTableData.sum(tableData)}
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
                      <TableCell align="left">
                        {!typeSegment ? <>[{row.value}; {row.valueLast})</> : <>({row.value}; {row.valueLast}]</>}
                      </TableCell>
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
