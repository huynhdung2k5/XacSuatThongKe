import {
  OPEN_DIALOG_ADD,
  OPEN_DIALOG_EDIT,
  SET_INPUT_DIALOG_ADD,
  SET_INPUT_DIALOG_EDIT,
  SET_TITLE_ADD,
  SET_TITLE_EDIT,
  SUBMIT_CHART,
  // EDIT_TITLE,
  DEL_COLLUMN,
} from "./Constance";

export const initState = {
  handleDialogAdd: false,
  handleDialogEdit: false,
  indexOfCollumn: 0,
  inputCollumnAdd: "",
  inputCollumnEdit: "",
  titleCollumn: ["Dữ liệu 1", "Dữ liệu 2"],
  dataOfChart: {
    labels: ["Dữ liệu dòng 1", "Dữ liệu dòng 2"],
    datasets: [
      {
        label: "Biểu đồ đoạn thẳng",
        data: [0, 2],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_DIALOG_ADD:
      return {
        ...state,
        handleDialogAdd: action.payload,
      };
    case OPEN_DIALOG_EDIT:
      return {
        ...state,
        handleDialogEdit: action.payload.val,
        inputCollumnEdit: state.titleCollumn[action.payload.index],
        indexOfCollumn: action.payload.index,
      };
    case SET_INPUT_DIALOG_ADD:
      return {
        ...state,
        inputCollumnAdd: action.payload,
      };
    case SET_INPUT_DIALOG_EDIT:
      return {
        ...state,
        inputCollumnEdit: action.payload,
      };
    case SET_TITLE_ADD:
      return {
        ...state,
        titleCollumn: [...state.titleCollumn, action.payload],
        dataOfChart: {
          labels: [...state.dataOfChart.labels, action.payload],
          datasets: [
            {
              label: "Biểu đồ đoạn thẳng",
              data: [...state.dataOfChart.datasets[0].data],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
      };
    case SET_TITLE_EDIT:
      const listTitle = state.titleCollumn; // mang ban truoc khi sua;
      const newLabels = listTitle.splice(
        action.payload.index,
        1,
        action.payload.value
      );
      return {
        ...state,
        titleCollumn: newLabels,
        dataOfChart: {
          labels: newLabels,
          datasets: [
            {
              label: "Biểu đồ đoạn thẳng",
              data: [...state.dataOfChart.datasets[0].data],
              backgroundColor: "rgba(208, 0, 108, 0.8)",
            },
          ],
        },
      };
    case DEL_COLLUMN:
      const titleData = [...state.titleCollumn];
      titleData.splice(action.payload, 1);
      return {
        ...state,
        titleCollumn: titleData,
        dataOfChart: {
          labels: titleData,
          datasets: [
            {
              label: "Biểu đồ đoạn thẳng",
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
    default:
      throw new Error("Invalid Action");
  }
};

export default reducer;
