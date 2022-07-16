import {
  OPEN_DIALOG,
  SET_INPUT_TITLE_COLLUMN,
  SET_TITLECOLLUMN,
  SUBMIT_CHART,
  EDIT_TITLECOLLUMN,
  DEL_COLLUMN,
} from "./Constances";

export const setHandleDialog = (payload) => {
  return {
    type: OPEN_DIALOG,
    payload,
  };
};
export const setInputTitleCollumn = (payload) => {
  return {
    type: SET_INPUT_TITLE_COLLUMN,
    payload,
  };
};
export const setTitleCollumn = (payload) => {
  return {
    type: SET_TITLECOLLUMN,
    payload,
  };
};
export const submitChart = (payload) => {
  return {
    type: SUBMIT_CHART,
    payload,
  };
};
export const editTitleChart = (payload) => {
  return {
    type: EDIT_TITLECOLLUMN,
    payload,
  };
};
export const deleteCollumn = (payload) => {
  return {
    type: DEL_COLLUMN,
    payload,
  };
};
