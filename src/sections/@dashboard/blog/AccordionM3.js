import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function ControlledAccordions({ title, data }) {
  const m3 = calculate(data);
  const [expanded, setExpanded] = React.useState(false);
  const resultAverageAndStandardDeviation = averageAndStandardDeviation({
    data,
    average: m3.mean,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        disabled={!m3.mean}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {!m3.mean ? (
            <>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Số trung bình và trung vị
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Bài toán không thể giải
              </Typography>
            </>
          ) : (
            <>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Số trung bình: <b>{m3.mean}</b> và trung vị:{" "}
                <b>{m3.median.Q2}</b>
              </Typography>
            </>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" gutterBottom component="div">
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
          )}
          <Typography variant="h6">Phương sai:</Typography>
          <Typography>
            <MathJaxContext>
              <MathJax>{`${resultAverageAndStandardDeviation.varianceString} = ${resultAverageAndStandardDeviation.resultOfVariance}`}</MathJax>
            </MathJaxContext>
          </Typography>
          <Typography variant="h6">Độ lệch chuẩn:</Typography>
          <Typography>
            <MathJaxContext>
              <MathJax>
                {`\\( s = \\sqrt[2]{s^{2}} = \\sqrt[2]{${resultAverageAndStandardDeviation.resultOfVariance}} \\approx ${resultAverageAndStandardDeviation.standardDeviation} \\)`}
              </MathJax>
            </MathJaxContext>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disabled={!m3.mean}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          {!m3.mean ? (
            <>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Tứ phân vị
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Bài toán không thể giải
              </Typography>
            </>
          ) : (
            <>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Tứ phân vị: Q1 = <b>{m3.median.Q1}</b>, Q2 ={" "}
                <b>{m3.median.Q2}</b>, Q3 = <b>{m3.median.Q3}</b>
              </Typography>
            </>
          )}
        </AccordionSummary>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Mốt: <b>{m3.mod.value}</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Với tần số xuất hiện là: <b>{m3.mod.frequency}</b>
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}

function calculate(data) {
  let arr = [];
  const covertDataTo1D = (data) => {
    for (const { value, frequency } of data) {
      for (let i = 0; i < frequency; i++) {
        arr.push(value);
      }
    }
    return arr.sort((a, b) => a - b);
  };
  const mean = (data) => {
    let sum = 0;
    for (const val of data) {
      if (!parseFloat(val)) {
        return null;
      }
      sum += parseFloat(val);
    }
    return parseFloat((sum / data.length).toFixed(4));
  };
  const median = (data) => {
    let k = Math.floor(data.length / 2);
    return parseFloat(
      parseFloat(
        data.length % 2 ? data[k] : (data[k] + data[k - 1]) / 2
      ).toFixed(4)
    );
  };
  const mod = (data) => {
    const fdata = data.map((el) => el.frequency);
    const max = Math.max(...fdata);
    const modArr = data.filter((el) => max === parseInt(el.frequency));
    return {
      value: modArr.map((el) => el.value).join("; "),
      frequency: max,
    };
  };
  const data1D = covertDataTo1D(data);
  // Calculate Median
  const _data = data1D.map((el) => parseFloat(el));
  let Q1, Q3;
  const Q2 = median(_data);
  let k = Math.floor(_data.length / 2);
  if (_data.length % 2) {
    Q1 = median(_data.slice(0, k));
    Q3 = median(_data.slice(k + 1, _data.length));
  } else {
    Q1 = median(_data.slice(0, k));
    Q3 = median(_data.slice(k, _data.length));
  }
  return {
    data1D,
    mean: mean(data1D),
    median: {
      Q1,
      Q2,
      Q3,
    },
    mod: mod(data),
  };
}

function averageAndStandardDeviation(objData) {
  //chua phuong sai va do lech chuan
  // Tinh tong tan so
  const listFrequency = objData.data.map((item) => Number(item.frequency)); // danh sach tan so
  const totalFrequency = listFrequency.reduce(
    // tong tan so
    (total, currentValue) => total + currentValue
  );

  const listValueData = objData.data.map((item) => item.value); //danh sach gia tri cua bang

  const numerator = objData.data.map((item) => {
    // tu so
    return `${item.frequency}(${item.value}-${objData.average})^{2}`;
  });
  const numeratorString = numerator.join("+");

  const varianceString = `\\( s^{2} = \\frac{1}{${totalFrequency}} \[\ ${numeratorString} \]\\)`;

  const varianceResult = (objData) => {
    const totalN = objData.data // tong tan so
      .map((item) => Number(item.frequency))
      .reduce((total, currentValue) => total + currentValue);

    const result = objData.data
      .map((item) => {
        return (
          Number(item.frequency) *
          Math.pow(Number(item.value) - objData.average, 2)
        );
      })
      .reduce((total, currentValue) => total + currentValue);
    return result / totalN;
  };
  const resultOfVariance = varianceResult(objData);
  const standardDeviation = Math.sqrt(resultOfVariance).toFixed(2);
  return { varianceString, resultOfVariance, standardDeviation };
}
