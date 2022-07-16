import PropTypes from "prop-types";
// @Mui
import {
  Box,
  Button,
  Container,
  Typography,
  DialogActions,
  Grid,
  Card,
} from "@mui/material";
// Components
import { DialogAnimate } from "../../../components/animate";
// Chartjs
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import Scrollbar from "src/components/Scrollbar";

import MeanMedianMod from "./AccordionM3";

// PreRender
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

Plot.propTypes = {
  title: PropTypes.string,
  dataForM3: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default function Plot({ title, dataForM3, data, isOpen, onClose }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title?.toUpperCase(),
      },
    },
  };
  return (
    <DialogAnimate fullScreen open={isOpen} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ flexGrow: 1, textTransform: "uppercase" }}
        >
          Biểu đồ tần số
        </Typography>
        <Button color="error" onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
      <Scrollbar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Container>
            <Box sx={{ mt: "xs" }}>
              <Card>
                <MeanMedianMod title={title} data={dataForM3} />
              </Card>
              <Chart options={options} data={data} />
            </Box>
          </Container>
        </Grid>
      </Scrollbar>
    </DialogAnimate>
  );
}
