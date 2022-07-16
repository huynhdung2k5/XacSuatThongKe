import {
  SET_INPUT_DIALOG,
  SET_TITLECOLLUMN,
  SUBMIT_CHART,
  DEL_COLLUMN,
  EDIT_COLLUMN,
  STATE_DIALOG_ADD,
  STATE_DIALOG_EDIT,
  SET_INPUT_EDIT,
} from "./Constances";

export const initState = {
  indexCol: 0,
  stateDialogAdd: false,
  stateDialogEdit: false,
  inputCollumn: "",
  inputCollumnEdit: "",
  inputData1: "",
  inputData2: "",
  titleCollumn: ["Nội dung 1"],
  series: [
    {
      name: "Dữ liệu 1",
      data: [],
    },
    {
      name: "Dữ liệu 2",
      data: [],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "90%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Nội dung 1"],
    },
    yaxis: {
      title: {
        text: "y title",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "y " + val + " title";
        },
      },
    },
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case STATE_DIALOG_ADD:
      return {
        ...state,
        stateDialogAdd: action.payload,
      };
    case STATE_DIALOG_EDIT:
      return {
        ...state,
        stateDialogEdit: action.payload.value,
        inputCollumnEdit: state.titleCollumn[action.payload.index],
        indexCol: action.payload.index,
      };
    case SET_INPUT_DIALOG:
      return {
        ...state,
        inputCollumn: action.payload,
      };
    case SET_INPUT_EDIT:
      return {
        ...state,
        inputCollumnEdit: action.payload,
      };
    case SET_TITLECOLLUMN:
      return {
        ...state,
        titleCollumn: [...state.titleCollumn, action.payload],
        options: {
          xaxis: {
            categories: [...state.titleCollumn, action.payload],
          },
        },
      };
    case DEL_COLLUMN:
      const titleList = state.titleCollumn;
      const listData1 = state.series[0].data;
      const listData2 = state.series[1].data;

      console.log(listData1);

      const removed = state.titleCollumn.splice(action.payload, 1);
      const removedData1 = state.series[0].data.splice(action.payload, 1);
      const removedData2 = state.series[1].data.splice(action.payload, 1);

      return {
        ...state,
        titleCollumn: [...state.titleCollumn],
        series: [
          {
            data: [...state.series[0].data],
          },
          {
            data: [...state.series[1].data],
          },
        ],
        options: {
          xaxis: {
            categories: [...state.titleCollumn],
          },
        },
      };
    case SUBMIT_CHART:
      const data1 = action.payload.items1.map((item) => Number(item.value));

      const data2 = action.payload.items2.map((item) => Number(item.value));

      const newobj = {
        ...state,
        options: {
          xaxis: {
            categories: [...state.titleCollumn],
          },
        },
        series: [
          {
            data: [...data1],
          },
          {
            data: [...data2],
          },
        ],
      };
      return newobj;
    case EDIT_COLLUMN:
      const listTitleData = [...state.titleCollumn]; // mang ban truoc khi sua;

      return {
        ...state,
        titleCollumn: listTitleData,
        options: {
          xaxis: {
            categories: listTitleData,
          },
        },
      };
    default:
      throw new Error("Invalid Action");
  }
};

export default reducer;
