import { Bar } from "react-chartjs-2";

const BarchartComponent = ({ chartData }) => {
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarchartComponent;
