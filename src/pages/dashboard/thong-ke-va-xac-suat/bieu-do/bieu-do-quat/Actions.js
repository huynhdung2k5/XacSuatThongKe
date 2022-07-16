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

export const openDialogAdd = (payload) => {
  return {
    type: OPEN_DIALOG_ADD,
    payload,
  };
};
export const openDialogEdit = (payload) => {
  return {
    type: OPEN_DIALOG_EDIT,
    payload,
  };
};
export const setInputDialogAdd = (payload) => {
  return {
    type: SET_INPUT_DIALOG_ADD,
    payload,
  };
};
export const setInputDialogEdit = (payload) => {
  return {
    type: SET_INPUT_DIALOG_EDIT,
    payload,
  };
};
export const addTitle = (payload) => {
  return {
    type: ADD_TITLE,
    payload,
  };
};
export const editTitle = (payload) => {
  return {
    type: EDIT_TITLE,
    payload,
  };
};
export const submitChart = (payload) => {
  return {
    type: SUBMIT_CHART,
    payload,
  };
};
export const delCollumn = (payload) => {
  return {
    type: DEL_COLLUMN,
    payload,
  };
};
export const disableDelete = (payload) => {
  return {
    type: DISABLE_DELETE,
    payload,
  };
};
