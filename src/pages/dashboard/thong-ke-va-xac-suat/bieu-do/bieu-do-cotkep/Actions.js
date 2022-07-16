import {
  SET_INPUT_DIALOG,
  SET_TITLECOLLUMN,
  SUBMIT_CHART,
  EDIT_COLLUMN,
  DEL_COLLUMN,
  STATE_DIALOG_ADD,
  STATE_DIALOG_EDIT,
  SET_INPUT_EDIT,
} from "./Constances";

export const setInputTitleCollumn = (payload) => {
  return {
    type: SET_INPUT_DIALOG,
    payload,
  };
};
export const setInputCollumnEdit = (payload) => {
  return {
    type: SET_INPUT_EDIT,
    payload,
  };
};
export const editCollumn = (payload) => {
  return {
    type: EDIT_COLLUMN,
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
export const deleteCollumn = (payload) => {
  return {
    type: DEL_COLLUMN,
    payload,
  };
};
export const setStateDialogAdd = (payload) => {
  return {
    type: STATE_DIALOG_ADD,
    payload,
  };
};
export const setStateDialogEdit = (payload) => {
  return {
    type: STATE_DIALOG_EDIT,
    payload,
  };
};
