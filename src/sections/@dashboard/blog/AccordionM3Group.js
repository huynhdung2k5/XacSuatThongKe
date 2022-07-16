import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const AccordionM3Group = ({ title, data }) => {
  const result = calcuLateData(data);
  console.log(result.average);
  return (
    <div>
      <Accordion
      // disabled={!m3.mean}
      // expanded={expanded === "panel1"}
      // onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {
            <>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Số trung bình: <b>{result.average}</b>
              </Typography>
            </>
          }
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography variant="h6" gutterBottom component="div">
            Sắp xếp lại mẫu số liệu theo thứ tự không giảm, ta được:
          </Typography>
          <Typography>{m3.data1D.join(" ")}</Typography>
          {m3.data1D.length % 2 ? (
            <>
              <Typography variant="h6" gutterBottom component="div">
                Vì cỡ mẫu bằng {m3.data1D.length} nên trung vị của {title} là số
                liệu thứ {Math.floor(m3.data1D.length / 2) + 1} của dãy trên:
              </Typography>
              <Typography>
                Me = {m3.data1D[Math.floor(m3.data1D.length / 2)]}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom component="div">
                Vì cỡ mẫu bằng {m3.data1D.length} nên trung vị của {title} là
                trung bình cộng của số liệu thứ{" "}
                {Math.floor(m3.data1D.length / 2)} và thứ{" "}
                {Math.floor(m3.data1D.length / 2) + 1} của dãy trên:
              </Typography>
              <Typography>
                Me = ({m3.data1D[Math.floor(m3.data1D.length / 2) - 1]} +{" "}
                {m3.data1D[Math.floor(m3.data1D.length / 2)]})/2 ={" "}
                {m3.median.Q2}
              </Typography>
            </>
          )} */}
          <Typography variant="h6">Phương sai:</Typography>
          <Typography>
            <MathJaxContext>
              <MathJax>{`${result.varianceString} = ${result.variance}`}</MathJax>
            </MathJaxContext>
          </Typography>
          <Typography variant="h6">Độ lệch chuẩn:</Typography>
          <Typography>
            <MathJaxContext>
              <MathJax>
                {`\\( s = \\sqrt{s^{2}} = \\sqrt{${result.variance}} \\approx ${result.standardDeviation} \\)`}
              </MathJax>
            </MathJaxContext>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionM3Group;

function calcuLateData(data) {
  //tong tan so
  const listN = data.map((item) => item.frequency);
  const totalN = listN.reduce((total, currentValue) => total + currentValue);
  const listAverageValue = data.map(
    // list trung bình của 2 giá trị
    (item) => (item.value + item.valueLast) / 2
  );

  const totalAveraged = (data, N, listAverageValue) => {
    const resultAveraged =
      data
        .map((item, index) => listAverageValue[index] * item.frequency)
        .reduce((total, currentValue) => total + currentValue) / N;
    return resultAveraged;
  };

  const average = totalAveraged(data, totalN, listAverageValue);

  // tu so
  const numerator = data.map((item, index) => {
    return `${item.frequency}(${listAverageValue[index]}-${average})^{2}`;
  });
  const numeratorString = numerator.join("+");
  //chuoi Mathjax tinh phuong sai
  const varianceString = `\\( s^{2} = \\frac{1}{${totalN}} \[\ ${numeratorString} \]\\)`;

  //tính kết quả
  const varianceResult = (data, N, average, listAverageValue) => {
    const result = data
      .map((item, index) => {
        const val = listAverageValue[index] - average;
        return item.frequency * Math.pow(val, 2);
      })
      .reduce((total, currentValue) => total + currentValue);
    return result / N;
  };
  const variance = varianceResult(data, totalN, average, listAverageValue);

  //tính độ lệch chuẩn
  const standardDeviation = Math.sqrt(variance).toFixed(2);
  return {
    average,
    totalN,
    varianceString,
    variance,
    standardDeviation,
  };
}
