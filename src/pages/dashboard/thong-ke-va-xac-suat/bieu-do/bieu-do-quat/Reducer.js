import {
  OPEN_DIALOG_ADD,
  OPEN_DIALOG_EDIT,
  SET_INPUT_DIALOG_ADD,
  SET_INPUT_DIALOG_EDIT,
  ADD_TITLE,
  EDIT_TITLE,
  SUBMIT_CHART,
  DEL_COLLUMN,
  DISABLE_DELETE,
} from "./Constances";

export const initState = {
  isDisabledBtnDelete: true,
  stateDialogAdd: false,
  stateDialogEdit: false,
  indexOfCollumn: 0,
  inputCollumnAdd: "",
  inputCollumnEdit: "",
  titleCollumn: ["Dữ liệu 1"],
  series: [0],
  options: {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Dữ liệu 1"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_DIALOG_ADD:
      return {
        ...state,
        stateDialogAdd: action.payload,
      };
    case OPEN_DIALOG_EDIT:
      console.log();
      return {
        ...state,
        stateDialogEdit: action.payload.val,
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
    case ADD_TITLE:
      return {
        ...state,
        isDisabledBtnDelete: false,
        titleCollumn: [...state.titleCollumn, action.payload],
        series: [...state.series],
        options: {
          labels: [...state.titleCollumn, action.payload],
        },
      };
    case EDIT_TITLE:
      const listTitleData = [...state.titleCollumn]; // mang ban truoc khi sua;
      return {
        ...state,
        titleCollumn: listTitleData,
        series: [...state.series],
        options: {
          labels: listTitleData,
        },
      };
    case DEL_COLLUMN:
      const dataTitle = [...state.titleCollumn];
      const dataValue = [...state.series];
      return {
        ...state,
        titleCollumn: dataTitle,
        series: dataValue,
        options: {
          labels: dataTitle,
        },
      };
    case SUBMIT_CHART:
      const arr = action.payload.map((item) => {
        return Number(item.value);
      });
      console.log(arr);
      return {
        ...state,
        series: [...arr],
        options: {
          labels: [...state.titleCollumn],
        },
      };
    case DISABLE_DELETE:
      return {
        ...state,
        isDisabledBtnDelete: action.payload,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export default reducer;
