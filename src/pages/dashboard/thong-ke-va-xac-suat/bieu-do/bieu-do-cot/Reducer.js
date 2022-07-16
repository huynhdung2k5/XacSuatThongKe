import {
  OPEN_DIALOG,
  SET_INPUT_TITLE_COLLUMN,
  SET_TITLECOLLUMN,
  SUBMIT_CHART,
  DEL_COLLUMN,
  EDIT_TITLECOLLUMN,
} from "./Constances";

export const initState = {
  handleDialog: false,
  inputCollumn: "",
  titleCollumn: ["Dữ liệu cột 1", "Dữ liệu cột 2"],
  dataOfChart: {
    labels: ["Dữ liệu cột 1", "Dữ liệu cột 2"],
    datasets: [
      {
        label: "Biểu đồ cột",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(208, 0, 108, 0.8)",
      },
    ],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        handleDialog: action.payload,
      };
    case SET_INPUT_TITLE_COLLUMN:
      return {
        ...state,
        inputCollumn: action.payload,
      };
    case SET_TITLECOLLUMN:
      return {
        ...state,
        titleCollumn: [...state.titleCollumn, action.payload],
        dataOfChart: {
          labels: [...state.dataOfChart.labels, action.payload],
          datasets: [
            {
              label: "Biểu đồ cột",
              data: [...state.dataOfChart.datasets[0].data],
            },
          ],
        },
      };
    case DEL_COLLUMN:
      const newArr = [...state.titleCollumn];
      newArr.splice(action.payload, 1);
      return {
        ...state,
        titleCollumn: newArr,
        dataOfChart: {
          labels: newArr,
          datasets: [
            {
              label: action.payload,
              data: [...state.dataOfChart.datasets[0].data],
              backgroundColor: "rgba(208, 0, 108, 0.8)",
            },
          ],
        },
      };
    case SUBMIT_CHART:
      const arr = action.payload.map((item) => {
        return Number(item.value);
      });
      return {
        ...state,
        titleCollumn: [...state.titleCollumn],
        dataOfChart: {
          labels: [...state.dataOfChart.labels],
          datasets: [
            {
              label: state.dataOfChart.datasets[0].label,
              data: arr,
            },
          ],
        },
      };
    case EDIT_TITLECOLLUMN:
      const CustomArr = [...state.titleCollumn, action.payload];

      return {
        ...state,
        titleCollumn: CustomArr,
        dataOfChart: {
          labels: CustomArr,
          datasets: [
            {
              label: "Biểu đồ cột",
              data: [...state.dataOfChart.datasets[0].data],
            },
          ],
        },
      };
    default:
      throw new Error("Invalid Action");
  }
};

export default reducer;
