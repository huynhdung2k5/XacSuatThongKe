import {
  OPEN_DIALOG_ADD,
  OPEN_DIALOG_EDIT,
  SET_INPUT_DIALOG_ADD,
  SET_INPUT_DIALOG_EDIT,
  SET_TITLE_ADD,
  SET_TITLE_EDIT,
  SUBMIT_CHART,
  EDIT_TITLE,
  DEL_COLLUMN,
} from "./Constance";

export const setHandleDialogAdd = (payload) => {
  return {
    type: OPEN_DIALOG_ADD,
    payload,
  };
};
export const setHandleDialogEdit = (payload) => {
  return {
    type: OPEN_DIALOG_EDIT,
    payload,
  };
};
export const setInputTitleAdd = (payload) => {
  return {
    type: SET_INPUT_DIALOG_ADD,
    payload,
  };
};
export const setInputTitleEdit = (payload) => {
  return {
    type: SET_INPUT_DIALOG_EDIT,
    payload,
  };
};
export const setTitleAdd = (payload) => {
  return {
    type: SET_TITLE_ADD,
    payload,
  };
};
export const setTitleEdit = (payload) => {
  return {
    type: SET_TITLE_EDIT,
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
    type: EDIT_TITLE,
    payload,
  };
};
export const deleteCollumn = (payload) => {
  return {
    type: DEL_COLLUMN,
    payload,
  };
};
