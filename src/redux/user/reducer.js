import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  ACCOUNT_VERIFY_SUCCESS,
} from "./types";

const initialState = {
  user: null,
  userLoading: false,
  userError: false,

  accountExists: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, userLoading: true, userError: false };

    case USER_LOGIN_SUCCESS:
      return { ...state, userLoading: false, userError: false };

    case USER_LOGIN_FAILURE:
      return { ...state, userLoading: false, userError: action.payload };

    case USER_LOGOUT_REQUEST:
      return { ...state, userLoading: true, userError: false };

    case USER_LOGOUT_SUCCESS:
      return { ...state, userLoading: false, userError: false, user: null };

    case USER_LOGOUT_FAILURE:
      return { ...state, userLoading: false, userError: action.payload };

    case USER_GET_REQUEST:
      return { ...state, userLoading: true, userError: false };

    case USER_GET_SUCCESS:
      return {
        ...state,
        userLoading: false,
        userError: false,
        user: action.payload,
      };

    case USER_GET_FAILURE:
      return { ...state, userLoading: false, userError: action.payload };

    case ACCOUNT_VERIFY_SUCCESS:
      return { ...state, accountExists: action.payload };

    default:
      return state;
  }
};

export default userReducer;
