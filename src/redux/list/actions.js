import axios from "axios";
import {
  GET_LIST_FAILURE,
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILURE,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAILURE,
  SET_SELECTED_LIST,
} from "./types";

const baseUrl = process.env.REACT_APP_API_URL;

export const getListsRequest = () => {
  return {
    type: GET_LIST_REQUEST,
  };
};

export const getListsSuccess = (lists) => {
  return {
    type: GET_LIST_SUCCESS,
    payload: lists,
  };
};

export const getListsFailure = (error) => {
  return {
    type: GET_LIST_FAILURE,
    payload: error,
  };
};

export const getLists = () => {
  return (dispatch) => {
    dispatch(getListsRequest());
    axios
      .get(`${baseUrl}/list`)
      .then((res) => {
        const lists = res.data;
        dispatch(getListsSuccess(lists));
      })
      .catch((error) => {
        dispatch(getListsFailure(error));
      });
  };
};

export const addListRequest = () => {
  return {
    type: ADD_LIST_REQUEST,
  };
};

export const addListSuccess = (ists) => {
  return {
    type: ADD_LIST_SUCCESS,
  };
};

export const addListFailure = (error) => {
  return {
    type: ADD_LIST_FAILURE,
    payload: error,
  };
};

export const addList = (list) => {
  return (dispatch) => {
    dispatch(addListRequest());
    axios
      .post(`${baseUrl}/list`, { ...list })
      .then((res) => {
        const lists = res.data;
        dispatch(addListSuccess(lists));

        dispatch(getLists());
      })
      .catch((error) => {
        dispatch(addListFailure(error));
      });
  };
};

export const deleteListRequest = () => {
  return {
    type: DELETE_LIST_REQUEST,
  };
};

export const deleteListSuccess = () => {
  return {
    type: DELETE_LIST_SUCCESS,
  };
};

export const deleteListFailure = (error) => {
  return {
    type: DELETE_LIST_FAILURE,
    payload: error,
  };
};

export const deleteList = (listId) => {
  return (dispatch) => {
    dispatch(deleteListRequest());
    axios
      .delete(`${baseUrl}/list/${listId}`)
      .then((res) => {
        dispatch(deleteListSuccess());

        dispatch(getLists());
      })
      .catch((error) => {
        dispatch(deleteListFailure(error));
      });
  };
};

export const updateListRequest = () => {
  return {
    type: UPDATE_LIST_REQUEST,
  };
};

export const updateListSuccess = () => {
  return {
    type: UPDATE_LIST_SUCCESS,
  };
};

export const updateListFailure = (error) => {
  return {
    type: UPDATE_LIST_FAILURE,
    payload: error,
  };
};

export const updateList = (list) => {
  return (dispatch) => {
    dispatch(updateListRequest());
    axios
      .patch(`${baseUrl}/list/${list._id}`, { ...list })
      .then((res) => {
        dispatch(updateListSuccess());

        dispatch(getLists());
      })
      .catch((error) => {
        dispatch(updateListFailure(error));
      });
  };
};

export const setSelectedList = (listId) => {
  return {
    type: SET_SELECTED_LIST,
    payload: listId,
  };
};
