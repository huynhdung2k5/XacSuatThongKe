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
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm, useFieldArray } from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import AppleIcon from "@mui/icons-material/Apple";
// routes
import { PATH_DASHBOARD } from "src/routes/paths";
// hooks
import useSettings from "../../../../../hooks/useSettings";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
const columns = [
  { id: "name", label: "Tên", width: 30 },
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

export default function BieuDoTranh() {
  const { themeStretch } = useSettings();

  const { register, control } = useForm({
    defaultValues: {
      items: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <Page title="Biểu đồ Tranh">
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ width: column.width }}
                        sx={{
                          border: "0.5px solid #ccc",
                          backgroundImage: "none",
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ border: "0.5px solid #ccc" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        {/* <TableCell>
                      <StyledRating
                        name="customized-color"
                        defaultValue={2}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<AccountCircleIcon fontSize="inherit" />}
                        emptyIcon={<AccountCircleIcon fontSize="inherit" />}
                      />
                    </TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>

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
                    <Button variant="contained" color="secondary">
                      Thêm Hàng
                    </Button>
                  </Stack>
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      margin: "10px 0",
                    }}
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
                          type="number"
                          autoComplete="false"
                          focused
                          autoFocus
                          size="small"
                          style={{ flex: 5 }}
                        />
                        <ButtonGroup orientation="horizontal" variant="text">
                          <IconButton style={{ cursor: "pointer", flex: 1 }}>
                            <CloseIcon />
                          </IconButton>
                          <IconButton>
                            <SettingsIcon />
                          </IconButton>
                        </ButtonGroup>
                      </Stack>
                    ))}
                  </FormGroup>
                  <Button variant="contained">Xác nhận</Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
