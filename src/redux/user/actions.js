import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILURE,
  USER_LOGIN_FAILURE,
  ACCOUNT_VERIFY_REQUEST,
  ACCOUNT_VERIFY_SUCCESS,
  ACCOUNT_VERIFY_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
} from "./types";

const baseUrl = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export const getMeRequest = () => {
  return {
    type: USER_GET_REQUEST,
  };
};

export const getMeSuccess = (user) => {
  return {
    type: USER_GET_SUCCESS,
    payload: user,
  };
};

export const getMeFailure = (error) => {
  return {
    type: USER_GET_FAILURE,
    payload: error,
  };
};

export const getMe = () => {
  return (dispatch) => {
    dispatch(getMeRequest());
    axios
      .get(`${baseUrl}/user/me`, { withCredentials: true })
      .then((res) => {
        dispatch(getMeSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getMeFailure(error));
      });
  };
};

export const loginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = () => {
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const loginFailure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    error: error,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .post(`${baseUrl}/auth/login`, { email, password })
      .then((res) => {
        dispatch(loginSuccess());

        dispatch(getMe());
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};

export const logoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error) => {
  return {
    type: USER_LOGOUT_FAILURE,
    error: error,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    axios
      .get(`${baseUrl}/user/logout`)
      .then((res) => {
        dispatch(logoutSuccess());

        dispatch(getMe());
      })
      .catch((error) => {
        dispatch(logoutFailure(error));
      });
  };
};

export const accountVerifyRequest = () => {
  return {
    type: ACCOUNT_VERIFY_REQUEST,
  };
};

export const accountVerifySuccess = (accountExists) => {
  return {
    type: ACCOUNT_VERIFY_SUCCESS,
    payload: accountExists.accountExists,
  };
};

export const accountVerifyFailure = (error) => {
  return {
    type: ACCOUNT_VERIFY_FAILURE,
    error: error,
  };
};

export const verifyAccount = (email) => {
  return (dispatch) => {
    dispatch(accountVerifyRequest());
    axios
      .post(`${baseUrl}/auth/account`, { email })
      .then((res) => {
        dispatch(accountVerifySuccess(res.data));
      })
      .catch((error) => {
        dispatch(accountVerifyFailure(error));
      });
  };
};

export const signupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signupSuccess = () => {
  return {
    type: USER_SIGNUP_SUCCESS,
  };
};

export const signupFailure = (error) => {
  return {
    type: USER_SIGNUP_FAILURE,
    error: error,
  };
};

export const signup = (name, email, password) => {
  return (dispatch) => {
    dispatch(signupRequest());
    axios
      .post(`${baseUrl}/auth/signup`, { name, email, password })
      .then((res) => {
        dispatch(signupSuccess());
        dispatch(login(email, password));
      })
      .catch((error) => {
        dispatch(signupFailure(error));
      });
  };
};
