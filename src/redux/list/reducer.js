import {
  GET_LIST_FAILURE,
  GET_LIST_REQUEST,
  GET_LIST_SUCCESS,
  SET_SELECTED_LIST,
} from "./types";

const initialState = {
  lists: [],
  listsLoading: false,
  listsError: false,
  selectedList: "",
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_REQUEST:
      return { ...state, listsLoading: true, listsError: false };

    case GET_LIST_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        listsLoading: false,
        listsError: false,
      };

    case GET_LIST_FAILURE:
      return { ...state, listsLoading: false, listsError: true };

    case SET_SELECTED_LIST:
      return { ...state, selectedList: action.payload };

    default:
      return state;
  }
};

export default listsReducer;
